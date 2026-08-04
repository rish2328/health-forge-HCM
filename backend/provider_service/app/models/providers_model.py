import uuid
from enum import Enum as PyEnum
from app.core.database import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, Enum, Numeric, Text


class TitleEnum ( str, PyEnum ):
    Dr      =   "Dr"
    Prof    =   "Prof"
    Mr      =   "Mr"
    Mrs     =   "Mrs"
    Ms      =   "Ms"
    Miss    =   "Miss"

class GenderEnum ( str, PyEnum):
    Male    =   "Male"
    Female  =   "Female"
    Other   =   "Other"

class EmploymentTypeEnum ( str, PyEnum):
    Full_Time   =   "Full-Time"
    Part_Time   =   "Part-Time"
    Visiting    =   "Visiting"
    Contract    =   "Contract"
    Locum       =   "Locum"
    Resident    =   "Resident"
    Consultant  =   "Consultant"


class ProvidersModel ( Base ):
    __tablename__   =   "providers"

    id              =   Column ( Integer, primary_key = True, index = True )
    uuid            =   Column ( UUID(as_uuid = True), default = uuid.uuid4, unique = True, index = True, nullable = False )
    auth_user_uuid  =   Column ( String (150), nullable = False, unique = True, index = True )

    provider_code   =   Column ( String (100), nullable = True, unique = True )
    title           =   Column ( Enum ( TitleEnum, name = "title_enum"), nullable = True )
    first_name      =   Column ( String (100), nullable = True )
    middle_name     =   Column ( String (100), nullable = True )
    last_name       =   Column ( String (100), nullable = True )
    gender          =   Column ( Enum ( GenderEnum, name = "gender_enum" ), nullable = True )
    dob             =   Column ( Date, nullable = True )
    email           =   Column ( String (150), nullable = True, unique = True, index = True )
    phone           =   Column ( String (50), nullable = True )

    department_uuid =   Column ( String(150), nullable = True, index = True )
    designation     =   Column ( String (100), nullable = True )
    employment_type =   Column ( Enum ( EmploymentTypeEnum, name = "employment_type_enum" ), nullable = True )
    consultation_fee =  Column ( Numeric(10, 2), nullable = False, default = 0.00 )
    followup_fee    =   Column ( Numeric(10, 2), nullable = False, default = 0.00 )
    emergency_fee   =   Column ( Numeric(10, 2), nullable = False, default = 0.00 )
    license_number  =   Column ( String (150), nullable = True )

    registration_number =   Column ( String (150), nullable = True )
    status          =   Column ( Boolean, default = True )
    remarks         =   Column ( Text, nullable = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

    contacts        =   relationship ( "ProviderContactsModel", back_populates = "provider", cascade = "all, delete-orphan", lazy = "selectin" )
    addresses       =   relationship ( "ProviderAddressesModel", back_populates = "provider", cascade = "all, delete-orphan", lazy = "selectin" )
    specialties     =   relationship ( "ProviderSpecialtiesModel", back_populates = "provider", cascade = "all, delete-orphan", lazy = "selectin" )
    availabilities  =   relationship ( "ProviderAvailabilityModel", back_populates = "provider", cascade = "all, delete-orphan", lazy = "selectin" )
    documents       =   relationship ( "ProviderDocumentsModel", back_populates = "provider", cascade = "all, delete-orphan", lazy = "selectin" )












