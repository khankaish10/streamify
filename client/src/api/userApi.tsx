import { api } from ".";
import {
    userResponse,
    loginResponsePayload,
    signupResponsePayload,
    getProfileResponsePayload,
} from "@/app/types/userResponse";
import { login, getUserChannel } from "@/app/types/userRequest";


export const handleLogin = async (authData: login) => {
    try {
        const response = await api.post<userResponse<loginResponsePayload>>("/users/login", authData);
        return response.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const handleLogout = async () => {
    try {
        const response = await api.post("/users/logout");
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}

export const handleSignup = async (formData: FormData) => {
    try {
        const response = await api.post<userResponse<signupResponsePayload>>("/users/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
}

export const handleGetProfile = async () => {

    try {
        const response = await api.get<userResponse<getProfileResponsePayload[]>>("/users/profile");
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
}



export const getUserChannelApi = async (channelid: getUserChannel) => {
    try {
        const response = await api.get<userResponse<getProfileResponsePayload[]>>(`/users/profile/${channelid}`)
        return response.data
    } catch (error) {
        console.log("clearing watch history failed: ", error)
    }
}


