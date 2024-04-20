import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeOpenAuthMenu, removeOpenNav, toggleOpenNav } from "../app/features/basicSlice";
import { Link } from "react-router-dom";
import { useActivepath } from "./Hooks";
// import { useEffect } from "react";

const menus = [
  { to: "", text: "home" },
  { to: "/product", text: "product" },
];

export const NavBtn = () => {
  const { openNav } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleOpenNav());
    dispatch(removeOpenAuthMenu());
  };

  return (
    <button onClick={handleClick} className={`block sm:hidden border rounded p-1`}>
      <div className={`${openNav ? "rotate-180" : ""} transition-all duration-150`}>
        {openNav ? <FaXmark /> : <FaBars />}
      </div>
    </button>
  );
};

export const NavContent = ({ className }) => {
  const [active] = useActivepath();
  const { openAdminMenu, openUserMenu } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (openAdminMenu || openUserMenu) dispatch(removeOpenAuthMenu());
    dispatch(removeOpenNav());
  };

  return (
    <>
      {menus.map((item, i) => (
        <Link
          onClick={handleClick}
          key={i}
          to={item.to}
          className={`${className} ${active == item.text ? "text-cyan-500" : ""} capitalize hover:text-cyan-500`}
        >
          {item.text}
        </Link>
      ))}
    </>
  );
};
NavContent.propTypes;

export const NavCollapse = () => {
  const { openNav, dark } = useSelector((state) => state.basic);
  return (
    <div
      className={`block sm:hidden sticky top-16 ${openNav ? "h-32" : "h-0"} overflow-hidden transition-all duration-150 ${
        dark ? "bg-slate-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col border-b shadow rounded-lg px-3 py-2 pb-4">
        <NavContent className={"border-b rounded py-2"} />
      </div>
    </div>
  );
};

export const NavMain = () => {
  return (
    <div className="hidden sm:flex w-full gap-3 md:gap-5 ml-3 md:ml-8">
      <NavContent />
    </div>
  );
};
