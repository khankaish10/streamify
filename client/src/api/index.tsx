import axios from "axios";
import { API_URL } from "../Constants/Constants";
import  getCookie  from "../util/cookie";

console.log("API URL:", API_URL); // Log the API URL to verify it's correct
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        let token = null;
        getCookie().then((cookie) => {
            token = cookie?.value;

        }
        ).catch((error) => {
            console.error("Error getting cookie:", error);
        });

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }else if((user)) {
            const userData = JSON.parse(user);
            token = userData?.accessToken;
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
        console.log("Profile response:", response.data); // Log the profile data to verify it's correct
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
}


export const handleGetAVideo = async (videoid: string) => {
    try {
        const response = await api.get(`/api/v1/videos/watch/${videoid}`);
        return response.data;
    } catch (error) {
        console.error("Get a video error:", error);
        throw error;
    }
}

export const handleGetAllVideos = async() => {
    try {
        const response = await api.get('/api/v1/videos');
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Getting all video error:", error);
        throw error;
    }
}
