import axios from "axios";
import { API_URL } from "../Constants/Constants";
// import getCookie from "../util/cookie";
import { jwtDecode } from "jwt-decode";
import checkTokenExpiry from "@/app/components/checkTokenExpiry";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const getCookie = (cookieName: string) => {
    const cookies = document.cookie.split("; ");
    console.log("cookies: ", cookies)
    const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return cookie ? cookie.split("=")[1] : null;
};

api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        let localStorageToken = null
        if (user) {
            localStorageToken = JSON.parse(user);
        }

        const token = getCookie("accessToken")
        console.log("token: ", token)
        console.log("localstorage token : ", localStorageToken)

        if (token || localStorageToken) {
            if (!config.headers) {
                config.headers = {};
            }

            const decoded: { exp: number } = jwtDecode(token || localStorageToken); // Decode the token
            const currentTime = Date.now() / 1000; // Current time in seconds

            if (decoded.exp < currentTime) {
                localStorage.removeItem("user"); 
                document.cookie = `accessToken="";`
                window.location.href = "/auth/login"
                alert("Token expired. Pleae login again.")
            }

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }

)

interface AuthData {
    email: string;
    password: string;
}

export const handleLogin = async (authData: AuthData) => {
    try {
        const response = await api.post("/users/login", authData);
        return response.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const handleLogout = async () => {
    try {
        const response = await api.post("/users/logout");
        console.log("Logout response:", response); // Log the response data to verify it's correct
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}

export const handleSignup = async (formData: any) => {
    try {
        const response = await api.post("/users/signup", formData, {
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
        const response = await api.get("/users/profile");
        console.log("Profile response:", response.data); // Log the profile data to verify it's correct
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
}


export const handleGetAVideo = async (videoid: string) => {
    try {
        const response = await api.get(`/videos/watch/${videoid}`);
        return response.data;
    } catch (error) {
        console.error("Get a video error:", error);
        throw error;
    }
}

export const handleGetAllVideos = async () => {
    try {
        const response = await api.get('/videos');
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Getting all video error:", error);
        throw error;
    }
}

export const handleUploadVideoApi = async (formData: FormData) => {
    try {
        const response = await api.post('/videos/upload-video',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        return response.data
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
    }
}
