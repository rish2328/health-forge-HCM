from app.models.department_model import PatientModel



# GENERATE PATIENT MRN
def generate_patient_mrn ( db ):
    last_patient = ( db.query(PatientModel).order_by(PatientModel.id.desc()).first())
    next_number = 1

    if last_patient and last_patient.patient_mrn:
        last_number = int(last_patient.patient_mrn.split("-")[-1])
        next_number = last_number + 1

    return f"MRN-{next_number:06d}"