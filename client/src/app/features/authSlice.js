import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    // userData: null,
    userData: { username: "ahmad" },
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUserData(state, action) {
      console.log("setuserdata");
      // if (action.payload) {
      //   state.userData = jwtDecode(action.payload);
      // } else state.userData = null;
    },
  },
});

export const { setToken, removeToken, setUserData } = authSlice.actions;

export default authSlice.reducer;
