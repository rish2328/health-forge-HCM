from fastapi import HTTPException
from app.models.department_model import DepartmentsModel
from starlette import status
from sqlalchemy.exc import IntegrityError
from app.dependencies.auth_service_client import AuthServiceClient
from sqlalchemy.orm import selectinload
from app.helpers.department_helper import DepartmentHelper


class InternalDepartmentService:

    # GET DEPARTMENT BY DEPARTMENT UUID
    @staticmethod
    def get_internal_department_by_department_uuid ( db, department_uuid ):
        department = db.query(DepartmentsModel).filter( DepartmentsModel.uuid == department_uuid ).first()
        return department



