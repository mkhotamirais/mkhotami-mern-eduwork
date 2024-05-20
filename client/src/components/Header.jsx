import { useDispatch, useSelector } from "react-redux";
import {
  removeOpenAuth,
  removeOpenAuthMenu,
  removeOpenNav,
  toggleDark,
  toggleOpenAuth,
  toggleOpenNav,
} from "../app/features/basicSlice";
import {
  FaAddressBook,
  FaBars,
  FaCartShopping,
  FaGithub,
  FaList,
  FaMoon,
  FaRightToBracket,
  FaSun,
  FaTags,
  FaUser,
  FaUserGear,
  FaUserPlus,
  FaUserShield,
  FaUsersGear,
  FaXmark,
} from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useGetMeQuery, useSignoutMutation } from "../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useGetCartsQuery } from "../app/api/cartApiSlice";
import { useEffect } from "react";
import { setCartCount } from "../app/features/cartSlice";

const menus = [
  { href: "", text: "home" },
  { href: "product", text: "product" },
];

const adminMenus = [
  { href: "/dash", text: "profile", icon: <FaUserGear /> },
  { href: "/dash/adm-product", text: "product", icon: <FaCartShopping /> },
  { href: "/dash/adm-user", text: "user", icon: <FaUsersGear /> },
  { href: "/dash/adm-category", text: "category", icon: <FaList /> },
  { href: "/dash/adm-tag", text: "tag", icon: <FaTags /> },
  { href: "/dash/adm-address", text: "address", icon: <FaAddressBook /> },
];

const userMenus = [
  { href: "/me", text: "profile", icon: <FaUserGear /> },
  { href: "/me/address", text: "address", icon: <FaAddressBook /> },
];

const guestMenus = [
  { href: "signin", text: "login", icon: <FaRightToBracket /> },
  { href: "signup", text: "register", icon: <FaUserPlus /> },
];

const Header = () => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <>
      <header className={`${dark ? "bg-slate-800" : "bg-white"} shadow z-40 h-16 sticky top-0 px-3 lg:px-12 border-b`}>
        <div className="flex gap-6 items-center h-full justify-between">
          <div className="flex gap-4 items-center text-xl">
            <NavBtn />
            <Logo />
          </div>
          <NavMain />
          <div className="flex gap-3 text-xl">
            <DarkMode />
            <SourceCode />
            <AuthBtn />
          </div>
        </div>
      </header>
      <NavCollapse />
    </>
  );
};
export default Header;

// auth
const AuthBtn = () => {
  const { data } = useGetMeQuery();
  let content;
  if (data) {
    if (data?.role === "admin") content = <AuthAdmin />;
    else if (data?.role === "user")
      content = (
        <>
          <AuthUserCart />
          <AuthUser />
        </>
      );
    else content = <AuthDefault />;
  } else content = <AuthDefault />;

  return content;
};

const AuthBubble = ({ icon, menus, logoutBtn = true }) => {
  const { openAuth, dark, openNav } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleOpenAuth());
    if (openNav) dispatch(removeOpenNav());
  };

  return (
    <div className="relative flex">
      <button onClick={handleClick}>{icon}</button>
      <div
        className={`${openAuth ? "scale-100" : "scale-0"} ${
          dark ? "bg-slate-900" : "bg-gray-50"
        } z-50 text-sm origin-top-right border shadow rounded-lg px-3 py-2 absolute top-full translate-y-2 right-0 transition-all duration-150`}
      >
        {menus.map((item, i) => (
          <NavLink
            onClick={() => dispatch(removeOpenAuth())}
            to={item.href}
            key={i}
            className={"flex gap-1 capitalize items-center rounded-b py-2 hover:text-cyan-500 border-b"}
          >
            {item?.icon} {item.text}
          </NavLink>
        ))}
        {logoutBtn && <AuthLogout />}
      </div>
    </div>
  );
};
AuthBubble.propTypes;

const AuthUser = () => <AuthBubble icon={<FaUser />} menus={userMenus} />;
const AuthAdmin = () => <AuthBubble icon={<FaUserShield />} menus={adminMenus} />;
const AuthDefault = () => <AuthBubble icon={<FaRightToBracket />} menus={guestMenus} logoutBtn={false} />;
const AuthLogout = () => {
  const [logout] = useSignoutMutation();
  const handleClick = () => {
    logout()
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.error);
      });
  };
  return (
    <a onClick={handleClick} href="/signin" className="bg-slate-500 block mt-2 text-white rounded px-3 p-1 hover:opacity-70">
      logout
    </a>
  );
};
export const AuthUserCart = () => {
  const { data } = useGetCartsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const result = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue?.qty;
      }, 0);
      dispatch(setCartCount(result));
    }
  }, [data, dispatch]);
  const { cartCount } = useSelector((state) => state.cart);
  return (
    <Link to="/me/cart" className="relative">
      <FaCartShopping />
      <div className="absolute -top-3 -right-1 bg-cyan-500 text-white text-xs w-4 h-4 rounded-md flex items-center justify-center">
        {cartCount}
      </div>
    </Link>
  );
};

// navbar
export const NavBtn = () => {
  const { openNav } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleOpenNav());
    dispatch(removeOpenAuthMenu());
  };
  return (
    <button onClick={handleClick} className={`block sm:hidden`}>
      <div className={`${openNav ? "rotate-180" : ""} transition-all duration-150`}>
        {openNav ? <FaXmark /> : <FaBars />}
      </div>
    </button>
  );
};

export const NavContent = ({ className }) => {
  const { openNav } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (openNav) dispatch(removeOpenNav());
  };
  return menus.map((item, i) => (
    <NavLink onClick={handleClick} key={i} to={item.href} className={`${className} capitalize px-2 hover:text-cyan-500`}>
      {item.text}
    </NavLink>
  ));
};
NavContent.propTypes;

export const NavCollapse = () => {
  const { openNav, dark } = useSelector((state) => state.basic);
  return (
    <div
      className={`block sm:hidden z-50 ${dark ? "bg-slate-800" : "bg-white"} ${
        openNav ? "scale-y-100" : "scale-y-0"
      } origin-top fixed w-full top-16 transition-all duration-150}`}
    >
      <div className="flex flex-col border-b shadow rounded-lg px-3 py-2 pb-4">
        <NavContent className={"border-b rounded py-2"} />
      </div>
    </div>
  );
};

export const NavMain = () => {
  return (
    <div className="hidden sm:flex w-full">
      <NavContent />
    </div>
  );
};

// logo, sourcode, dark mode
const Logo = () => {
  return (
    <a href="/" className={`flex flex-col gap-1`}>
      <div className="leading-none text-lg">Mkhotami</div>
      <div className="leading-none text-xs">Mern Eduwork</div>
    </a>
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

export const SourceCode = () => {
  return (
    <a href="">
      <FaGithub />
    </a>
  );
};
