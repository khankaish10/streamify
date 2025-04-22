import { createSlice } from '@reduxjs/toolkit'

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const initialState: User[] = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signup: (state, action) => {
        state.push(action.payload)
    },
   
  }
})

export const { signup } = userSlice.actions
export default userSlice.reducer