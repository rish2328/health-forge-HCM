import securedApi from "./securedAxios";

const BASE_URL = import.meta.env.VITE_DEPARTMENT_SERVICE_URL;

export const createDepartment = (payload) => {
    return securedApi.post(`${BASE_URL}/department`, payload);
};

export const getDepartments = () => {
    return securedApi.get(`${BASE_URL}/department`);
};

export const getDepartmentByUUID = (uuid) => {
    console.log('check-getDepartmentByUUID', uuid);
    return securedApi.get(`${BASE_URL}/department/${uuid}`);
};

export const updateDepartment = (uuid, payload) => {
    return securedApi.put(`${BASE_URL}/department/${uuid}`, payload);
};

export const deleteDepartment = (uuid) => {
    return securedApi.delete(`${BASE_URL}/department/${uuid}`);
};