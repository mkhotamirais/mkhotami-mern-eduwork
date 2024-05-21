import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCount: 0,
    totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
    address: JSON.parse(localStorage.getItem("address")) || null,
  },
  reducers: {
    setCartCount(state, action) {
      state.cartCount = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    setAddress(state, action) {
      state.address = action.payload;
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    clearCart(state) {
      state.totalPrice = null;
      state.address = null;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      localStorage.setItem("address", JSON.stringify(state.address));
    },
  },
});

export const { setCartCount, setTotalPrice, setAddress, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
