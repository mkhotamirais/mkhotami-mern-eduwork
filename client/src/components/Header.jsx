import { useSelector } from "react-redux";
import { Logo } from "./Components";
import { BtnAuth, BtnCart, DarkMode, SourceCode } from "./NavRight";
import { NavBtn, NavCollapse, NavMain } from "./NavMenu";

const Header = () => {
  const { dark } = useSelector((state) => state.basic);

  return (
    <>
      <header className={`${dark ? "bg-slate-800" : "bg-white"} shadow z-50 h-16 sticky top-0 px-3 lg:px-16 border-b`}>
        <div className="flex gap-2 items-center h-full justify-between">
          <div className="flex gap-4 items-center text-xl">
            <NavBtn />
            <Logo />
          </div>
          <NavMain />
          <div className="flex gap-3 text-xl">
            <DarkMode />
            <SourceCode />
            <BtnCart />
            <BtnAuth />
          </div>
        </div>
      </header>
      <NavCollapse />
    </>
  );
};

export default Header;
