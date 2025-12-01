from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel
import platform


class PostgresSettings(BaseModel):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str
    POSTGRES_SCHEMA: str = ""
    DEBUG: bool = True  # Set to False in prod
    POOL_SIZE: int = 5
    POOL_RECYCLE: int = 3600
    MAX_OVERFLOW: int = 10


class AppSettings(BaseSettings):
    db: PostgresSettings
    OLLAMA_URL: str | None = None
    OLLAMA_MODEL: str = "qwen3-vl:2b"  # OR mistral-small-2506

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_nested_delimiter="_",
        env_nested_max_split=1,
    )


app_env_settings = AppSettings()


if not app_env_settings.OLLAMA_URL:
    if platform.system() == "Darwin":
        app_env_settings.OLLAMA_URL = "http://host.docker.internal:11434"
    else:
        app_env_settings.OLLAMA_URL = "http://ollama:11434"
