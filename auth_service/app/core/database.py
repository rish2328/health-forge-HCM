from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from typing import Annotated
from sqlalchemy.orm import Session
from app.core.config import settings


engine = create_engine( 
        settings.DATABASE_URL, 
        echo = settings.DATABASE_ECHO        #   turn this on to debug SQL queries
    )

SessionLocal = sessionmaker ( 
        autocommit=False, 
        autoflush=False, 
        bind=engine 
    )

Base = declarative_base()


def get_db ():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DB_Dependencies = Annotated[ Session, Depends(get_db) ]

