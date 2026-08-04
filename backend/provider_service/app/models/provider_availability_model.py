from datetime import datetime
from sqlalchemy import Column, Integer, Time, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base


class ProviderAvailabilityModel (Base):
    __tablename__ = "provider_availability"

    id              =   Column(Integer, primary_key=True, index=True)

    provider_id     =   Column ( Integer, ForeignKey ( "providers.id" ), nullable = False )
    provider        =   relationship ( "ProvidersModel", back_populates = "availabilities" )

    day_of_week     =   Column ( SmallInteger, nullable = False )
    start_time      =   Column ( Time, nullable = False )
    end_time        =   Column ( Time, nullable = False )

    slot_duration   =   Column ( Integer, nullable = False, default = 15 )
    max_patients    =   Column ( Integer, nullable = True )

    break_start     =   Column ( Time, nullable = True )
    break_end       =   Column ( Time, nullable = True )
    is_available    =   Column ( Boolean, default = True )

    created_at      =   Column ( DateTime, default = datetime.utcnow )
    updated_at      =   Column ( DateTime, default = datetime.utcnow, onupdate = datetime.utcnow )