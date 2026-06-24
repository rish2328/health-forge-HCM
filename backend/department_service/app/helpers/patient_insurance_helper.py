from fastapi import HTTPException, status
from app.models.patient_insurances_model import PatientInsuranceModel


class PatientInsuranceHelper:

    @staticmethod
    def get_insurance_by_insurance_id(db, patient_id, insurance_id):
        insurance = db.query(PatientInsuranceModel) \
                            .filter(
                                PatientInsuranceModel.id == insurance_id,
                                PatientInsuranceModel.patient_id == patient_id
                            ) \
                            .first()

        if not insurance:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient Insurance not found!" )

        return insurance