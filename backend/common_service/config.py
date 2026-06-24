from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings ( BaseSettings ):
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int
    JWT_TOKEN_URL: str
    AUTH_SERVICE_URL: str

    model_config = SettingsConfigDict(
        # env_file=BASE_DIR / ".env",
        extra="ignore"
    )

commonSettings = Settings()
