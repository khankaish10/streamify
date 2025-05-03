import { createSlice } from '@reduxjs/toolkit'

interface User {
  accessToken?: string,
  avatar?: string,
  coverImage?: string,
  createdAt?: string,
  email?: string,
  fullName?: string,
  userName?: string,
  _id?: string
}


const initialState: User | null = null;

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      // state.push(action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload))
      return action.payload
    },
    logout: (state) => {
      localStorage.removeItem('user');
      return null;
    },
    signUp: (state, action) => {
      // state.push(action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload))
      return action.payload
    }

  }
})

export const { login, logout, signUp } = userSlice.actions
export default userSlice.reducer