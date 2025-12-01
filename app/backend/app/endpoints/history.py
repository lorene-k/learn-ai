from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..schemas.courseModels import CourseResponse
from ..dependencies.db import get_db
from ..db.crud import get_all_courses

router = APIRouter(tags=["courses"], responses={404: {"description": "Not found"}})


@router.get("/history", response_model=list[CourseResponse])
async def get_courses(db: AsyncSession = Depends(get_db)):
    all_courses = await get_all_courses(db)
    if not all_courses:
        raise HTTPException(status_code=404, detail="Course history not found")
    return all_courses


# Add param to get user_id :
# user: User = Depends(get_current_user)
# then user=uder_id in get_all_courses params
