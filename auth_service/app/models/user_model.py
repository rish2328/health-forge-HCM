from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.core.database import Base


class UserModel ( Base ):
    __tablename__ = "users"

    id          =   Column ( Integer, primary_key = True, index = True )
    uuid        =   Column ( UUID( as_uuid = True ), default = uuid.uuid4, unique = True, nullable = False, index = True )
    first_name  =   Column ( String(100), nullable = True )
    middle_name =   Column ( String(100), nullable = True )
    last_name   =   Column ( String(100), nullable = True )
    email       =   Column ( String(150), nullable = True, unique = True )
    phone       =   Column ( String(15), nullable = True )
    password    =   Column ( String(255), nullable = True )
    last_login  =   Column ( DateTime, nullable = True )
    role        =   relationship ( "UserRolesModel", back_populates = "user", lazy="selectin")
    is_active   =   Column ( Boolean, default = True )
    created_at  =   Column ( DateTime, default = datetime.utcnow )
    updated_at  =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
    

