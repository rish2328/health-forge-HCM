import uuid
from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Date, Enum, Boolean


class DepartmentsModel ( Base ):
    __tablename__   =   "departments"

    id              =   Column ( Integer, primary_key = True, index = True )
    uuid            =   Column ( UUID(as_uuid = True), default = uuid.uuid4, unique = True, index = True, nullable = False )

    name            =   Column ( String (100), unique = True, nullable = False )
    code            =   Column ( String (50), unique = True, nullable = True )
    description     =   Column ( String(100), nullable = True )

    status          =   Column ( Boolean, default = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )


