import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/users/userSlice'
import App from 'next/app'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice
    }
  })
}

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof makeStore>