import { createSlice } from '@reduxjs/toolkit'

export interface Usertype {
  accessToken: string,
  avatar: string,
  coverImage: string,
  createdAt: string,
  email: string,
  fullName: string,
  userName: string,
  _id: string,
  allvideos?: any[];
  subscriberCount: number;
}


const initialState: Usertype = {
  accessToken: '',
  avatar: '',
  coverImage: '',
  createdAt: '',
  email: '',
  fullName: '',
  userName: '',
  _id: '',
  allvideos: [], // Initialize as an empty array
  subscriberCount: 0
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, ...action.payload, allvideos: state?.allvideos || [] } // Merge the state with the payload
    },
    logout: () => {
      localStorage.removeItem('user');
      return initialState;
    },
    signUp: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      return action.payload
    },
    ProfileVideosAndSubsCount: (state, action) => {
      return { ...state, allvideos: action.payload.allvideos, subscriberCount: action.payload?.subscriberCount }
    },
    updateProfile: (state, action) => {
      localStorage.setItem('user', JSON.stringify({ ...state, ...action.payload }))
      return { ...state, ...action.payload }
    }

  }
})

export const { login, logout, signUp, ProfileVideosAndSubsCount, updateProfile } = userSlice.actions
export default userSlice.reducer 