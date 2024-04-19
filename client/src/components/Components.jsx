import { useSelector } from "react-redux";
import { FaChevronLeft, FaXmark } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import { H2 } from "./Tags";
import { Link } from "react-router-dom";

export const Logo = ({ className }) => {
  return (
    <a href="/" className={`${className} flex flex-col gap-1`}>
      <div className="leading-none text-xl font-medium">Mkhotami</div>
      <div className="leading-none text-sm">Mern Eduwork</div>
    </a>
  );
};
Logo.propTypes;

export const Modal = ({ children = "Modal", id, onClick, className }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <div
      onClick={onClick}
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative ${className} ${
          dark ? "bg-slate-800" : "bg-white"
        } p-5 mx-3 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow rounded-lg`}
      >
        <div className="mr-5 text-sm">ID: {id}</div>
        {children}
      </div>
    </div>
  );
};
Modal.propTypes;

export const CloseModalBtn = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} hover:text-red-500 absolute right-3 top-3`}>
      <FaXmark />
    </button>
  );
};
CloseModalBtn.propTypes;

export const Title = ({ children = "Title", className }) => (
  <div className={`${className} w-fit pt-1 pb-2 flex items-center gap-2`}>
    <Prev />
    <H2>{children}</H2>
  </div>
);
Title.propTypes;

export const Prev = ({ className }) => (
  <div className={`${className}`}>
    <Link to={-1} className="hover:text-cyan-600">
      <FaChevronLeft />
    </Link>
  </div>
);
Prev.propTypes;

export const Loading = ({ className }) => (
  <div className={`${className} flex justify-center mt-10 text-4xl`}>
    <PiSpinner className="animate-spin" />
  </div>
);
Loading.propTypes;

export const Err = ({ children = "Err", className }) => (
  <div className={`${className} flex justify-center mt-10`}>{children}</div>
);
Err.propTypes;

export const GridCard = ({ children, className }) => {
  return <div className={`${className} grid gap-1 sm:gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>{children}</div>;
};
GridCard.propTypes;
