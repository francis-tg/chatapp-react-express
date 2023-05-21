import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({ 
    name:"chat",
  initialState: {
    chat: {
      msgBox:true
  }
  },
  reducers: {
      toUserList: (state, paylaod) => {
          return state.chat.msgBox = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {toUserList } = chatSlice.actions

export default chatSlice.reducer