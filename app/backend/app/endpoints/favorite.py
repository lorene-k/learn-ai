from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..dependencies.db import get_db
from ..db.crud import update_course
from ..schemas.courseModels import UpdateCourse, CourseResponse

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})


@router.patch("/favorites/{course_id}", response_model=CourseResponse)
async def update_favorite_status(
    course_id: int, is_favorite: bool, db: AsyncSession = Depends(get_db)
):
    to_update = UpdateCourse(is_favorite=is_favorite)
    res = await update_course(db, course_id, to_update)
    if not res:
        raise HTTPException(status_code=404, detail="Course not found")
    return res
