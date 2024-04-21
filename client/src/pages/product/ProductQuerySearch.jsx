import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setQueryResult, setQueryObject } from "../../app/features/productSlice";

const ProductQuerySearch = () => {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setQueryObject({ q }));
    dispatch(setQueryResult());
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full sm:w-72 lg:w-[28rem] mx-auto">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search product name"
        className="focus:outline-cyan-400 p-2 border rounded-l w-full bg-inherit"
      />
      <button
        type="submit"
        className="w-12 flex items-center justify-center rounded-r bg-cyan-600 text-white text-xl hover:opacity-70"
      >
        <FaSearchengin />
      </button>
    </form>
  );
};

export default ProductQuerySearch;
