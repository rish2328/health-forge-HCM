from starlette import status
from app.utils.response import success
from fastapi import APIRouter, HTTPException
from app.core.database import DB_Dependencies
from common_service.response_schema import ApiResponse
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.providers_specialty_service import ProvidersSpecialtyService
from app.schemas.providers_specialty_schema import CreateProviderSpecialty, UpdateProviderSpecialty, ProviderSpecialtyResponse


router = APIRouter( prefix = "/provider/specialty", tags = [ "Provider Specialty Routes" ] )

@router.get ( "/{provider_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[ProviderSpecialtyResponse]] )
async def get_all_specialty_by_provider_uuid ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    if not provider_uuid:
        raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = "Invalid Provider Specialty Request!" )

    specialty = ProvidersSpecialtyService.get_all_specialty_by_provider_uuid ( db, provider_uuid )
    return success ( "Retrieve all Providers Specialty successfully!", specialty )


@router.get ( "/{provider_uuid}/{specialty_id}", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderSpecialtyResponse] )
async def get_specialty_by_specialty_id ( db:DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, specialty_id: int ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    if not provider_uuid:
        raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = "Invalid Provider Specialty Request!" )

    specialty = ProvidersSpecialtyService.get_specialty_by_specialty_id ( db, provider_uuid, specialty_id )
    return success("Retrieve Providers Specialty successfully!", specialty)


@router.post ( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderSpecialtyResponse] )
async def create_specialty ( db: DB_Dependencies, auth: Auth_Dependency, specialty_data: CreateProviderSpecialty ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    specialty = ProvidersSpecialtyService.create_specialty ( db, specialty_data )
    return success ( "Provider Specialty created successfully", specialty )


@router.delete ( "/{provider_uuid}/{specialty_id}", status_code = status.HTTP_200_OK )
async def delete_specialty ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, specialty_id: int ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    specialty = ProvidersSpecialtyService.delete_specialty ( db, provider_uuid, specialty_id )
    return success( "Provider Specialty deleted successfully", specialty )


@router.put ( "/{provider_uuid}/{specialty_id}", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderSpecialtyResponse] )
async def update_specialty ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, specialty_id: int, specialty_data: UpdateProviderSpecialty ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    specialty = ProvidersSpecialtyService.update_specialty ( db, provider_uuid, specialty_id, specialty_data )
    return success( "Provider Specialty updated successfully", specialty )
