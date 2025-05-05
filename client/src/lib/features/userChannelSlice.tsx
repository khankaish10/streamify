import { createSlice } from '@reduxjs/toolkit'

// export interface UserChanneltype {
//   avatar: string,
//   coverImage: string,
//   createdAt: string,
//   email: string,
//   fullName: string,
//   userName: string,
//   _id: string,
//   allvideos: [{}],
//   subscriberCount: number
// }


const initialState: any = {};

const userChannelSlice = createSlice({
  name: 'userChannel',
  initialState,
  reducers: {
        getChannel:(state: any, action: any) => {
            return action.payload
        }

  }
})

export const { getChannel } = userChannelSlice.actions
export default userChannelSlice.reducer