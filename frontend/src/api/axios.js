import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
    timeout: 10000, // 10 Seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        // Login API par token ki zarurat nahi hoti
        if (token && !config.url.includes("/auth/login")) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Backend not reachable / Network Error
        if (!error.response) {
            console.error("Authentication Service Unavailable");
        }

        // Timeout
        if (error.code === "ECONNABORTED") {
            console.error("Request Timeout");
        }
        return Promise.reject(error);
    }
);

export default api;