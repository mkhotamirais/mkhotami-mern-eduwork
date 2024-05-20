import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: {
    editCat: null,
    editTag: null,
  },
  reducers: {
    setEditCat(state, action) {
      state.editCat = action.payload;
    },
    setEditTag(state, action) {
      state.editTag = action.payload;
    },
  },
});

export const { setEditCat, setEditTag } = editSlice.actions;
export default editSlice.reducer;
