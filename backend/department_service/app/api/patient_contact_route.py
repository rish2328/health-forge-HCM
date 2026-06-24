from fastapi import APIRouter, HTTPException
from starlette import status
from common_service.response_schema import ApiResponse
from app.schemas.patient_contact_schema import PatientContactResponse, CreatePatientContactRequest, UpdatePatientContactRequest
from app.core.database import DB_Dependencies
from app.dependencies.auth_dependency import Auth_Dependency
from app.services.patient_contact_service import PatientContactService
from app.utils.response import success

router = APIRouter ( prefix = "/patient/contact", tags = [ "Patient Contact Routes" ] )

# GET PATIENT ALL CONTACTS ROUTE
@router.get( "/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[list[PatientContactResponse]])
async def get_all_patient_contact ( db: DB_Dependencies, auth: Auth_Dependency, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    contact = PatientContactService.get_all_patient_contact( db, patient_uuid )
    return success ( "Retrieve all contacts of Patient successfully!", contact )


# GET CONTACT BY CONTACT ID
@router.get( "/{contact_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientContactResponse] )
async def get_contact_by_contact_id ( db: DB_Dependencies, auth: Auth_Dependency, contact_id: int, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    contact = PatientContactService.get_contact_by_contact_id( db, contact_id, patient_uuid )
    return success ( "Contact retrieved by ID successfully!", contact )


# CREATE PATIENT CONTACT
@router.post( "/", status_code = status.HTTP_201_CREATED, response_model = ApiResponse[PatientContactResponse] )
async def create_contact ( db: DB_Dependencies, auth: Auth_Dependency, contact_req: CreatePatientContactRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    contact = PatientContactService.create_contact( db, contact_req )
    return success ( "Patient Contact has been created successfully!", contact )


# DELETE CONTACT
@router.delete( "/{contact_id}/{patient_uuid}", status_code = status.HTTP_200_OK )
async def delete_contact ( db: DB_Dependencies, auth: Auth_Dependency, contact_id: int, patient_uuid: str ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    contact = PatientContactService.delete_contact( db, patient_uuid, contact_id )
    return success( "Patient Contact has been deleted successfully", contact )


# UDPATE CONTACT
@router.put( "/{contact_id}/{patient_uuid}", status_code = status.HTTP_200_OK, response_model = ApiResponse[PatientContactResponse] )
async def update_contact ( db: DB_Dependencies, auth: Auth_Dependency, contact_id: int, patient_uuid: str, contact_req: UpdatePatientContactRequest ):
    if not auth:
        raise HTTPException ( status_code = status.HTTP_401_UNAUTHORIZED, detail = "Unauthorized access!" )

    contact = PatientContactService.update_contact ( db, patient_uuid, contact_id, contact_req )
    return success("Patient Contact has been updated successfully", contact)




































