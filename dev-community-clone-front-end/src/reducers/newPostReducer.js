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
  },
});

export const { coverPicture, tags, article, title } = newPostSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    /*  const notes = await noteService.getAll();
      dispatch(setNotes(notes)); */
  };
};

export default newPostSlice.reducer;
