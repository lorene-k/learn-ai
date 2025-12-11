from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import app_env_settings as settings
from sqlalchemy.dialects.postgresql import JSONB


Base = declarative_base()


class Course(Base):
    __tablename__ = "courses"
    __table_args__ = {"schema": settings.db.POSTGRES_SCHEMA}

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False
    )
    title = Column(String, index=True, nullable=False)
    level = Column(String, index=True, nullable=False)
    duration = Column(Integer, nullable=False)
    description = Column(String, index=True, nullable=False)
    is_favorite = Column(Boolean, server_default="FALSE")
    chapters = Column(JSONB, nullable=False)
