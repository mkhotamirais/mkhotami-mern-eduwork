import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { removeOpenAdminMenu, removeOpenUserMenu } from "./app/features/basicSlice";

const App = () => {
  const { dark, openAdminMenu, openUserMenu } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleMain = () => {
    if (openAdminMenu) dispatch(removeOpenAdminMenu());
    if (openUserMenu) dispatch(removeOpenUserMenu());
  };

  return (
    <div className={`${dark ? "bg-slate-800 text-white" : "text-gray-700"}`}>
      <Toaster />
      <Header />
      <main onClick={handleMain} className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
