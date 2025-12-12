from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import app_env_settings as settings
from ..db.crud import create_course, get_one_course
from ..dependencies.db import get_db
from ..schemas.courseModels import CourseRequest, CreateCourse, CourseResponse
from ollama import AsyncClient

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})
ollama_client = AsyncClient(host=settings.OLLAMA_URL)


def set_prompt(request: CourseRequest) -> str:
    return (
        f"Generate a {request.level} level course about {request.topic}."
        f"It should last approximately {request.duration} minutes."
        f"The course MUST include at least 3 chapters."
        f"A 5-minute course has 3 chapters, adjust the number of chapters if the course lasts longer."
        f"Each chapter must have a descriptive title and detailed content (at least 2-3 sentences). "
        f"Provide a clear course title, short description, and well-structured chapters."
        f"Return ONLY valid JSON matching the schema."
    )


async def chat(prompt: str):
    message = {"role": "user", "content": prompt}
    response = await ollama_client.chat(
        model=settings.OLLAMA_MODEL,
        messages=[message],
        stream=False,
        format=CreateCourse.model_json_schema(),
        options={
            "temperature": 0.7,
            "num_predict": 10000,
        },
    )
    data = CreateCourse.model_validate_json(response.message.content)
    return data


@router.post("/course/generate", response_model=dict)
async def generate_course(request: CourseRequest, db: AsyncSession = Depends(get_db)):
    prompt = set_prompt(request)
    course = await chat(prompt)
    db_course = await create_course(db, course)
    return {"id": db_course.id}


@router.get("/course/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int, db: AsyncSession = Depends(get_db)):
    db_course = await get_one_course(db, int(course_id))
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    return db_course
