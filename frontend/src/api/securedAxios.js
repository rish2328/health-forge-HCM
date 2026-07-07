import axios from "axios";

const securedApi = axios.create({
    headers: { "Content-Type": "application/json" },
});

securedApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default securedApi;