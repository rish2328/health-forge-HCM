from pydantic import BaseModel



class CreateProviderSpecialty ( BaseModel ):
    provider_uuid: str
    specialty_name: str
    is_primary: bool


class UpdateProviderSpecialty ( BaseModel ):
    specialty_name: str
    is_primary: bool


class ProviderSpecialtyResponse ( BaseModel ):
    id: int
    provider_id: int
    specialty_name: str
    is_primary: bool

    class Config:
        from_attributes = True
