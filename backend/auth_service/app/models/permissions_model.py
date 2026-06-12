from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class PermissionsModel ( Base ):
    __tablename__ = "permissions"

    id              =   Column ( Integer, primary_key = True, index = True )
    uuid            =   Column ( UUID( as_uuid = True ), default = uuid.uuid4, unique = True, nullable = False, index = True )
    name            =   Column ( String(100), nullable = True )
    display_name    =   Column ( String(100), nullable = True )
    group_name      =   Column ( String(200), nullable = True )
    description     =   Column ( String(255), nullable = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

    roles = relationship( "RolePermissionsModel", back_populates="permission", cascade="all, delete-orphan" )

