import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_PATIENT_SERVICE_URL;

/**************************** PATIENT SECTION API ****************************/
// GET ALL LIST OF PATIENTS
export const getPatients = () => {
    return securedApi.get(`${BASE_URL}/patient/`);
};

// PATIENTS COUNT FOR DASHBOARD
export const getPatientCount = () => {
    return securedApi.get(`${BASE_URL}/patient/count`);
};

// RECENT PATIENTS LIST FOR DASHBOARD
export const getRecentPatients = () => {
    return securedApi.get(`${BASE_URL}/patient/?limit_count=3`);
};

// CREATE PATIENT
export const createPatient = (data) => {
    return securedApi.post(`${BASE_URL}/patient/`, data);
};

// GET PATIENT FROM PATIENT UUID
export const getPatientByUUID = (uuid) => {
    return securedApi.get(`${BASE_URL}/patient/${uuid}`);
};

// UPDATE PATIENT
export const updatePatient = (uuid, data) => {
    return securedApi.put(`${BASE_URL}/patient/${uuid}`, data);
};

// DELETE PATIENT
export const deletePatient = (uuid) => {
    return securedApi.delete(`${BASE_URL}/patient/${uuid}`);
};


/**************************** PATIENT CONTACT SECTION API ****************************/
// CREATE PATIENT CONTACT
export const createPatientContact = (data) => {
    return securedApi.post(`${BASE_URL}/patient/contact/`, data);
};

// UPDATE PATIENT CONTACT
export const updatePatientContact = (contactId, patientUUID, payload) => {
    return securedApi.put(`${BASE_URL}/patient/contact/${contactId}/${patientUUID}`, payload);
};

// DELETE PATIENT CONTACT
export const deletePatientContact = (contactId, patientUUID) => {
    return securedApi.delete(`${BASE_URL}/patient/contact/${contactId}/${patientUUID}`);
}


/**************************** PATIENT ADDRESS SECTION API ****************************/
// CREATE PATIENT ADDRESS
export const createPatientAddress = (data) => {
    return securedApi.post(`${BASE_URL}/patient/address/`, data);
};

// UPDATE PATIENT ADDRESS
export const updatePatientAddress = (addressId, patientUUID, payload) => {
    return securedApi.put(`${BASE_URL}/patient/address/${addressId}/${patientUUID}`, payload);
};

// DELETE PATIENT ADDRESS
export const deletePatientAddress = (addressId, patientUUID) => {
    return securedApi.delete(`${BASE_URL}/patient/address/${addressId}/${patientUUID}`);
};
