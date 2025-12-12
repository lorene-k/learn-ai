from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.sql import text
from .models import Course as DbCourse
from ..schemas.courseModels import CreateCourse, UpdateCourse


async def create_course(db: AsyncSession, course: CreateCourse) -> DbCourse:
    db_course = DbCourse(
        title=course.title,
        level=course.level,
        duration=course.duration,
        description=course.description,
        chapters=[chapter.model_dump() for chapter in course.chapters],
    )
    db.add(db_course)
    await db.commit()
    await db.refresh(db_course)
    return db_course


async def get_all_courses(
    db: AsyncSession, skip: int = 0, limit: int = 20
) -> list[DbCourse]:
    res = await db.execute(select(DbCourse).offset(skip).limit(limit))
    return res.scalars().all()


async def get_one_course(db: AsyncSession, course_id: int) -> DbCourse | None:
    res = await db.execute(select(DbCourse).where(DbCourse.id == course_id))
    return res.scalar_one_or_none()


async def update_course(
    db: AsyncSession, course_id: int, to_update: UpdateCourse
) -> DbCourse | None:
    res = await db.execute(select(DbCourse).where(DbCourse.id == course_id))
    course = res.scalar_one_or_none()
    if not course:
        return None
    for key, value in to_update.model_dump(exclude_unset=True).items():
        setattr(course, key, value)
    await db.commit()
    await db.refresh(course)
    return course


async def delete_course(db: AsyncSession, course_id: int) -> DbCourse | None:
    res = await db.execute(select(DbCourse).where(DbCourse.id == course_id))
    course = res.scalar_one_or_none()
    if not course:
        return None
    await db.delete(course)
    await db.commit()
    return course
