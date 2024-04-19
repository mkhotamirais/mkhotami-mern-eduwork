import { Logo } from "./Components";
import { BtnAuth, DarkMode, SourceCode } from "./NavRight";

const Header = () => {
  return (
    <header className="z-50 h-16 sticky top-0 px-3 lg:px-16 border-b">
      <div className="flex items-center h-full justify-between">
        <Logo />
        <div>nav</div>
        <div className="flex gap-3 text-xl">
          <DarkMode />
          <SourceCode />
          <BtnAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
