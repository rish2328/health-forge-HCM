from datetime import datetime
from enum import Enum as PyEnum
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Enum, Boolean


class ProviderSpecialtiesModel ( Base ):
    __tablename__   =   "provider_specialties"

    id              =   Column ( Integer, primary_key = True, index = True )

    provider_id     =   Column ( Integer, ForeignKey ( "providers.id" ) )
    provider        =   relationship ( "ProvidersModel", back_populates = "specialties" )

    specialty_name  =   Column ( String(150), nullable = True )
    is_primary      =   Column ( Boolean, default = False )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
