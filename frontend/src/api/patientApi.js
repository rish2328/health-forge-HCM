import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_PATIENT_SERVICE_URL;

// GET ALL LIST OF PATIENTS
export const getPatients = () => {
    return securedApi.get(`${BASE_URL}/patient/`);
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

// CREATE PATIENT CONTACT
export const createPatientContact = (data) => {
    return securedApi.post(`${BASE_URL}/patient/contact/`, data);
};

// CREATE PATIENT ADDRESS
export const createPatientAddress = (data) => {
    return securedApi.post(`${BASE_URL}/patient/address/`, data);
};
