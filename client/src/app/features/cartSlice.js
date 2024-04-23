import { createSlice } from "@reduxjs/toolkit";

// const setCartData = (state) => {
//   state.cartItems = state.cartItems.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
//   state.weight = state.cartItems.reduce((acc, curr) => acc + curr.weight * curr.qty, 0);
//   state.count = state.cartItems.reduce((acc, curr) => acc + curr.qty, 0);
//   state.totalPrice = state.cartItems.reduce((acc, curr) => acc + curr.price.split(".").join("") * curr?.qty, 0);
// };

// const saveLocal = (state) => {
//   localStorage.setItem("posCartItems", JSON.stringify(state.cartItems));
//   localStorage.setItem("posCartCount", JSON.stringify(state.count));
//   localStorage.setItem("posTotalPrice", JSON.stringify(state.totalPrice));
//   localStorage.setItem("posWeight", JSON.stringify(state.weight));
// };

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    // cartItems: JSON.parse(localStorage.getItem("postCartItems")) || [],
    // count: JSON.parse(localStorage.getItem("postCartCount")) || 0,
    // totalPrice: JSON.parse(localStorage.getItem("postTotalPrice")) || 0,
    // weight: JSON.parse(localStorage.getItem("postWeight")) || 0,
  },
  reducers: {
    setInitialCart(state, action) {
      state.cartItems = action.payload;
    },
    setCartItems(state, action) {
      const match = state.cartItems.find((item) => item?.id === action.payload.id);
      if (state.cartItems.length === 0) state.cartItems = [...state.cartItems, action.payload];
      else {
        if (!match?.id) state.cartItems = [...state.cartItems, action.payload];
        else {
          let otherCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
          let currentCartItem = { ...match, qty: match.qty + 1 };
          state.cartItems = [...otherCartItems, currentCartItem];
        }
      }
      console.log(state.cartItems);
      // setCartData(state);
      // saveLocal(state);
    },
    setCartPlus(state, action) {
      const match = state.cartItems.find((item) => item?.id === action.payload.id);
      let otherCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      let currentCartItem = { ...match, qty: match.qty + 1 };
      console.log(currentCartItem);
      state.cartItems = [...otherCartItems, currentCartItem];
      // console.log(state.cartItems);
      // setCartData(state);
      // saveLocal(state);
    },
    setCartMinus(state, action) {
      const match = state.cartItems.find((item) => item?.id === action.payload.id);
      let otherCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      let currentCartItem = { ...match, qty: match.qty - 1 };
      state.cartItems = [...otherCartItems, currentCartItem];
      if (currentCartItem.qty === 0) state.cartItems = [...otherCartItems];
      // setCartData(state);
      // saveLocal(state);
    },
  },
});

export const { setInitialCart, setCartItems, setCartPlus, setCartMinus } = cartSlice.actions;

export default cartSlice.reducer;
