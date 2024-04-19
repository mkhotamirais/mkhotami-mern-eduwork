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
import AdmTags from "./pages/admin/adm-tags/AdmTags.jsx";
import AdmUser from "./pages/admin/adm-user/AdmUser.jsx";
import Product from "./pages/product/Product.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="product" element={<Product />} />
      <Route element={<AuthRedirect />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedAdmin />}>
        <Route path="adm-product" element={<AdmProduct />} />
        <Route path="adm-category" element={<AdmCategory />} />
        <Route path="adm-tags" element={<AdmTags />} />
        <Route path="adm-user" element={<AdmUser />} />
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
