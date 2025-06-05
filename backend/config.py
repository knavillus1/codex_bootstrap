
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings
from pydantic import validator
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4.1"
    ALLOW_ORIGINS: str = "http://localhost:5173"
    FEATURE_STREAMING: bool = False

    @validator("OPENAI_API_KEY")
    def validate_key(cls, v: str) -> str:
        if not v:
            raise ValueError("OPENAI_API_KEY must be set")
        return v

    @property
    def allowed_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOW_ORIGINS.split(",")]


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
