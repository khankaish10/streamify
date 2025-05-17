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

const initialState: VideoDetails[] = []


const videoslice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        allVideos: (state: any, action: { payload: any; }) => {
            // state.push(action.payload)
            return action.payload
        },
        updateVideoListAfterUpload: (state: any, action: {payload: any}) => {
            return [...state, {...action.payload}]
        },
       

    }

})


export const { allVideos, updateVideoListAfterUpload } = videoslice.actions
export default videoslice.reducer