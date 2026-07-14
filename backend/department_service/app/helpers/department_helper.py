from fastapi import HTTPException, status
from app.models.department_model import DepartmentsModel
from sqlalchemy.orm import selectinload


class DepartmentHelper:

    @staticmethod
    def get_department_by_department_uuid ( db, department_uuid ):
        department = db.query(DepartmentsModel).filter( DepartmentsModel.uuid == department_uuid ).first()

        if not department:
            raise HTTPException( status_code = status.HTTP_404_NOT_FOUND, detail = "Department not found!" )

        return department