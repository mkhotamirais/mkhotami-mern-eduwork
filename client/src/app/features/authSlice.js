import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
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
      state.userData = jwtDecode(action.payload);
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    removeUserData(state) {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { setToken, removeToken, setUserData, removeUserData } = authSlice.actions;

export default authSlice.reducer;
