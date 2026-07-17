import logging
from pydantic_settings import BaseSettings

logger = logging.getLogger("skillbridge")


class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillBridge AI"
    VERSION: str = "1.0.0"
    DEBUG: bool = False

    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"

    SECRET_KEY: str = "a-very-secure-secret-key-change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"

    @property
    def gemini_configured(self) -> bool:
        key = self.GEMINI_API_KEY
        if not key:
            return False
        if key == "your-gemini-api-key":
            return False
        return True


settings = Settings()

if settings.gemini_configured:
    logger.info("✓ Gemini API key loaded")
else:
    logger.warning("✗ Gemini API key missing — set GEMINI_API_KEY in .env")
