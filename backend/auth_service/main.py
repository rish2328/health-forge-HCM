import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine
from app.api import auth_route, role_route, user_route, permission_route, internal_user_route
from fastapi.middleware.cors import CORSMiddleware
from app.models import user_model, roles_model, permissions_model, user_roles_model, role_permissions_model

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

app.include_router ( auth_route.router )
app.include_router ( role_route.router )
app.include_router ( permission_route.router )
app.include_router ( user_route.router )
app.include_router ( internal_user_route.router )

