from fastapi import APIRouter, HTTPException
from starlette import status
from common_service.response_schema import ApiResponse
from app.schemas.patient_insurance_schema import PatientInsuranceResponse, CreatePatientInsuranceRequest, UpdatePatientInsuranceRequest
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.patient_insurance_service import PatientInsuranceService
from app.utils.response import success



router = APIRouter ( prefix = "/patient/insurance", tags = [ "Patient Insurance Routes" ] )


@router.get( "/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[PatientInsuranceResponse]] )
async def get_all_patient_insurance ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized Access!" )

    insurance = PatientInsuranceService.get_all_patient_insurance( db, patient_uuid )
    return success ( "Retrieve all insurance of Patient successfully!", insurance )


# GET INSURANCE BY INSURANCE ID
@router.get( "/{insurance_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientInsuranceResponse] )
async def get_insurance_by_insurance_id ( db: DB_Dependencies, auth: Auth_Dependency, insurance_id: int, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    insurance = PatientInsuranceService.get_insurance_by_insurance_id( db, insurance_id, patient_uuid )
    return success ( "Insurance retrieved by ID successfully!", insurance )


# CREATE PATIENT INSURANCE
@router.post( "/", status_code = status.HTTP_201_CREATED, response_model = ApiResponse[PatientInsuranceResponse] )
async def create_insurance ( db: DB_Dependencies, auth: Auth_Dependency, insurance_req: CreatePatientInsuranceRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    insurance = PatientInsuranceService.create_insurance( db, insurance_req )
    return success ( "Patient Insurance has been created successfully!", insurance )


# DELETE INSURANCE
@router.delete( "/{insurance_id}/{patient_uuid}", status_code = status.HTTP_200_OK )
async def delete_insurance ( db: DB_Dependencies, auth: Auth_Dependency, insurance_id: int, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    insurance = PatientInsuranceService.delete_insurance( db, patient_uuid, insurance_id )
    return success( "Patient Insurance has been deleted successfully", insurance )


# UDPATE INSURANCE
@router.put( "/{insurance_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientInsuranceResponse] )
async def update_insurance ( db: DB_Dependencies, auth: Auth_Dependency, insurance_id: int, patient_uuid: str, insurance_req: UpdatePatientInsuranceRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    insurance = PatientInsuranceService.update_insurance ( db, patient_uuid, insurance_id, insurance_req )
    return success("Patient Insurance has been updated successfully", insurance)


