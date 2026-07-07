import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_PATIENT_SERVICE_URL;

export const getPatients = () => {
    return securedApi.get(`${BASE_URL}/patient/`);
};

export const getPatient = (uuid) => {
    return securedApi.get(`${BASE_URL}/patient/${uuid}`);
};

export const createPatient = (data) => {
    return securedApi.post(`${BASE_URL}/patient/`, data);
};

export const updatePatient = (uuid, data) => {
    return securedApi.put(`${BASE_URL}/patient/${uuid}`, data);
};

export const deletePatient = (uuid) => {
    return securedApi.delete(`${BASE_URL}/patient/${uuid}`);
};