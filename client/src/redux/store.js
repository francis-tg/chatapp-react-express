import { configureStore } from '@reduxjs/toolkit'
import { chatSlice } from './features/chat'

export default configureStore({
    reducer: {
      chatReduce:chatSlice
  },
})