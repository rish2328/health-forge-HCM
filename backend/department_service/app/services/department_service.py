from fastapi import HTTPException
from app.models.department_model import DepartmentsModel
from starlette import status
from sqlalchemy.exc import IntegrityError
from app.dependencies.auth_service_client import AuthServiceClient
from sqlalchemy.orm import selectinload
from app.helpers.department_helper import DepartmentHelper


class DepartmentService:

    # GET ALL DEPARTMENTS
    @staticmethod
    def get_all_departments ( db ):
        all_departments = ( db.query(DepartmentsModel)
                        .options( selectinload(DepartmentsModel.code) )
                        .all() )
        return all_departments


    # GET DEPARTMENT BY DEPARTMENT UUID
    @staticmethod
    def get_department_by_department_uuid ( db, department_uuid ):
        department = DepartmentHelper.get_department_by_department_uuid ( db, department_uuid )
        return department


    # CREATE DEPARTMENT
    @staticmethod
    def create_department(db, department_data, token):
        try:
            data = department_data.dict()

            # CREATE USER FOR LOGIN INTO THE PATIENT PORTAL
            user = AuthServiceClient.create_user_at_auth_service(
                token,
                {
                    "first_name": data["first_name"].strip().title(),
                    "middle_name": (
                            data["middle_name"].strip().title()
                            if data.get("middle_name")
                            and data["middle_name"].strip()
                            else None
                        ),
                    "last_name": data["last_name"].strip().title(),
                    "email": data["email"],
                    "phone": data["phone"],
                    "password": "12345678",
                    "role": "department"
                }
            )

            data["auth_user_uuid"] = user["uuid"]
            data["first_name"] = data["first_name"].strip().title()

            if data.get("middle_name"):
                data["middle_name"] = data["middle_name"].strip().title()

            data["last_name"] = data["last_name"].strip().title()

            if data.get("blood_group"):
                data["blood_group"] = data["blood_group"].strip().upper()

            if data.get("marital_status"):
                data["marital_status"] = data["marital_status"].strip().title()

            department = DepartmentsModel(**data)
            db.add(department)
            db.commit()
            db.refresh(department)
            return department

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )

        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # DELETE PATIENT
    @staticmethod
    def delete_patient ( db, patient_uuid, token ):
        try:
            patientExist = DepartmentHelper.get_department_by_department_uuid ( db, patient_uuid )
            if not patientExist:
                raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Patient Not Found!")

            # CREATE USER FOR LOGIN INTO THE PATIENT PORTAL
            user = AuthServiceClient.delete_user_at_auth_service( token, patientExist.auth_user_uuid )

            db.delete(patientExist)
            db.commit()
            return True

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ie))

        except Exception as ex:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ex))


    # UPDATE PATIENT
    @staticmethod
    def update_patient ( db, patient_uuid, patient_req, token ):
        try:
            patient = DepartmentsModel.get_patient_by_patient_uuid( db, patient_uuid )
            if not patient:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Patient Not Found!" )

            patient_data = patient_req.dict()

            # UPDATE USER AT AUTH SERVICE
            user = AuthServiceClient.update_user_at_auth_service(
                token,
                patient.auth_user_uuid,
                {
                    "first_name": patient_data["first_name"].strip().title(),
                    "middle_name": (
                            patient_data["middle_name"].strip().title()
                            if patient_data.get("middle_name")
                            and patient_data["middle_name"].strip()
                            else None
                        ),
                    "last_name": patient_data["last_name"].strip().title(),
                    "email": patient_data["email"],
                    "phone": patient_data["phone"],
                }
            )

            patient.first_name = patient_data["first_name"].strip().title()

            if patient_data.get("middle_name"):
                patient.middle_name = patient_data["middle_name"].strip().title()

            patient.last_name = patient_data["last_name"].strip().title()
            patient.gender = patient_data["gender"]
            patient.dob = patient_data["dob"]

            if patient_data.get("blood_group"):
                patient.blood_group = patient_data["blood_group"].strip().upper()

            if patient_data.get("marital_status"):
                patient.marital_status = patient_data["marital_status"].strip().title()

            patient.email = patient_data["email"]
            patient.phone = patient_data["phone"]

            db.add(patient)
            db.commit()
            db.refresh(patient)
            return patient

        except IntegrityError as ie:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ie))

        except Exception as ex:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ex))




