from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.database import db_session_manager
from app.endpoints.course import router as course_router
from app.endpoints.history import router as history_router
from app.endpoints.favorite import router as fav_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    db_session_manager.init_engine()
    yield
    await db_session_manager.close()


app = FastAPI(lifespan=lifespan)


app.include_router(course_router, prefix="/api")
app.include_router(history_router, prefix="/api")
app.include_router(fav_router, prefix="/api")


@app.get("/")
def root():
    return {"FastAPI backend running at http://localhost:8000"}
