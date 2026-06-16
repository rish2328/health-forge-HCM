from fastapi import APIRouter, HTTPException
from starlette import status
from app.core.database import DB_Dependencies
from common_service.response_schema import ApiResponse
from app.schemas.patient_schema import PatientResponse, CreatePatientRequest, UpdatePatientRequest
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.patient_service import PatientService
from app.utils.response import success


router = APIRouter ( prefix = "/patient", tags = [ "Patient Routes" ] )


# GET ALL PATIENTS
@router.get ( "/", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[PatientResponse]] )
async def get_all_patients ( db: DB_Dependencies, auth: Auth_Dependency ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.get_all_patients( db )
    return success ( "Retrieve all Patient successfully!", patient )


# GET PATIENT BY PATIENT UUID
@router.get ( "/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientResponse] )
async def get_patient_by_patient_uuid ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.get_patient_by_patient_uuid( db, patient_uuid )
    return success ( "Retrieve Patient by ID successfully!", patient )


# CREATE PATIENT
@router.post( '/', status_code = status.HTTP_201_CREATED, response_model=ApiResponse[PatientResponse] )
async def create_user ( db: DB_Dependencies, auth: Auth_Dependency, patient_data: CreatePatientRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.create_patient ( db, patient_data, auth["token"] )
    return success( "Patient has been created successfully", patient )


# DELETE PATIENT
@router.delete( '/{patient_uuid}', status_code = status.HTTP_200_OK )
async def delete_patient ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.delete_patient ( db, patient_uuid, auth["token"] )
    return success( "Patient has been deleted successfully", patient )


# UPDATE PATIENT
@router.put( '/{patient_uuid}', status_code = status.HTTP_200_OK, response_model=ApiResponse[PatientResponse] )
async def update_patient ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid: str, patient_data: UpdatePatientRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    patient = PatientService.update_patient ( db, patient_uuid, patient_data, auth["token"] )
    return success("Patient has been updated successfully", patient)