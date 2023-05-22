import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({ 
    name:"chat",
  initialState: {
    chat: {
      msgBox:false
  }
  },
  reducers: {
      toUserList: (state, action) => {
       state.chat.msgBox = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {toUserList } = chatSlice.actions

export default chatSlice.reducer