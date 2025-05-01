import { createSlice } from '@reduxjs/toolkit';


interface VideoHistoryDetails {
    _id: string,
    title: string,
    description: string,
    thumbnail: string,
    videoFile: string,
    views: number,
    owner: object,
    tags: string[],
    createdAt: string,
    updatedAt: string,
    __v: number,
    isPublished: boolean,
    duration: number,
}

const initialState: VideoHistoryDetails[] = []


const VideoHistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        videoHistory: (state: any, action: { payload: any} ) => {
            state.push(action.payload)
        },
        deleteHistory: (state: any, action: { payload: any}) => {
            const {id, index} = action.payload;
            console.log("id: ", id)
            console.log("index: ", index)
            return state.filter((video: VideoHistoryDetails, i: number) => !(video._id === id && i === index))
        }
    }
})

export const {videoHistory, deleteHistory} = VideoHistorySlice.actions
export default VideoHistorySlice.reducer
