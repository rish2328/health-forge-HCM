from pydantic_settings import BaseSettings

class Settings ( BaseSettings ):
    APP_NAME: str
    DATABASE_URL: str
    DATABASE_ECHO: bool

    class Config:
        env_file = ".env"
        extra = "allow"

providerSettings = Settings ()