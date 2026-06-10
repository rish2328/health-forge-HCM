from pydantic_settings import BaseSettings

class Settings ( BaseSettings ):
    APP_NAME: str
    DATABASE_URL: str
    DATABASE_ECHO: bool
    APP_AUTHOR: str | None = None

    class Config:
        env_file = ".env"
        extra = "allow"


serviceSettings = Settings()
