from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from enum import Enum as PyEnum
from datetime import datetime


class AddressTypeEnum ( str, PyEnum ):
    HOME = "Home"
    PERMANENT = "Permanent"
    CURRENT = "Current"
    MAILING = "Mailing"
    BILLING = "Billing"
    WORK = "Work"
    OFFICE = "Office"
    EMERGENCY_CONTACT = "Emergency Contact"
    TEMPORARY = "Temporary"
    OTHER = "Other"


class PatientAddressModel ( Base ):
    __tablename__   =   "patient_addresses"

    id              =   Column ( Integer, primary_key = True, index = True)
    patient_id      =   Column ( Integer, ForeignKey ("patients.id") )
    patient         =   relationship ( "PatientModel", back_populates = "addresses" )

    address_line_1  =   Column ( String(100), nullable = True )
    address_line_2  =   Column ( String(100), nullable = True )
    city            =   Column ( String(100), nullable = True )
    state           =   Column ( String(100), nullable = True )
    country         =   Column ( String(100), nullable = True )
    postal_code     =   Column ( String(100), nullable = True )
    address_type    =   Column ( Enum ( AddressTypeEnum, name = "address_type" ), nullable = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
