import {createSlice} from '@reduxjs/toolkit';


interface VideoDetails {
    _id:string,
    title:string,
    description:string,
    thumbnail:string,
    videoFile:string,
    views:number,
    owner: object,
    tags: string[],
    createdAt: string,
    updatedAt: string,
    __v: number,
    isPublished: boolean,
    duration: number,
}

const initialState: VideoDetails = {
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
}


const videoslice = createSlice({
    name: 'video',
    initialState,
    reducers:{
        videoDetails: (state, action) => {
            console.log("a:",action.payload)
            state = action.payload
        }
    }

})


export const {videoDetails} = videoslice.actions
export default videoslice.reducer