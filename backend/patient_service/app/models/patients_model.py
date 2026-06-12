import uuid
from datetime import datetime
from enum import Enum as PyEnum
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Date, Enum, Boolean


class GenderEnum ( str, PyEnum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"

class MaritalStatusEnum(str, PyEnum):
    SINGLE = "Single"
    MARRIED = "Married"
    DIVORCED = "Divorced"
    WIDOWED = "Widowed"
    SEPARATED = "Separated"
    PARTNERED = "Partnered"
    UNKNOWN = "Unknown"


class PatientModel ( Base ):
    __tablename__   =   "patients"

    id              =   Column ( Integer, primary_key = True, index = True )
    uuid            =   Column ( UUID(as_uuid = True), default = uuid.uuid4, unique = True, index = True, nullable = False )

    auth_user_uuid  =   Column( UUID(as_uuid=True), nullable=False, unique=True, index=True, comment="User UUID from Auth Service DB" )

    patient_mrn     =   Column ( String (50), unique = True, nullable = False )
    first_name      =   Column ( String(100), nullable = True )
    middle_name     =   Column ( String(100), nullable = True )
    last_name       =   Column ( String(100), nullable = True )
    gender          =   Column ( Enum ( GenderEnum, name = "gender_enum" ), nullable = True )
    dob             =   Column ( Date, nullable = True )
    blood_group     =   Column ( String(50), nullable = True )
    marital_status  =   Column ( Enum ( MaritalStatusEnum, name = "marital_status"), nullable = True )
    email           =   Column ( String(100), unique = True, nullable = True )
    phone           =   Column ( String(50), nullable = True )
    emergency_contact_name  =   Column ( String(100), nullable = True )
    emergency_contact_phone =   Column ( String(50), nullable = True )
    photo           =   Column ( String(255), nullable = True )
    status          =   Column ( Boolean, default = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )

    addresses       =   relationship("PatientAddressModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")
    insurances      =   relationship("PatientInsuranceModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")
    contact         =   relationship("PatientContactModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")
    document        =   relationship("PatientDocumentModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")
    notes           =   relationship("PatientNoteModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")
    guardians       =   relationship("PatientGuardianModel", back_populates="patient", cascade="all, delete-orphan", lazy="selectin")




