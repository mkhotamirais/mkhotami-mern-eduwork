import {
  FaGithub,
  FaSun,
  FaMoon,
  FaUser,
  FaUserShield,
  FaRightToBracket,
  FaRightFromBracket,
  FaTags,
  FaCartShopping,
  FaUsersGear,
  FaList,
  FaUserGear,
  FaAddressBook,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  removeOpenAdminMenu,
  removeOpenUserMenu,
  toggleDark,
  toggleOpenAdminMenu,
  toggleOpenUserMenu,
} from "../app/features/basicSlice";
import { Link } from "react-router-dom";
import { useGetMeQuery, useSignoutMutation } from "../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useActivepath } from "./Hooks";
import CartCount from "../pages/me/CartCount";

const adminMenu = [
  { to: "/dash", text: "adm-profile", icon: <FaUserGear /> },
  { to: "/dash/adm-product", text: "adm-product", icon: <FaCartShopping /> },
  { to: "/dash/adm-user", text: "adm-user", icon: <FaUsersGear /> },
  { to: "/dash/adm-category", text: "adm-category", icon: <FaList /> },
  { to: "/dash/adm-tag", text: "adm-tag", icon: <FaTags /> },
  { to: "/dash/adm-address", text: "adm-address", icon: <FaAddressBook /> },
];

const userMenu = [
  { to: "/me", text: "adm-profile", icon: <FaUserGear /> },
  { to: "/me/address", text: "adm-address", icon: <FaAddressBook /> },
];

export const SourceCode = () => {
  return (
    <div>
      <FaGithub />
    </div>
  );
};

export const DarkMode = () => {
  const { dark } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleDark())} className={`w-5 h-5 overflow-hidden`}>
      <FaMoon className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
      <FaSun className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
    </button>
  );
};

export const BtnCart = () => {
  return (
    <Link to="/me/cart" className="relative">
      <CartCount />
      <FaCartShopping />
    </Link>
  );
};

export const BtnAuth = () => {
  const { openAdminMenu, openUserMenu } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();

  const btnAuthAdmin = (
    <div className="relative flex">
      <button onClick={() => dispatch(toggleOpenAdminMenu())} type="button">
        <FaUserShield />
      </button>
      {openAdminMenu && <AuthAdmin />}
    </div>
  );

  const btnAuthUser = (
    <div className="relative flex">
      <button onClick={() => dispatch(toggleOpenUserMenu())} type="button">
        <FaUser />
      </button>
      {openUserMenu && <AuthUser />}
    </div>
  );

  const btnSignin = (
    <Link to="signin">
      <FaRightToBracket />
    </Link>
  );

  let content;
  if (data?.role) {
    if (data?.role == "admin") content = btnAuthAdmin;
    else if (data?.role == "user") content = btnAuthUser;
  } else content = btnSignin;
  return content;
};

export const AuthBtnBox = ({ children }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <div
      className={`${
        dark ? "bg-slate-900" : "bg-slate-50"
      } absolute right-0 border rounded-lg p-3 top-full translate-y-3 z-50 text-sm`}
    >
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
AuthBtnBox.propTypes;

export const AuthBtnMenu = ({ item }) => {
  const [active] = useActivepath();

  const dispatch = useDispatch();
  const { openAdminMenu, openUserMenu } = useSelector((state) => state.basic);

  const handleClick = () => {
    if (openAdminMenu) dispatch(removeOpenAdminMenu());
    if (openUserMenu) dispatch(removeOpenUserMenu());
  };

  return (
    <Link
      onClick={handleClick}
      to={`${item.to}`}
      className={`${
        active === item.text ? "text-cyan-500" : ""
      } hover:text-cyan-600 text-left border-b rounded p-2 flex gap-2 items-center`}
    >
      {item.icon} {item.text.split("-")[1]}
    </Link>
  );
};
AuthBtnMenu.propTypes;

export const AuthUser = () => {
  return (
    <AuthBtnBox>
      {userMenu.map((item, i) => (
        <AuthBtnMenu key={i} item={item} />
      ))}
      <BtnSingout />
    </AuthBtnBox>
  );
};

export const AuthAdmin = () => {
  return (
    <AuthBtnBox>
      {adminMenu.map((item, i) => (
        <AuthBtnMenu key={i} item={item} />
      ))}
      <BtnSingout />
    </AuthBtnBox>
  );
};
AuthAdmin.propTypes;

export const BtnSingout = () => {
  const [logout] = useSignoutMutation();
  const dispatch = useDispatch();

  const handleClick = () => {
    logout()
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(removeOpenAdminMenu());
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error(err.data.message);
        dispatch(removeOpenAdminMenu());
      });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-cyan-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:opacity-70"
    >
      <FaRightFromBracket /> <span>Logout</span>
    </button>
  );
};
