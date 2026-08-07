from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, Time, Enum, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class WeekDaysEnum ( str, PyEnum ):
    Monday      =   "Monday"
    Tuesday     =   "Tuesday"
    Wednesday   =   "Wednesday"
    Thursday    =   "Thursday"
    Friday      =   "Friday"
    Saturday    =   "Saturday"
    Sunday      =   "Sunday"


class ProviderAvailabilityModel (Base):
    __tablename__ = "provider_availability"

    id              =   Column ( Integer, primary_key = True, index = True )

    provider_id     =   Column ( Integer, ForeignKey ( "providers.id" ), nullable = False )
    provider        =   relationship ( "ProvidersModel", back_populates = "availabilities" )

    week_days       =   Column ( Enum ( WeekDaysEnum, name = "week_days_enum" ), nullable = True )
    start_time      =   Column ( Time, nullable = True )
    end_time        =   Column ( Time, nullable = True )

    slot_duration   =   Column ( Integer, nullable = True, default = 15 )
    max_patients    =   Column ( Integer, nullable = True )

    break_start     =   Column ( Time, nullable = True )
    break_end       =   Column ( Time, nullable = True )
    is_available    =   Column ( Boolean, default = True )
    remarks         =   Column ( Text, nullable = True )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )