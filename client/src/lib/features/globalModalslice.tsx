import {createSlice} from '@reduxjs/toolkit'

interface GlobalModalState {
    isOpen: boolean;
    reload: boolean;
}

const initialState: GlobalModalState = {
    isOpen: false,
    reload: false
};


const globalModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state: GlobalModalState) => {
            state.isOpen = true;
        },
        closeModal:(state: GlobalModalState) => {
            state.isOpen = false;
            state.reload = true;
        }
    }
})


export const {openModal, closeModal} = globalModalSlice.actions
export default globalModalSlice.reducer