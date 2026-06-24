from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.patient_contacts_model import PatientContactModel
from starlette import status
from app.helpers.patient_helper import PatientHelper
from app.helpers.patient_contact_helper import PatientContactHelper


class PatientContactService:

    # GET ALL PATIENT CONTACT
    @staticmethod
    def get_all_patient_contact ( db, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!")

        all_contact = db.query(PatientContactModel).filter(PatientContactModel.patient_id == patient.id).all()
        return all_contact


    # GET CONTACT BY CONTACT ID
    @staticmethod
    def get_contact_by_contact_id ( db, contact_id, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

        contact = PatientContactHelper.get_contact_by_contact_id ( db, patient.id, contact_id )
        if not contact:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Contact not found!" )

        return contact


    # CREATE CONTACT
    @staticmethod
    def create_contact ( db, contact_req ):
        try:
            data = contact_req.dict()

            patient = PatientHelper.get_patient_by_patient_uuid( db, data["patient_uuid"] )
            if not patient:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            contact_data = {
                "patient_id": patient.id,
                "name": data["name"].strip().title(),
                "relation": data["relation"].strip().title(),
                "phone": data["phone"],
                "is_emergency_contact": data["is_emergency_contact"],
            }
            if data.get("email"):
                contact_data["email"] = data["email"]

            contact = PatientContactModel ( **contact_data )
            db.add ( contact )
            db.commit ()
            db.refresh ( contact )
            return contact

        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # DELETE CONTACT
    @staticmethod
    def delete_contact ( db, patient_uuid, contact_id ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid(db, patient_uuid)
            if not patient_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            contact_exist = PatientContactHelper.get_contact_by_contact_id ( db, patient_exist.id, contact_id )
            if not contact_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Contact not found!" )

            db.delete(contact_exist)
            db.commit()
            return True

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE CONTACT
    @staticmethod
    def update_contact ( db, patient_uuid, contact_id, contact_req ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
            if not patient_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found!")

            contact_exist = PatientContactHelper.get_contact_by_contact_id ( db, patient_exist.id, contact_id )
            if not contact_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found!")

            contact = contact_req.dict()

            contact_exist.patient_id    =   patient_exist.id
            contact_exist.name          =   contact["name"].strip().title()
            contact_exist.relation      =   contact["relation"].strip().title()
            contact_exist.phone         =   contact["phone"]
            contact_exist.is_emergency_contact  =   contact["is_emergency_contact"]

            if contact.get("email"):
                contact_exist.email  =   contact["email"]

            db.add ( contact_exist )
            db.commit ()
            db.refresh (contact_exist)
            return contact_exist

        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )



