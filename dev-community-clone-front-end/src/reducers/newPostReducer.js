import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    coverPicture(state, action) {
      // @ts-ignore
      state.coverPicture = action.payload;
    },
    tags(state, action) {
      // @ts-ignore
      state.tags = action.payload;
    },
    title(state, action) {
      // @ts-ignore
      state.title = action.payload;
    },
    article(state, action) {
      // @ts-ignore
      state.article = action.payload;
    },
    remove(state, action) {
      return initialState;
    },
  },
});

export const { coverPicture, tags, article, title, remove } =
  newPostSlice.actions;

export default newPostSlice.reducer;
