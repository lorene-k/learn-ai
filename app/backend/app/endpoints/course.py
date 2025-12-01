import httpx
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import app_env_settings as settings
from ..db.crud import create_course, get_one_course
from ..dependencies.db import get_db
from ..schemas.courseModels import CourseRequest, CreateCourse, CourseResponse

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})
OLLAMA_URL = "http://localhost:11434/v1/completions"
OLLAMA_MODEL = "qwen3-vl:2b"


def set_prompt(request: CourseRequest) -> str:
    return (
        f"Generate a {request.level} level course about {request.topic}. "
        f"It should last approximately {request.duration}. "
        f"Return ONLY the following as JSON:\n"
        "{ "
        "  'title': string, "
        "  'description': string "
        "  'lessons': [ "
        "    { "
        "      'title': string, "
        "      'content': string "
        "    } "
        "  ] "
        "}"
    )


async def get_ollama_response(prompt: str) -> dict:
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": settings.OLLAMA_MODEL,
                    "prompt": prompt,
                    "temperature": 0.7,
                    "max_tokens": 300,
                },
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama connection error: {e}")
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Ollama error: {response.text}")
    return parse_response(response.text)


def parse_response(resp: str) -> dict:
    try:
        lines = resp.strip().split("\n")
        last_chunk = json.loads(lines[-1])
        return last_chunk.get("response", "").strip()
    except Exception:
        raise HTTPException(500, "Failed parsing Ollama streaming output.")


def create_course_response(resp: dict, request) -> CreateCourse:
    try:
        data = json.loads(resp)
    except json.JSONDecodeError as e:
        raise HTTPException(500, f"Ollama returned invalid JSON: {e}")

    lessons = [
        {
            "title": l.get("title", "Untitled Lesson"),
            "content": l.get("content", ""),
        }
        for l in data.get("lessons", [])
    ]

    return CreateCourse(
        title=data.get("title", "Untitled Course"),
        level=request.level,
        duration=request.duration,
        description=data.get("description", "No description provided."),
        is_favorite=False,
        # lessons=lessons,
    )


@router.post("/course/generate", response_model=dict)
async def generate_course(request: CourseRequest, db: AsyncSession = Depends(get_db)):
    prompt = set_prompt(request)
    # resp = await get_ollama_response(prompt)
    # print("RESPONSE =", resp) # ! DEBUG
    # course = create_course_response(resp)
    # print("RESPONSE = ", resp)  # ! DEBUG
    course = CreateCourse(
        title=f"Test Course: {request.topic}",
        level=request.level,
        duration=request.duration,
        description=f"Test description for a {request.level} level course.",
        is_favorite=False,
        # lessons=[],
    )
    db_course = await create_course(db, course)
    return {"id": db_course.id}


@router.get("/course/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int, db: AsyncSession = Depends(get_db)):
    db_course = await get_one_course(db, int(course_id))
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    return db_course
