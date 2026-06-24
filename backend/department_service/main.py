import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine
from app.models import department_model, code_model
# from app.api import patient_route, patient_address_route, patient_contact_route, patient_insurance_route


Base.metadata.create_all ( bind = engine )
app = FastAPI ( title = "Health Forge ( A Health Care Management System )")

# app.include_router ( patient_route.router )
# app.include_router ( patient_address_route.router )
# app.include_router ( patient_contact_route.router )
# app.include_router ( patient_insurance_route.router )