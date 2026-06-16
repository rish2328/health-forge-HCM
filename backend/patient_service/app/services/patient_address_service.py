from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.patient_addresses_model import PatientAddressModel
from app.models.patients_model import PatientModel
from starlette import status


class PatientAddressService:

    # GET ALL PATIENT ADDRESS
    @staticmethod
    def get_all_patient_address ( db, patient_uuid ):
        patient = db.query(PatientModel).filter(PatientModel.uuid == patient_uuid).first()
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!")

        all_address = db.query(PatientAddressModel).filter(PatientAddressModel.patient_id == patient.id).all()
        return all_address


    # GET ADDRESS BY ADDRESS ID
    @staticmethod
    def get_address_by_address_id ( db, address_id, patient_uuid ):
        patient = db.query(PatientModel).filter(PatientModel.uuid == patient_uuid).first()
        if not patient:
            raise HTTPException ( status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found!" )

        address = db.query(PatientAddressModel) \
                            .filter(PatientAddressModel.id == address_id) \
                            .filter(PatientAddressModel.patient_id == patient.id) \
                            .first()
        if not address:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Address not found!" )

        return address


    # CREATE ADDRESS
    @staticmethod
    def create_address ( db, address_req ):
        data = address_req.dict()

        data[""]






