from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.patient_insurances_model import PatientInsuranceModel
from starlette import status
from app.helpers.patient_helper import PatientHelper
from app.helpers.patient_insurance_helper import PatientInsuranceHelper


class PatientInsuranceService:

    # GET ALL PATIENT INSURANCE
    @staticmethod
    def get_all_patient_insurance ( db, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!")

        all_insurance = db.query(PatientInsuranceModel).filter(PatientInsuranceModel.patient_id == patient.id).all()
        return all_insurance


    # GET INSURANCE BY INSURANCE ID
    @staticmethod
    def get_insurance_by_insurance_id ( db, insurance_id, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

        insurance = PatientInsuranceHelper.get_insurance_by_insurance_id ( db, patient.id, insurance_id )
        if not insurance:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Insurance not found!" )

        return insurance


    # CREATE INSURANCE
    @staticmethod
    def create_insurance ( db, insurance_req ):
        try:
            data = insurance_req.dict()

            patient = PatientHelper.get_patient_by_patient_uuid( db, data["patient_uuid"] )
            if not patient:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            insurance_data = {
                "patient_id": patient.id,
                "provider_name": data["provider_name"].strip().title(),
                "policy_number": data["policy_number"].strip().upper(),
                "group_number": data["group_number"],
                "subscriber_name": data["subscriber_name"].strip().title(),
                "effective_date": data["effective_date"],
                "expiry_date": data["expiry_date"],
            }
            insurance = PatientInsuranceModel ( **insurance_data )
            db.add ( insurance )
            db.commit ()
            db.refresh ( insurance )
            return insurance

        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # DELETE INSURANCE
    @staticmethod
    def delete_insurance ( db, patient_uuid, insurance_id ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid(db, patient_uuid)
            if not patient_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            insurance_exist = PatientInsuranceHelper.get_insurance_by_insurance_id ( db, patient_exist.id, insurance_id )
            if not insurance_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Contact not found!" )

            db.delete(insurance_exist)
            db.commit()
            return True

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE INSURANCE
    @staticmethod
    def update_insurance ( db, patient_uuid, insurance_id, insurance_req ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
            if not patient_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found!")

            insurance_exist = PatientInsuranceHelper.get_insurance_by_insurance_id ( db, patient_exist.id, insurance_id )
            if not insurance_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found!")

            insurance = insurance_req.dict()

            insurance_exist.patient_id      =   patient_exist.id
            insurance_exist.provider_name   =   insurance["provider_name"].strip().title()
            insurance_exist.policy_number   =   insurance["policy_number"].strip().upper()
            insurance_exist.group_number    =   insurance["group_number"]
            insurance_exist.subscriber_name =   insurance["subscriber_name"].strip().title()
            insurance_exist.effective_date  =   insurance["effective_date"]
            insurance_exist.expiry_date     =   insurance["expiry_date"]

            db.add ( insurance_exist )
            db.commit ()
            db.refresh (insurance_exist)
            return insurance_exist

        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )



