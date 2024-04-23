import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    queryObject: {},
    queryObjectString: "",
    queryTag: [],
    queryTagString: "",
    queryResult: "",
    cartIds: [],
  },
  reducers: {
    setQueryObject(state, action) {
      const objectQuery = { ...state.query, ...action.payload };
      const result = Object.entries(objectQuery)
        .map((item) => item.join("="))
        .join("&");
      state.queryObjectString = result;
    },
    setQueryTag(state, action) {
      state.queryTag = action.payload;
      const result = state.queryTag.join("&tag=");
      if (state.queryObjectString.length > 0) state.queryTagString = "&tag=" + result;
      else state.queryTagString = "?tag=" + result;
    },
    setQueryResult(state) {
      state.queryResult = state.queryObjectString + state.queryTagString;
    },
    addCartIds(state) {
      // if(state.cartIds.includes(action.payload)) state.cartIds.push(action.payload)
      state.cartIds = "addCartIds";
    },
    removeCartIds(state) {
      state.cartIds = "removeCartIds";
    },
  },
});

export const { setQueryObject, setQueryTag, setQueryResult } = productSlice.actions;

export default productSlice.reducer;
