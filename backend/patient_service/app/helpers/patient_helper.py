from fastapi import HTTPException, status
from app.models.patients_model import PatientModel
from sqlalchemy.orm import selectinload


class PatientHelper:

    @staticmethod
    def get_patient_by_patient_uuid ( db, patient_uuid ):
        patient = db.query(PatientModel) \
                        .options(
                            selectinload(PatientModel.addresses),
                            selectinload(PatientModel.contact),
                            selectinload(PatientModel.document),
                            selectinload(PatientModel.guardians),
                            selectinload(PatientModel.insurances),
                            selectinload(PatientModel.notes)
                        ) \
                        .filter(PatientModel.uuid == patient_uuid) \
                        .first()

        if not patient:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

        return patient