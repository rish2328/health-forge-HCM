from fastapi import APIRouter, HTTPException
from starlette import status
from app.core.database import DB_Dependencies
from common_service.response_schema import ApiResponse
from app.schemas.providers_schema import CreateProviderSchema, UpdateProviderSchema, ProviderResponse
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.providers_service import ProvidersService
from app.utils.response import success

router = APIRouter ( prefix = "/provider", tags = [ "Provider Routes" ] )

# GET ALL PATIENTS
@router.get ( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[ProviderResponse]] )
async def get_all_providers ( db: DB_Dependencies, auth: Auth_Dependency ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    provider = ProvidersService.get_providers( db, auth["token"] )
    return success ( "Retrieve all Providers successfully!", provider )


# GET PATIENT BY PATIENT UUID
# @router.get ( "/{provider_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[ProviderResponse] )
# async def get_provider_by_provider_uuid ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str ):
#     if not auth:
#         raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
#
#     provider = PatientService.get_provider_by_provider_uuid( db, provider_uuid )
#     return success ( "Retrieve Patient by ID successfully!", provider )


# CREATE PATIENT
@router.post( '/', status_code = status.HTTP_201_CREATED, response_model=ApiResponse[ProviderResponse] )
async def create_provider ( db: DB_Dependencies, auth: Auth_Dependency, provider_data: CreateProviderSchema ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    provider = ProvidersService.create_provider ( db, provider_data, auth["token"] )
    return success( "Provider has been created successfully", provider )


# DELETE PATIENT
# @router.delete( '/{provider_uuid}', status_code = status.HTTP_200_OK )
# async def delete_provider ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid ):
#     if not auth:
#         raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
#
#     provider = PatientService.delete_provider ( db, provider_uuid, auth["token"] )
#     return success( "Patient has been deleted successfully", provider )


# UPDATE PATIENT
# @router.put( '/{provider_uuid}', status_code = status.HTTP_200_OK, response_model=ApiResponse[ProviderResponse] )
# async def update_provider ( db: DB_Dependencies, auth: Auth_Dependency, provider_uuid: str, provider_data: UpdateProviderSchema ):
#     if not auth:
#         raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )
#
#     provider = PatientService.update_provider ( db, provider_uuid, provider_data, auth["token"] )
#     return success("Patient has been updated successfully", provider)