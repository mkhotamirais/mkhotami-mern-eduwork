import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basic",
  initialState: {
    dark: JSON.parse(localStorage.getItem(`mernEduworkDark`)) || false,
    openAdminMenu: false,
    openUserMenu: false,
  },
  reducers: {
    toggleDark(state) {
      state.dark = !state.dark;
      localStorage.setItem("mernEduworkDark", JSON.stringify(state.dark));
    },
    removeDark(state) {
      state.dark = false;
      localStorage.setItem("mernEduworkDark", JSON.stringify(state.dark));
    },
    toggleOpenAdminMenu(state) {
      state.openAdminMenu = !state.openAdminMenu;
    },
    removeOpenAdminMenu(state) {
      state.openAdminMenu = false;
    },
    toggleOpenUserMenu(state) {
      state.openUserMenu = !state.openUserMenu;
    },
    removeOpenUserMenu(state) {
      state.openUserMenu = false;
    },
  },
});

export const { toggleDark, removeDark, toggleOpenAdminMenu, removeOpenAdminMenu, toggleOpenUserMenu, removeOpenUserMenu } =
  basicSlice.actions;

export default basicSlice.reducer;
