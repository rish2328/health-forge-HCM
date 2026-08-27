from fastapi import APIRouter, HTTPException
from starlette import status
from app.schemas.providers_availability_schema import CreateProviderAvailabilitySchema, UpdateProviderAvailabilitySchema, ProviderAvailabilityResponse
from common_service.response_schema import ApiResponse
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.providers_availability_service import ProvidersAvailabilityService
from app.utils.response import success


router = APIRouter( prefix = "/provider/availability", tags = [ "Provider Availability Routes" ])


@router.get( "/{provider_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[ProviderAvailabilityResponse]] )
async def get_all_availability_by_provider_uuid ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    if not provider_uuid:
        raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = "Invalid Provider Availability Request!")

    availability = ProvidersAvailabilityService.get_all_availability_by_provider_uuid ( db, provider_uuid )
    return success ( "Retrieve all Providers Availability successfully!", availability )


@router.get( "/{provider_uuid}/{availability_id}", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderAvailabilityResponse] )
async def get_availability_by_availability_id ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, availability_id: int ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    if not provider_uuid:
        raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = "Invalid Provider Availability Request!")

    availability = ProvidersAvailabilityService.get_availability_by_availability_id ( db, provider_uuid, availability_id )
    return success ( "Retrieve Providers Availability successfully!", availability )


@router.post( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderAvailabilityResponse] )
async def create_availability ( db: DB_Dependencies, auth: Auth_Dependency, availability_data: CreateProviderAvailabilitySchema ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    availability = ProvidersAvailabilityService.create_availability ( db, availability_data )
    return success ( "Provider Availability created successfully", availability )


@router.delete( "/{provider_uuid}/{availability_id}", status_code = status.HTTP_200_OK )
async def delete_availability ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, availability_id: int ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    availability = ProvidersAvailabilityService.delete_availability( db, provider_uuid, availability_id )
    return success ( "Provider Availability has been deleted successfully." )


@router.put( "/{provider_uuid}/{availability_id}", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderAvailabilityResponse] )
async def update_availability ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, availability_id: int, availability_data: UpdateProviderAvailabilitySchema ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    availability = ProvidersAvailabilityService.update_availability( db, provider_uuid, availability_id, availability_data )
    return success ( "Provider Availability has been deleted successfully.", availability )



























































































