from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from app.core.config import settings
from typing import Annotated
from fastapi import Depends


engine = create_engine (
    settings.DATABASE_URL,
    echo = settings.DATABASE_ECHO       #   turn this on to debug SQL queries
)

SessionLocal = sessionmaker ( autoflush = False, autocommit = False, bind = engine )

Base = declarative_base()

def get_db ():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DB_Dependencies = Annotated [ Session, Depends (get_db) ]