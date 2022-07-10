import { createSlice } from "@reduxjs/toolkit";
import { showAllPosts } from "services/postsService";

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

export const getRelative = (token) => {
  return async (dispatch) => {
    const posts = await showAllPosts(token);
    dispatch(getAll(posts));
  };
};

export default showPostsSlice.reducer;
