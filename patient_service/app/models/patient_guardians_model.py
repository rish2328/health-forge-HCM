from datetime import datetime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Text


class PatientGuardianModel ( Base ):
    __tablename__   =   "patient_guardians"

    id              =   Column ( Integer, primary_key = True, index = True)
    patient_id      =   Column ( Integer, ForeignKey ("patients.id") )
    patient         =   relationship ( "PatientModel", back_populates = "guardians" )

    name            =   Column ( String(100), nullable = True )
    relation        =   Column ( String(100), nullable = True )
    phone           =   Column ( String(50), nullable = True )
    email           =   Column ( String(150), nullable = True )
    address         =   Column ( Text, nullable = True )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )
