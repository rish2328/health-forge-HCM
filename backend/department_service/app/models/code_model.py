from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime


class DepartmentCodesModel ( Base ):
    __tablename__ = "department_codes"

    id          =   Column ( Integer, primary_key = True, index = True )
    name        =   Column ( String(150), nullable = True )
    short_name  =   Column ( String(100), nullable = True )
    status      =   Column ( Boolean, default = True )
    created_at  =   Column ( DateTime, default = datetime.utcnow )
    updated_at  =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

    department  =   relationship("DepartmentsModel", back_populates = "code", cascade="all, delete-orphan", lazy="selectin" )

