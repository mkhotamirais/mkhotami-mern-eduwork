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
import { removeToken, setUserData } from "../app/features/authSlice";
import { useEffect } from "react";

const adminMenu = [
  { to: "adm-product", text: "product", icon: <FaCartShopping /> },
  { to: "adm-user", text: "user", icon: <FaUsersGear /> },
  { to: "adm-category", text: "category", icon: <FaList /> },
  { to: "adm-tags", text: "tags", icon: <FaTags /> },
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

export const BtnAuth = () => {
  const { openAdminMenu, openUserMenu } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();

  // useEffect(() => {
  //   dispatch(setUserData(token));
  // }, [dispatch, token]);

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
  const dispatch = useDispatch();
  const { openAdminMenu, openUserMenu } = useSelector((state) => state.basic);

  const handleClick = () => {
    if (openAdminMenu) dispatch(removeOpenAdminMenu());
    if (openUserMenu) dispatch(removeOpenUserMenu());
  };

  return (
    <Link
      onClick={handleClick}
      to={item.to}
      className="hover:text-cyan-600 text-left border-b rounded p-2 flex gap-2 items-center"
    >
      {item.icon} {item.text}
    </Link>
  );
};
AuthBtnMenu.propTypes;

export const AuthUser = () => {
  return <div>auth user</div>;
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
        dispatch(removeToken());
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
