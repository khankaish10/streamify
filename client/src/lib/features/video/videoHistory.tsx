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
            // const { id, index } = action.payload;
            // return state.filter((video: VideoHistoryDetails, _id: number) => !(video.videoId === id && _id === index))

            const { videoId, index } = action.payload
            console.log("id:", videoId, index)
            return state.filter((video: VideoHistoryDetails, i: number) => !(videoId === videoId && i === index))
        }
    }
})

export const { videoHistory, deleteHistory } = VideoHistorySlice.actions
export default VideoHistorySlice.reducer
