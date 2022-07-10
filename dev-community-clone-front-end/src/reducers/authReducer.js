import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorizeUser(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { authorizeUser, logout } = authSlice.actions;
export default authSlice.reducer;
