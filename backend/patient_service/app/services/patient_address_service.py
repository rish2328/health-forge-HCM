from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.patient_addresses_model import PatientAddressModel


class PatientAddressService:

    @staticmethod
    def get_all_address ( db, patient_id ):
        all_address = db.query(PatientAddressModel).filter(PatientAddressModel.patient_id == patient_id).all()
        return all_address
