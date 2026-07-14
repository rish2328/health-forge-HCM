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
        all_departments = db.query(DepartmentsModel).order_by(DepartmentsModel.id.desc()).all()
        return all_departments


    # GET DEPARTMENT BY DEPARTMENT UUID
    @staticmethod
    def get_department_by_department_uuid ( db, department_uuid ):
        department = DepartmentHelper.get_department_by_department_uuid ( db, department_uuid )
        return department


    # CREATE DEPARTMENT
    @staticmethod
    def create_department(db, department_data):
        try:
            data = department_data.dict()
            data["name"] = data["name"].strip().title()
            data["code"] = data["code"].strip().upper()

            check_existing = db.query(DepartmentsModel).filter(DepartmentsModel.name == data["name"]).first()
            if check_existing:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "Department with this name, already exists. Try with another!")

            if data.get("description"):
                data["description"] = data["description"].strip().capitalize()

            department = DepartmentsModel(**data)
            db.add(department)
            db.commit()
            db.refresh(department)
            return department

        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # UPDATE DEPARTMENT
    @staticmethod
    def update_department(db, department_uuid, department_data):
        try:
            data = department_data.dict()
            department = db.query(DepartmentsModel).filter(DepartmentsModel.uuid == department_uuid).first()
            if not department:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Department with this ID, not found!")

            check_existing = db.query(DepartmentsModel).filter(DepartmentsModel.name == data["name"]).filter(DepartmentsModel.uuid != department_uuid).first()
            if check_existing:
                raise HTTPException ( status_code = status.HTTP_409_CONFLICT, detail = "Department with this name, already exists. Try with another!")

            department.name = data["name"].strip().title()
            department.code = data["code"].strip().upper()

            if data.get("description"):
                department.description = data["description"].strip().capitalize()

            db.add(department)
            db.commit()
            db.refresh(department)
            return department

        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )


    # DELETE DEPARTMENT
    @staticmethod
    def delete_department(db, department_uuid):
        try:
            department = db.query(DepartmentsModel).filter(DepartmentsModel.uuid == department_uuid).first()
            if not department:
                raise HTTPException ( status_code = status.HTTP_404_NOT_FOUND, detail = "Department with this ID, not found!")

            db.delete(department)
            db.commit()
            return True

        except HTTPException:
            db.rollback()
            raise
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_400_BAD_REQUEST, detail = str(ie) )
        except Exception as ex:
            db.rollback()
            raise HTTPException ( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(ex) )




