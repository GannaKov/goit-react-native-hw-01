import { createSlice } from "@reduxjs/toolkit";
//-------------------
const initialState = {
  userId: null,
  nickName: null,
  stateChange: null,
};
//--------------------
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
    }),
  },
  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
});
console.log("authSlice", authSlice);
