import { useSelector } from "react-redux";
import { FaChevronLeft, FaEye, FaXmark, FaPenToSquare, FaCircleExclamation, FaTrash, FaChevronRight } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import { H2 } from "./Tags";
import { Link } from "react-router-dom";
import { usePath } from "./Hooks";

// export const Modal = ({ children = "Modal", id, onClick, className }) => {
//   const { dark } = useSelector((state) => state.basic);
//   return (
//     <div
//       onClick={onClick}
//       className={`z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center`}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`relative ${className} ${
//           dark ? "bg-slate-800" : "bg-white"
//         } p-5 mx-3 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow rounded-lg`}
//       >
//         <div className="mr-5 text-sm">ID: {id}</div>
//         {children}
//       </div>
//     </div>
//   );
// };
// Modal.propTypes;

export const ConfirmModalDel = ({ onSubmit, onClose }) => {
  return (
    <div className="relative flex gap-1">
      <form onSubmit={onSubmit}>
        <input type="checkbox" autoFocus className="absolute opacity-0 -z-10" />
        <button type="submit" className="border rounded p-1 bg-red-500 text-white px-2 hover:opacity-70">
          Delete
        </button>
      </form>
      <button onClick={onClose} className="border p-1 px-2 bg-slate-500 text-white rounded hover:opacity-70">
        Cancel
      </button>
    </div>
  );
};
ConfirmModalDel.propTypes;

export const CloseModalBtn = ({ className, onClose }) => {
  return (
    <button onClick={onClose} className={`${className} hover:text-red-500 absolute right-3 top-3`}>
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

export const Next = ({ className }) => (
  <div className={`${className}`}>
    <Link to={1} className="hover:text-cyan-600">
      <FaChevronRight />
    </Link>
  </div>
);
Next.propTypes;

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
  return (
    <div className={`${className} grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
      {children}
    </div>
  );
};
GridCard.propTypes;

export const Actions = ({ className, modalView, modalDelete, id }) => {
  return (
    <div className={`${className} flex w-full border border-blue-300 rounded-lg justify-around p-2`}>
      <button onClick={modalView} className="text-blue-500 hover:opacity-70">
        <FaEye />
      </button>
      <Link to={`detail/${id}`} className="text-yellow-500 hover:opacity-70">
        <FaCircleExclamation />
      </Link>
      <Link to={`update/${id}`} className="text-green-500 hover:opacity-70">
        <FaPenToSquare />
      </Link>
      <button onClick={modalDelete} className="text-red-500 hover:opacity-70">
        <FaTrash />
      </button>
    </div>
  );
};
Actions.propTypes;

export const Badge = ({ children = "Badge", onClick, className = "bg-gray-500 text-white" }) => (
  <span onClick={onClick} className={`${className} inline text-xs rounded-lg leading-none p-1`}>
    {children}
  </span>
);
Badge.propTypes;

export const Breadcrumb = ({ className }) => {
  const path = usePath();
  path[0] = "home";

  return (
    <div className={`${className} py-1 text-sm border-b overflow-x-scroll`}>
      <div className="flex items-center gap-1">
        <div className="text-xs flex gap-3">
          <Prev />
          <Next />
        </div>
        <div className="flex">
          {path?.map((item, i) => {
            let to;
            if (i === 0) to = "..";
            else if (item === "detail" || item === "update") to = "#";
            else to = "/" + location.pathname.split("/").splice(1, path.indexOf(item)).join("/");
            return (
              <Link to={to} key={i} className="min-w-max">
                <div className="inline px-1 hover:text-cyan-500 hover:underline">{item.split("-").join(" ")}</div>
                {i < path.length - 1 && "/"}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
Breadcrumb.propTypes;

export const PreviewImg = ({ onRemovePreview, preview }) => {
  return (
    <div className="relative w-48 h-48 my-2 border p-1 rounded overflow-hidden group">
      <button
        onClick={onRemovePreview}
        className="hidden group-hover:flex items-center justify-center bg-[rgba(0,0,0,.5)] p-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <FaTrash className="text-red-500 inline-block" />
      </button>
      <img src={preview} width={200} alt="image preview" className="object-contain object-center w-full h-full" />
    </div>
  );
};
PreviewImg.propTypes;

export const Modal = ({ children, onClose, itemId, modalId, closeBtn = false, confirmDel = false, submitDel, loadDel }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <div
      onClick={onClose}
      className={`${
        modalId === itemId ? "z-50 bg-black bg-opacity-40" : "-z-10"
      } fixed inset-0 flex items-center justify-center transition-all duration-150`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${dark ? "bg-slate-900" : "bg-white"} ${
          modalId === itemId ? "scale-100" : "scale-0"
        } origin-top w-full sm:w-3/4 md:w-1/2 xl:w-1/3 mx-3 border rounded-lg p-4 relative transition-all duration-150`}
      >
        {closeBtn && (
          <>
            <div className="mr-8">ID: {itemId}</div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl hover:text-red-500 transition-all duration-200"
            >
              <FaXmark />
            </button>
          </>
        )}
        {children}
        {confirmDel && (
          <form onSubmit={submitDel} className="relative">
            {modalId === itemId && <input type="checkbox" autoFocus className="absolute -z-50 opacity-0" />}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-red-500 text-white p-1 w-16 rounded hover:opacity-70 flex items-center justify-center"
              >
                {loadDel ? <PiSpinner className="animate-spin text-lg" /> : "Delete"}
              </button>
              <button type="button" onClick={onClose} className="bg-slate-500 rounded p-1 px-2 text-white hover:opacity-70">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
Modal.propTypes;

export const LoadingModal = ({ className }) => (
  <div className={`${className} z-50 fixed inset-0 flex justify-center items-center`}>
    <div className="bg-black bg-opacity-10 p-1 shadow-xl rounded-full text-white text-5xl">
      <PiSpinner className="animate-spin" />
    </div>
  </div>
);
LoadingModal.propTypes;
