import { createSlice } from "@reduxjs/toolkit";



const initialState: any = []


const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        createComment: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const {createComment} = commentSlice.actions
export default commentSlice.reducer