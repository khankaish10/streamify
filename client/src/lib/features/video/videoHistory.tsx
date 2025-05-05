import { createSlice } from '@reduxjs/toolkit';


interface VideoHistoryDetails {
    _id: string;
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    views: number;
    owner: {
        _id: string;
        userName: string;
        email: string;
        fullName: string;
        avatar: string;
    };
    watchedAt: string;
    createdAt: string;
}

const initialState: VideoHistoryDetails[] = []


const VideoHistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        videoHistory: (state: any, action: { payload: any }) => {
            return action.payload
        },
        deleteHistory: (state: any, action: { payload: any }) => {
            const { videoId, index } = action.payload
            return state.filter((video: VideoHistoryDetails, i: number) => !(videoId === videoId && i === index))
        },
        clearHistory: (state: any) => {
            return []
        }
    }
})

export const { videoHistory, deleteHistory, clearHistory } = VideoHistorySlice.actions
export default VideoHistorySlice.reducer
