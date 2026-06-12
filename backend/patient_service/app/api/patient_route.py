from fastapi import APIRouter, HTTPException
from starlette import status
from app.core.database import DB_Dependencies
from common_service.response_schema import ApiResponse
from app.schemas.patient_schema import PatientResponse, CreatePatientRequest
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.patient_service import PatientService
from app.utils.response import success


router = APIRouter ( prefix = "/patient", tags = [ "Patient Routes" ] )


@router.get ( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[PatientResponse]] )
async def get_all_patients ( db: DB_Dependencies, auth: Auth_Dependency ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.get_all_patients( db )
    return success ( "Retrieve all Patient successfully!", patient )


# CREATE USER
@router.post( '/', status_code = status.HTTP_201_CREATED, response_model=ApiResponse[PatientResponse] )
async def create_user ( db: DB_Dependencies, auth: Auth_Dependency, patient_data: CreatePatientRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.create_patient ( db, patient_data, auth["token"] )
    return success( "Patient has been created successfully", patient )