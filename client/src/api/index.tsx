import axios from "axios";
import { API_URL } from "../Constants/Constants";
console.log("API URL:", API_URL); // Log the API URL to verify it's correct
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        const token = document.cookie
            .split('; ')[0]

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

)

interface AuthData {
    email: string;
    password: string;
}

export const handleLogin = async (authData: AuthData) => {
    try {
        console.log("Login data:", authData); // Log the login data to verify it's correct
        const response = await api.post("/api/v1/users/login", authData);
        return response.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const handleLogout = async () => {
    try {
        const response = await api.post("/api/v1/users/logout");
        console.log("Logout response:", response.data); // Log the response data to verify it's correct
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}

export const handleSignup = async (formData: any) => {
    try {
        const response = await api.post("/api/v1/users/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }); 
        console.log("Signup response:", response.data); // Log the response data to verify it's correct
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
}

export const handleGetProfile = async () => {
    try {
        const response = await api.get("/api/v1/users/profile");
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
}

