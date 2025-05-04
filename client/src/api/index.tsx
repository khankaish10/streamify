import axios from "axios";
import { API_URL } from "../Constants/Constants";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").accessToken}`, 
    // },
});

const getCookie = (cookieName: string) => {
    const cookies = document.cookie.split("; ");
    console.log("cookies: ", cookies)
    const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return cookie ? cookie.split("=")[1] : null;
};

api.interceptors.request.use(
    (config) => {
        if (config.url === "/users/login" || config.url === "/users/signup"

        ) {
            console.log("skipping login")
            return config
        }
        let localStorageToken = null
        const user = localStorage.getItem("user");
        if (user) {
            localStorageToken = JSON.parse(user).accessToken;
        }

        const token = getCookie("accessToken")
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
            config.headers.Authorization = `Bearer ${token || localStorageToken}`;
            console.log("authorization : ", config.headers.Authorization)
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
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
}


export const handleGetAVideo = async (videoid: string, currentUserId: string | null) => {
    try {
        const response = await api.post(`/videos/watch/${videoid}`, { currentUserId }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
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

export const subscribeApi = async (subscribeTo: string) => {
    try {
        const response = await api.post('/videos/subscribe', { subscribeTo }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        console.log("subscribing failed: ", error)
    }
}
export const unSubscribeApi = async (unSubscribeTo: string) => {
    try {
        const response = await api.post('/videos/unsubscribe', { unSubscribeTo }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        console.log("subscribing failed: ", error)
    }
}
export const createHistoryAndViewsApi = async (videoid: string) => {
    try {
        const response = await api.post(`/videos/history/${videoid}`)
        return response.data
    } catch (error) {
        console.log("Error creating history", error)
    }
}
export const deleteHistoryApi = async (videoid: string) => {
    try {
        const response = await api.delete(`/videos/history/${videoid}`)
        return response.data
    } catch (error) {
        console.log("Error deleting history", error)
    }
}



export const getAllHistoryApi = async () => {
    try {
        const response = await api.get('/videos/history')
        return response.data
    } catch (error) {
        console.log("Error fetching history", error)
    }
}
