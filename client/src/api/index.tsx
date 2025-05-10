import axios from "axios";
import { API_URL } from "../Constants/Constants";
import { jwtDecode } from "jwt-decode";



export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: API_URL,
});

const getAccessRefreshToken = async (user: any) => {
    try {
        const response = await axios.post<any>("/users/refresh-token", {
            refreshToken: user?.refreshToken
        })
        const newAccessToken = response.data.accessToken
        console.log("new accesstoken : ", newAccessToken)
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem("user", JSON.stringify({ accessToken: newAccessToken, refreshToken: newRefreshToken }))

        return newAccessToken;
    } catch (error) {
        localStorage.removeItem("user");
        window.location.href = "/auth/login"
        alert("Session expired. Please login again.")
        return Promise.reject(error)
    }
}


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











// import axios from "axios";
// import { API_URL } from "../Constants/Constants";
// import { jwtDecode } from "jwt-decode";

// const api = axios.create({
//     // baseURL: process.env.NEXT_PUBLIC_API_URL,
//     baseURL: API_URL,
// });


// api.interceptors.request.use(
//     (config) => {
//         if (config.url === "/users/login" || config.url === "/users/signup") {
//             return config
//         }
//         let token;
//         const user = localStorage.getItem("user");
//         if(user) {
//             token = JSON.parse(user)?.accessToken
//         }

//         if (token) {
//             if (!config.headers) {
//                 config.headers = {};
//             }

//             const decoded: { exp: number } = jwtDecode(token); // Decode the token
//             const currentTime = Date.now() / 1000; // Current time in seconds

//             if (decoded.exp < currentTime) {
//                 localStorage.removeItem("user");
//                 window.location.href = "/auth/login"
//                 alert("Token expired. Please login again.")
//             }

//             config.headers = config.headers || {};
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error: any) => {
//         return Promise.reject(error);
//     }

// )

// interface AuthData {
//     email: string;
//     password: string;
// }

// interface authresponseDetails {
//     data: {
//         _id: string
//     }
// }

// export const handleLogin = async (authData: AuthData) => {
//     try {
//         const response = await api.post<authresponseDetails>("/users/login", authData);
//         return response.data;

//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// }

// export const handleLogout = async () => {
//     try {
//         const response = await api.post("/users/logout");
//         return response.data;
//     } catch (error) {
//         console.error("Logout error:", error);
//         throw error;
//     }
// }

// export const handleSignup = async (formData: any) => {
//     try {
//         const response = await api.post<authresponseDetails>("/users/signup", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Signup error:", error);
//         throw error;
//     }
// }

// interface getProfileType {
//     data: [
//         {
//             _id: string
//         }
//     ]
// }

// export const handleGetProfile = async () => {

//     try {
//         const response = await api.get<getProfileType>("/users/profile");
//         return response.data;
//     } catch (error) {
//         console.error("Get profile error:", error);
//         throw error;
//     }
// }


// export const handleGetAVideo = async (videoid: string, currentUserId: string | null) => {
//     try {
//         const response = await api.post<any>(`/videos/watch/${videoid}`, { currentUserId }, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Get a video error:", error);
//         throw error;
//     }
// }

// interface getAllVideosType {
//     data: [
//         {
//             _id: string
//         }
//     ]
// }
// export const handleGetAllVideos = async () => {
//     try {
//         const response = await api.get<getAllVideosType>('/videos');
//         return response.data
//     } catch (error) {
//         console.error("Getting all video error:", error);
//         throw error;
//     }
// }

// export const handleUploadVideoApi = async (formData: FormData) => {
//     try {
//         const response = await api.post('/videos/upload-video',
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             }
//         )
//         return response.data
//     } catch (error) {
//         console.error("Error uploading video:", error);
//         throw error;
//     }
// }

// export const subscribeApi = async (subscribeTo: string) => {
//     try {
//         const response = await api.post('/videos/subscribe', { subscribeTo }, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         return response.data
//     } catch (error) {
//         console.log("subscribing failed: ", error)
//     }
// }
// export const unSubscribeApi = async (unSubscribeTo: string) => {
//     try {
//         const response = await api.post('/videos/unsubscribe', { unSubscribeTo }, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         return response.data
//     } catch (error) {
//         console.log("subscribing failed: ", error)
//     }
// }
// export const createHistoryAndViewsApi = async (videoid: string) => {
//     try {
//         const response = await api.post(`/videos/history/${videoid}`)
//         return response.data
//     } catch (error) {
//         console.log("Error creating history", error)
//     }
// }
// export const deleteHistoryApi = async (videoid: string) => {
//     try {
//         const response = await api.delete<authresponseDetails>(`/videos/history/${videoid}`)
//         return response.data
//     } catch (error) {
//         console.log("Error deleting history", error)
//     }
// }



// export const getAllHistoryApi = async () => {
//     try {
//         const response = await api.get<authresponseDetails>('/videos/history')
//         return response.data
//     } catch (error) {
//         console.log("Error fetching history", error)
//     }
// }

// interface likeVideoDetails {
//     data: {
//         likes: [string]
//     }
// }

// export const likeVideoApi = async (videoid: string) => {
//     try {
//         const response = await api.post<likeVideoDetails | any>(`/videos/like/${videoid}`)
//         return response.data
//     } catch (error) {
//         console.log("like video failed: ", error)
//     }
// }
// export const clearWatchHistoryApi = async () => {
//     try {
//         const response = await api.delete(`/videos/history`)
//         return response.data
//     } catch (error) {
//         console.log("clearing watch history failed: ", error)
//     }
// }
// export const getUserChannelApi = async (channelid: any) => {
//     try {
//         const response = await api.get<any>(`/users/profile/${channelid}`)
//         return response.data
//     } catch (error) {
//         console.log("clearing watch history failed: ", error)
//     }
// }
// export const createCommentApi = async (comment: any) => {
//     try {
//         const response = await api.post<any>(`/videos/comment`, comment,{
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         return response.data
//     } catch (error) {
//         console.log("creating comment failed: ", error)
//     }
// }
// export const searchVideoApi = async (searchQuery:string) => {
//     try {
//         const response = await api.get<any>(`/videos/search?query=${searchQuery}`)
//         return response.data
//     } catch (error) {
//         console.log("search failed: ", error)
//     }
// }




