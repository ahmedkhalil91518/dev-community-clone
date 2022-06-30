import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
      enableLoading(state, action) {
        return true
      },
      disableLoading(state, action) {
        return false
      },
    },
   });
    
   export const { enableLoading, disableLoading } = loadingSlice.actions;
   export default loadingSlice.reducer;