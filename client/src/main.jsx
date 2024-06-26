import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/auth/Signin.jsx";
import Signup from "./pages/auth/Signup.jsx";
import AuthRedirect from "./pages/auth/AuthRedirect.jsx";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin.jsx";
import AdmProduct from "./pages/admin/adm-product/AdmProduct.jsx";
import AdmCategory from "./pages/admin/adm-category/AdmCategory.jsx";
import AdmUser from "./pages/admin/adm-user/AdmUser.jsx";
import Product from "./pages/product/Product.jsx";
import AdmProductDetail from "./pages/admin/adm-product/AdmProductDetail.jsx";
import ProtectedMe from "./pages/me/ProtectedMe.jsx";
import AdmProductPost from "./pages/admin/adm-product/AdmProductPost.jsx";
import AdmTag from "./pages/admin/adm-tag/AdmTag.jsx";
import AdmUserPost from "./pages/admin/adm-user/AdmUserPost.jsx";
import AdmUserDetail from "./pages/admin/adm-user/AdmUserDetail.jsx";
import AdmUserUpdate from "./pages/admin/adm-user/AdmUserUpdate.jsx";
import AdmProductUpdate from "./pages/admin/adm-product/AdmProductUpdate.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import Cart from "./pages/me/Cart.jsx";
import Address from "./pages/both/Address.jsx";
import Profile from "./pages/both/Profile.jsx";
import AddressPost from "./pages/both/AddressPost.jsx";
import AddressDetail from "./pages/both/AddressDetail.jsx";
import AddressUpdate from "./pages/both/AddressUpdate.jsx";
import Order from "./pages/me/Order.jsx";
import { CheckoutAddress, CheckoutConfirm, Invoice } from "./pages/me/Checkout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="product">
        <Route index element={<Product />} />
        <Route path="detail/:id" element={<ProductDetail />} />
      </Route>
      <Route path="me" element={<ProtectedMe />}>
        <Route index element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="address">
          <Route index element={<Address />} />
          <Route path="post" element={<AddressPost />} />
        </Route>
        <Route path="order" element={<Order />} />
        <Route path="checkout-address" element={<CheckoutAddress />} />
        <Route path="checkout-confirm" element={<CheckoutConfirm />} />
        <Route path="checkout-invoice/:id" element={<Invoice />} />
      </Route>
      <Route element={<AuthRedirect />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="dash" element={<ProtectedAdmin />}>
        <Route index element={<Profile />} />
        <Route path="adm-product">
          <Route index element={<AdmProduct />} />
          <Route path="post" element={<AdmProductPost />} />
          <Route path="detail/:id" element={<AdmProductDetail />} />
          <Route path="update/:id" element={<AdmProductUpdate />} />
        </Route>
        <Route path="adm-category" element={<AdmCategory />} />
        <Route path="adm-tag" element={<AdmTag />} />
        <Route path="adm-user">
          <Route index element={<AdmUser />} />
          <Route path="post" element={<AdmUserPost />} />
          <Route path="detail/:id" element={<AdmUserDetail />} />
          <Route path="update/:id" element={<AdmUserUpdate />} />
        </Route>
        <Route path="adm-address">
          <Route index element={<Address />} />
          <Route path="post" element={<AddressPost />} />
          <Route path="detail/:id" element={<AddressDetail />} />
          <Route path="update/:id" element={<AddressUpdate />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
