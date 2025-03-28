import axios from "axios";

const API_URL = "https://api.navinatubelleza.com/api"; // URL base de la API

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar autenticación si es necesario
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Si la API usa tokens
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
