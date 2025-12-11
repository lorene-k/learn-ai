from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel


class PostgresSettings(BaseModel):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str
    POSTGRES_SCHEMA: str = ""
    DEBUG: bool = True  # Prod: set to False
    POOL_SIZE: int = 5
    POOL_RECYCLE: int = 3600
    MAX_OVERFLOW: int = 10


class AppSettings(BaseSettings):
    db: PostgresSettings
    OLLAMA_URL: str | None = (
        "http://host.docker.internal:11434"  #  Prod: change to "http://ollama:11434"
    )
    OLLAMA_MODEL: str = "qwen3-vl:2b"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_nested_delimiter="_",
        env_nested_max_split=1,
    )


app_env_settings = AppSettings()
