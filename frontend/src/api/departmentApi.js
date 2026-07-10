import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_DEPARTMENT_SERVICE_URL;

export const createDepartment = async (payload) => {
    return securedApi.post(`${BASE_URL}/department`, payload);
};

export const getDepartments = async () => {
    return securedApi.get(`${BASE_URL}/department`);
};

export const getDepartmentByUUID = async (uuid) => {
    return securedApi.get(`${BASE_URL}/department/${uuid}`);
};

export const updateDepartment = async (uuid, payload) => {
    return securedApi.put(`${BASE_URL}/department/${uuid}`, payload);
};

export const deleteDepartment = async (uuid) => {
    return securedApi.delete(`${BASE_URL}/department/${uuid}`);
};