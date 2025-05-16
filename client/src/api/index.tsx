import axios from "axios";
import { API_URL } from "../Constants/Constants";
import { jwtDecode } from "jwt-decode";



export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: API_URL,
});


api.interceptors.request.use(
    async (config: any) => {
        if (config.url === "/users/login" || config.url === "/users/signup") {
            return config
        }
        let accessToken;
        let refreshToken;
        const user = localStorage.getItem("user");
        if (user) {
            accessToken = JSON.parse(user)?.accessToken
            refreshToken = JSON.parse(user)?.refreshToken

        }
        if (accessToken) {
            if (!config.headers) {
                config.headers = {};
            }

            const decoded: { exp: number } = jwtDecode(accessToken); // Decode the token
            const currentTime = Date.now() / 1000; // Current time in seconds

            if (decoded.exp < currentTime) {

                    try {
                        const response = await axios.post<any>(`${API_URL}/users/refresh-token`, {
                            refreshToken
                        })
                        accessToken = response.data.data.accessToken
                        localStorage.setItem("user", JSON.stringify(response.data.data))

                       
                    } catch (error) {
                        localStorage.removeItem("user");
                        window.location.href = "/auth/login"
                        alert("Session expired. Please login again.")
                        return Promise.reject(error)
                    }

            }

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }

)