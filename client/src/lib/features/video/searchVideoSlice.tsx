import {createSlice} from '@reduxjs/toolkit'



const initialState:any = []



const searchVideoSlice = createSlice({
    name: "searchVideo",
    initialState,
    reducers: {
        setSearchedVideo: (state, action) => {
            return action.payload
        }
    }
})

export const {setSearchedVideo} = searchVideoSlice.actions
export default searchVideoSlice.reducer