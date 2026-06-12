from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.core.database import Base


class RolesModel ( Base ):
    __tablename__ = "roles"

    id              =   Column ( Integer, primary_key = True, index = True )
    uuid            =   Column ( UUID( as_uuid = True ), default = uuid.uuid4, unique = True, nullable = False, index = True )
    name            =   Column ( String(100), nullable = True )
    display_name    =   Column ( String(100), nullable = True )
    description     =   Column ( String(255), nullable = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

    users = relationship( "UserRolesModel", back_populates="role", cascade="all, delete-orphan" )
    permissions = relationship( "RolePermissionsModel", back_populates="role", cascade="all, delete-orphan" )
