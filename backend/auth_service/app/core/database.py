from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from typing import Annotated
from sqlalchemy.orm import Session
from app.core.config import serviceSettings


engine = create_engine( 
        serviceSettings.DATABASE_URL,
        echo = serviceSettings.DATABASE_ECHO        #   turn this on to debug SQL queries
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

