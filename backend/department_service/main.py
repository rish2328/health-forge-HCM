import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine
from app.models import department_model
from app.api import department_route, internal_department_route
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all ( bind = engine )
app = FastAPI ( title = "Health Forge ( A Health Care Management System )")

origins = [
    "http://localhost:5100",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router ( department_route.router )
app.include_router ( internal_department_route.router )