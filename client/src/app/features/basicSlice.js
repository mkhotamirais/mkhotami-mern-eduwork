import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basic",
  initialState: {
    dark: JSON.parse(localStorage.getItem(`mernEduworkDark`)) || false,
    openAuth: false,
    openAdminMenu: false,
    openUserMenu: false,
    openNav: false,
    viewMode: JSON.parse(localStorage.getItem("viewMode")) || "card",
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
    removeOpenAuthMenu(state) {
      state.openUserMenu = false;
      state.openAdminMenu = false;
    },
    toggleOpenNav(state) {
      state.openNav = !state.openNav;
    },
    removeOpenNav(state) {
      state.openNav = false;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    toggleOpenAuth(state) {
      state.openAuth = !state.openAuth;
    },
    removeOpenAuth(state) {
      state.openAuth = false;
    },
  },
});

export const {
  toggleDark,
  removeDark,
  toggleOpenAdminMenu,
  removeOpenAdminMenu,
  toggleOpenUserMenu,
  removeOpenUserMenu,
  removeOpenAuthMenu,
  toggleOpenNav,
  removeOpenNav,
  setViewMode,
  toggleOpenAuth,
  removeOpenAuth,
} = basicSlice.actions;

export default basicSlice.reducer;
