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
        # lessons=course.lessons,
    )
    db.add(db_course)
    await db.commit()
    await db.refresh(db_course)
    return db_course


async def get_all_courses(
    db: AsyncSession, skip: int = 0, limit: int = 10
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


### USAGE
# @app.get("/courses/")
# def list_courses(page: int = 1, page_size: int = 10, db: Session = Depends(get_db)):
#     return crud.get_courses_paginated(db, page, page_size)

# @app.get("/courses/{course_id}")
# def read_course(course_id: int, db: Session = Depends(get_db)):
#     course = crud.get_course(db, course_id)
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")
#     return course

# @app.put("/courses/{course_id}")
# def update_course_route(course_id: int, course_update: schemas.UpdateCourse, db: Session = Depends(get_db)):
#     return crud.update_course(db, course_id, course_update.dict())

# @app.delete("/courses/{course_id}")
# def delete_course_route(course_id: int, db: Session = Depends(get_db)):
#     success = crud.delete_course(db, course_id)
#     if not success:
#         raise HTTPException(status_code=404, detail="Course not found")
#     return {"ok": True}
