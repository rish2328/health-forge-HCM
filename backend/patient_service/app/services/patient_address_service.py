from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from app.models.patient_addresses_model import PatientAddressModel
from starlette import status
from app.helpers.patient_helper import PatientHelper
from app.helpers.patient_address_helper import PatientAddressHelper
from app.schemas.patient_address_schema import CreatePatientAddressRequest, UpdatePatientAddressRequest


class PatientAddressService:

    # GET ALL PATIENT ADDRESS
    @staticmethod
    def get_all_patient_address ( db, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!")

        all_address = db.query(PatientAddressModel).filter(PatientAddressModel.patient_id == patient.id).all()
        return all_address


    # GET ADDRESS BY ADDRESS ID
    @staticmethod
    def get_address_by_address_id ( db, address_id, patient_uuid ):
        patient = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
        if not patient:
            raise HTTPException ( status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found!" )

        address = PatientAddressHelper.get_address_by_address_id ( db, patient.id, address_id )
        if not address:
            raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Address not found!" )

        return address


    # CREATE ADDRESS
    @staticmethod
    def create_address ( db, address_req ):
        try:
            data = address_req.dict()

            patient = PatientHelper.get_patient_by_patient_uuid( db, data["patient_uuid"] )
            if not patient:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            address_data = {
                "patient_id": patient.id,
                "address_line_1": data["address_line_1"].strip().title(),
                "city": data["city"].strip().title(),
                "state": data["state"].strip().title(),
                "country": data["country"].strip().title(),
                "postal_code": data["postal_code"].strip().upper(),
                "address_type": data["address_type"]
            }
            if data.get("address_line_2"):
                address_data["address_line_2"] = data["address_line_2"].strip().title()

            address = PatientAddressModel ( **address_data )
            db.add ( address )
            db.commit ()
            db.refresh ( address )
            return address
        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # DELETE ADDRESS
    @staticmethod
    def delete_address ( db, patient_uuid, address_id ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid(db, patient_uuid)
            if not patient_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient not found!" )

            address_exist = PatientAddressHelper.get_address_by_address_id ( db, patient_exist.id, address_id )
            if not address_exist:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Address not found!" )

            db.delete(address_exist)
            db.commit()
            return True
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE ADDRESS
    @staticmethod
    def update_address ( db, patient_uuid, address_id, address_req ):
        try:
            patient_exist = PatientHelper.get_patient_by_patient_uuid ( db, patient_uuid )
            if not patient_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found!")

            address_exist = PatientAddressHelper.get_address_by_address_id(db, patient_exist.id, address_id)
            if not address_exist:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found!")

            address = address_req.dict()

            address_exist.patient_id        =   patient_exist.id
            address_exist.address_line_1    =   address["address_line_1"]
            address_exist.address_line_2    =   address["address_line_2"]
            address_exist.city              =   address["city"]
            address_exist.state             =   address["state"]
            address_exist.country           =   address["country"]
            address_exist.postal_code       =   address["postal_code"]
            address_exist.address_type      =   address["address_type"]

            db.add ( address_exist )
            db.commit ()
            db.refresh (address_exist)
            return address_exist

        except IntegrityError as ie:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback ()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )



