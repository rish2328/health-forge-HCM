from fastapi import FastAPI
from app.core.database import Base, engine
from app.api import auth_route
from app.models import user_model, roles_model, permissions_model, user_roles_model, role_permissions_model


Base.metadata.create_all ( bind = engine )
app = FastAPI ( title = "Health Forge ( A Health Care Management System)")

app.include_router ( auth_route.router )