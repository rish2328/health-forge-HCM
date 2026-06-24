from fastapi import HTTPException, status
from app.models.patient_contacts_model import PatientContactModel


class PatientContactHelper:

    @staticmethod
    def get_contact_by_contact_id(db, patient_id, contact_id):
        contact = db.query(PatientContactModel) \
                            .filter(
                                PatientContactModel.id == contact_id,
                                PatientContactModel.patient_id == patient_id
                            ) \
                            .first()

        if not contact:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Contact not found!" )

        return contact