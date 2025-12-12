from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..schemas.courseModels import CourseHistory
from ..dependencies.db import get_db
from ..db.models import Course as DbCourse

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})


@router.get("/history", response_model=list[CourseHistory])
async def get_courses(db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(DbCourse.id, DbCourse.title, DbCourse.level, DbCourse.duration)
    )
    if not res:
        raise HTTPException(status_code=404, detail="Course history not found")
    all_courses = res.all()
    return all_courses
