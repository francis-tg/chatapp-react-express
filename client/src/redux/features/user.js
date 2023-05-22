import { createSlice } from '@reduxjs/toolkit'
const initialState ={
    user: {
          isAuth: !!sessionStorage.getItem("token"),
        userData:{}
  }
  }
export const userSlice = createSlice({ 
    name:"userState",
  initialState,
  reducers: {
      setUserData: (state, action) => {
        state.user.userData = {...state.user.userData,...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserData } = userSlice.actions

export default userSlice.reducer