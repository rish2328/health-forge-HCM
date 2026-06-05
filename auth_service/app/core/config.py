from pydantic_settings import BaseSettings

class Settings ( BaseSettings ):
    APP_NAME: str
    DATABASE_URL: str
    DATABASE_ECHO: bool
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int
    APP_AUTHOR: str | None = None

    class Config ():
        env_file = ".env"
        extra = "allow"


settings = Settings()
