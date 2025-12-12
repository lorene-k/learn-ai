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
        f"Create a complete course in JSON format (no extra text, no explanation). "
        f"The course topic is: {request.topic}. "
        f"Target level: {request.level}. "
        f"Estimated duration: {request.duration} minutes. "
        f"Structure requirements:\n"
        f"- The course MUST include a clear course title.\n"
        f"- Include a short but high-quality course description (3–5 sentences).\n"
        f"- Include at least 3 chapters (more if duration > 5 minutes).\n"
        f"- Each chapter must have:\n"
        f"  - a descriptive, polished title ONLY (no numbering).\n"
        f"  - detailed content of AT LEAST 8–12 sentences.\n"
        f"Content rules:\n"
        f"- Do NOT write phrases like 'In this chapter', 'Here we discuss', or any meta-commentary.\n"
        f"- Write direct, objective explanations.\n"
        f"- No filler sentences. No repetition.\n"
        f"JSON rules:\n"
        f"- Return ONLY valid JSON that matches the schema.\n"
        f"- No markdown, no comments, no text before or after the JSON.\n"
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
            "num_predict": 20000,
            "top_p": 0.9,
            "stop": ["```"],
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
