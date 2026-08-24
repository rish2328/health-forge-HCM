import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_PROVIDER_SERVICE_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_SERVICE_URL;
const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT_SERVICE_URL;

/**************************** PATIENT SECTION API ****************************/
// GET ALL LIST OF PROVIDERS
export const getProviders = () => {
    return securedApi.get(`${BASE_URL}/provider/`);
};

// CREATE PROVIDER
export const createProvider = (data) => {
    return securedApi.post(`${BASE_URL}/provider/`, data);
};

// GET PROVIDER FROM PROVIDER UUID
export const getProviderByUUID = (uuid) => {
    return securedApi.get(`${BASE_URL}/provider/${uuid}`);
};

// UPDATE PROVIDER
export const updateProvider = (uuid, data) => {
    return securedApi.put(`${BASE_URL}/provider/${uuid}`, data);
};

// DELETE PROVIDER
export const deleteProvider = (uuid) => {
    return securedApi.delete(`${BASE_URL}/provider/${uuid}`);
};


/**************************** OTHER SECTION APIs ****************************/
export const getDepartments = async () => {
    return securedApi.get(`${DEPARTMENT_URL}/department/`);
};

export const getRoles = async () => {
    return securedApi.get(`${AUTH_URL}/role/`);
};


/******************** PROVIDER AVAILABILITY SECTION APIs ********************/
export const createProviderAvailability = (data) => {
    return securedApi.post(`${BASE_URL}/provider/availability/`, data);
};