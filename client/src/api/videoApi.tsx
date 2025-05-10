import { api } from ".";


interface authresponseDetails {
    data: {
        _id: string
    }
}


export const handleGetAVideo = async (videoid: string, currentUserId: string | null) => {
    try {
        console.log("userId: ", currentUserId)
        const response = await api.post<any>(`/videos/watch/${videoid}`, { currentUserId }, {
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

interface getAllVideosType {
    data: [
        {
            _id: string
        }
    ]
}
export const handleGetAllVideos = async () => {
    try {
        const response = await api.get<getAllVideosType>('/videos');
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
        const response = await api.delete<authresponseDetails>(`/videos/history/${videoid}`)
        return response.data
    } catch (error) {
        console.log("Error deleting history", error)
    }
}

export const getAllHistoryApi = async () => {
    try {
        const response = await api.get<authresponseDetails>('/videos/history')
        return response.data
    } catch (error) {
        console.log("Error fetching history", error)
    }
}

interface likeVideoDetails {
    data: {
        likes: [string]
    }
}

export const likeVideoApi = async (videoid: string) => {
    try {
        const response = await api.post<likeVideoDetails | any>(`/videos/like/${videoid}`)
        return response.data
    } catch (error) {
        console.log("like video failed: ", error)
    }
}
export const clearWatchHistoryApi = async () => {
    try {
        const response = await api.delete(`/videos/history`)
        return response.data
    } catch (error) {
        console.log("clearing watch history failed: ", error)
    }
}

export const createCommentApi = async (comment: any) => {
    try {
        const response = await api.post<any>(`/videos/comment`, comment,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        console.log("creating comment failed: ", error)
    }
}
export const deleteCommentApi = async (comment: any) => {
    try {
        const response = await api.post<any>(`/videos/delete-comment`, comment,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (error) {
        console.log("deleting comment failed: ", error)
    }
}
export const searchVideoApi = async (searchQuery:string) => {
    try {
        const response = await api.get<any>(`/videos/search?query=${searchQuery}`)
        return response.data
    } catch (error) {
        console.log("search failed: ", error)
    }
}



