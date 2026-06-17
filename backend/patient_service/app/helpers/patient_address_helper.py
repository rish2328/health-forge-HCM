from fastapi import HTTPException, status
from app.models.patient_addresses_model import PatientAddressModel


class PatientAddressHelper:

    @staticmethod
    def get_address_by_address_id(db, patient_id, address_id):
        address = db.query(PatientAddressModel) \
                            .filter(
                                PatientAddressModel.id == address_id,
                                PatientAddressModel.patient_id == patient_id
                            ) \
                            .first()

        if not address:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Address not found!" )

        return address