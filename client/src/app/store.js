import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./features/basicSlice";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    basic: basicReducer,
    auth: authReducer,
    product: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
