from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean, Date


class PatientInsuranceModel ( Base ):
    __tablename__   =   "patient_insurances"

    id              =   Column ( Integer, primary_key = True, index = True)
    patient_id      =   Column ( Integer, ForeignKey ("patients.id") )
    patient         =   relationship ( "PatientModel", back_populates = "insurances" )

    provider_name   =   Column ( String(100), nullable = True )
    policy_number   =   Column ( String(100), nullable = True )
    group_number    =   Column ( String(100), nullable = True )
    subscriber_name =   Column ( String(100), nullable = True )
    effective_date  =   Column ( Date, nullable = True )
    expiry_date     =   Column ( Date, nullable = True )
    status          =   Column ( Boolean, default = True )
    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
