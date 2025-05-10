import { createSlice } from "@reduxjs/toolkit";

const initialState:boolean = false

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        stopLoading: () => {
            return false
        },
        startLoading: () => {
            return true
        }
    }

})

export const {stopLoading, startLoading} = loadingSlice.actions;
export default loadingSlice.reducer