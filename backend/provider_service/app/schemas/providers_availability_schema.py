from datetime import time
from pydantic import BaseModel
from typing import Optional


class CreateProviderAvailabilitySchema ( BaseModel ):
    provider_uuid:  str
    week_days: str
    start_time: time
    end_time: time
    slot_duration: int
    max_patients: int
    break_start: time
    break_end: time
    is_available: bool
    remarks: Optional[str] = None


class UpdateProviderAvailabilitySchema ( BaseModel ):
    week_days: str
    start_time: time
    end_time: time
    slot_duration: int
    max_patients: int
    break_start: time
    break_end: time
    is_available: bool
    remarks: Optional[str] = None


class ProviderAvailabilityResponse ( BaseModel ):
    id: int
    provider_id: int
    week_days: str
    start_time: time
    end_time: time
    slot_duration: int
    max_patients: int
    break_start: time
    break_end: time
    is_available: bool
    remarks: Optional[str] = None

    class Config:
        from_attributes = True
