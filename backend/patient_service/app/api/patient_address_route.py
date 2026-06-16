from fastapi import APIRouter, HTTPException
from starlette import status
from common_service.response_schema import ApiResponse
from app.schemas.patient_address_schema import PatientAddressResponse, CreatePatientAddressRequest
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.patient_address_service import PatientAddressService
from app.utils.response import success





router = APIRouter ( prefix = "/patient/address", tags = [ "Patient Routes" ] )


# GET PATIENT ALL ADDRESSES ROUTE
@router.get( "/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[PatientAddressResponse]])
async def get_all_patient_address ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    address = PatientAddressService.get_all_patient_address( db, patient_uuid )
    return success ( "Retrieve all addresses of Patient successfully!", address )


# GET ADDRESS BY ADDRESS ID
@router.get( "/{address_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientAddressResponse] )
async def get_address_by_address_id ( db: DB_Dependencies, auth: Auth_Dependency, address_id: int, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    address = PatientAddressService.get_address_by_address_id( db, address_id, patient_uuid )
    return success ( "Address retrieved by ID successfully!", address )


# CREATE PATIENT ADDRESS
@router.post( "/", status_code = status.HTTP_201_CREATED, response_model = ApiResponse[PatientAddressResponse] )
async def create_address ( db: DB_Dependencies, auth: Auth_Dependency, address_req: CreatePatientAddressRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    address = PatientAddressService.create_address( db, address_req )
    return success ( "Patient Address has been created successfully!", address )


# DELETE ADDRESS
# @router.delete( "/{address_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientAddressResponse] )
# async def delete_address ( db: DB_Dependencies, auth: Auth_Dependency, address_id: str, patient_uuid: str ):
#     return






































