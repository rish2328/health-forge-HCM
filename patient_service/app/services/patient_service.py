from fastapi import HTTPException
from app.models.patients_model import PatientModel
from starlette import status
from sqlalchemy.exc import IntegrityError
from app.utils.common import generate_patient_mrn
from app.dependencies.auth_service_client import AuthServiceClient


class PatientService:

    # GET ALL PATIENT
    @staticmethod
    def get_all_patients ( db ):
        all_patients = db.query(PatientModel).all()
        return all_patients


    # GET PATIENT BY PATIENT UUID
    @staticmethod
    def get_patient_by_patient_uuid ( db, patient_uuid ):
        patient = db.query(PatientModel).filter( PatientModel.uuid == patient_uuid ).first()
        return patient


    # CREATE PATIENT
    @staticmethod
    def create_patient(db, patient_data, token):
        try:
            data = patient_data.dict()

            user = AuthServiceClient.create_user(
                token,
                {
                    "first_name": patient_data.first_name,
                    "middle_name": patient_data.middle_name,
                    "last_name": patient_data.last_name,
                    "email": patient_data.email,
                    "phone": patient_data.phone,
                    "password": "12345678",
                    "role": "patient"
                }
            )

            data["auth_user_uuid"] = user["uuid"]
            data["patient_mrn"] = generate_patient_mrn(db)
            data["first_name"] = data["first_name"].strip().title()

            if data.get("middle_name"):
                data["middle_name"] = data["middle_name"].strip().title()

            data["last_name"] = data["last_name"].strip().title()

            if data.get("emergency_contact_name"):
                data["emergency_contact_name"] = data["emergency_contact_name"].strip().title()

            if data.get("blood_group"):
                data["blood_group"] = data["blood_group"].strip().upper()

            patient = PatientModel(**data)

            db.add(patient)
            db.commit()
            db.refresh(patient)

            return patient

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ex) )













