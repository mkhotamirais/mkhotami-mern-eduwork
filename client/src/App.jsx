import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { removeOpenAuth, removeOpenNav } from "./app/features/basicSlice";
import { useEffect } from "react";

const App = () => {
  const { dark, openNav, openAuth } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleMain = () => {
    if (openNav) dispatch(removeOpenNav());
    if (openAuth) dispatch(removeOpenAuth());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (openNav) dispatch(removeOpenNav());
      if (openAuth) dispatch(removeOpenAuth());
    });
  }, [dispatch, openNav, openAuth]);

  return (
    <div className={`${dark ? "bg-slate-800 text-white" : "text-gray-700"}`}>
      <Toaster />
      <Header />
      <main onClick={handleMain} className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default App;
