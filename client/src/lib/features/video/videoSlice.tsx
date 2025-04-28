import { createSlice } from '@reduxjs/toolkit';


interface VideoDetails {
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

const initialState: VideoDetails[] = [{
    _id: '',
    title: '',
    description: '',
    thumbnail: '',
    videoFile: '',
    views: 0,
    owner: {},
    tags: [],
    createdAt: '',
    updatedAt: '',
    __v: 0,
    isPublished: false,
    duration: 0,
}]


const videoslice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        allVideos: (state, action) => {
            console.log(action.payload)
            state.push(action.payload)
            // state._id = action.payload._id
            // state.title = action.payload.title
            // state.description = action.payload.description
            // state.thumbnail = action.payload.thumbnail
            // state.videoFile = action.payload.videoFile
            // state.views = action.payload.views
            // state.owner = action.payload.owner
            // state.tags = action.payload.tags
            // state.createdAt = action.payload.createdAt
            // state.updatedAt = action.payload.updatedAt
            // state.__v = action.payload.__v
            // state.isPublished = action.payload.isPublished
            // state.duration = action.payload.duration
        },

    
    }

})


export const { allVideos } = videoslice.actions
export default videoslice.reducer