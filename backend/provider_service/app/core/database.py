from fastapi import Depends
from typing import Annotated
from sqlalchemy import create_engine
from app.core.config import providerSettings
from sqlalchemy.orm import sessionmaker, declarative_base, Session

engine = create_engine(
    providerSettings.DATABASE_URL,
    echo = providerSettings.DATABASE_ECHO
)

SessionLocal = sessionmaker ( autoflush = False, autocommit = False, bind = engine )

Base = declarative_base()

def get_db ():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DB_Dependencies = Annotated [ Session, Depends ( get_db ) ]