import { createSlice } from "@reduxjs/toolkit";
//-------------------
const initialState = {
  userId: null,
  nickName: null,
};
//--------------------
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
