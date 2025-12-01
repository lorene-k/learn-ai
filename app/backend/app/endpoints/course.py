from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..dependencies.db import get_db
from ..db.crud import create_course
from ..schemas.courseModels import CourseRequest, CreateCourse

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})

@router.post("/course", response_model=dict)
async def generate_course(
    request: CourseRequest,
    db: AsyncSession = Depends(get_db)):
    # prompt = (
    #     f"Generate a {request.level} level course on the topic of {request.topic} "
    #     f"that lasts approximately {request.duration}. Include a course title, "
    #     "a brief description, and a list of lessons with titles and content and eventually source links if useful."
    # )
    # try:
    #     generated_course = mistral.generate_course(prompt)
    # except Exception as e:
    #     print("Error generating course with Mistral:", e)
    #     raise HTTPException(status_code=500, detail=f"Mistral error: {e}")
    # mock_lesson = Lesson(
    #     title="Test Lesson",
    #     content="This is a test lesson content.",
    #     links="http://example.com/resource",
    # )
    course = CreateCourse(
        title=f"Test Course: {request.topic}",
        level=request.level,
        duration=request.duration,
        description=f"Test description for a {request.level} level course.",
        is_favorite=False,
        # lessons=[mock_lesson],
    )
    db_course = await create_course(db, course)
    return {"id": db_course.id}


# ! API call to create CourseResponse
