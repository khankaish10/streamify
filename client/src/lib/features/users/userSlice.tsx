import { createSlice } from '@reduxjs/toolkit'

interface User {
  accessToken: string,
  avatar: string,
  coverImage: string,
  createdAt: string,
  email: string,
  fullName: string,
  userName: string,
  _id: string
}


const initialState: User[] = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.length = 0
      localStorage.removeItem('user')
    },
    signUp: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload))
    }

  }
})

export const { login, logout, signUp } = userSlice.actions
export default userSlice.reducer