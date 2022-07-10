import { createSlice } from "@reduxjs/toolkit";
import { showAllPosts } from "services/viewPostsService";
const initialState = null;

const showPostsSlice = createSlice({
  name: "showPosts",
  initialState,
  reducers: {
    getAll(state, action) {
      return action.payload;
    },
  },
});

export const { getAll } = showPostsSlice.actions;

export const getRelative = () => {
  return async (dispatch) => {
    const posts = await showAllPosts();
    dispatch(getAll(posts));
  };
};

export default showPostsSlice.reducer;
