import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../app/api/categoryApiSlice";
import { setQueryObject, setQueryResult, setQueryTag } from "../../app/features/productSlice";
import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { useGetTagsQuery } from "../../app/api/tagApiSlice";
import { Badge } from "../../components/Components";

export const QuerySearch = () => {
  const [q, setQ] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setQueryObject({ q }));
    dispatch(setQueryResult());
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full sm:w-48 lg:w-72">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search product"
        className="focus:outline-none border p-2 rounded-l-lg w-full bg-inherit"
      />
      <button
        type="submit"
        className="w-14 flex items-center justify-center rounded-r-lg border hover:text-cyan-500 text-xl hover:opacity-70"
      >
        <FaSearchengin />
      </button>
    </form>
  );
};

export const QueryCategory = () => {
  const { dark } = useSelector((state) => state.basic);
  const { data } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setQueryObject({ category: e.target.value }));
    dispatch(setQueryResult());
  };

  return (
    <select
      onChange={handleChange}
      className={`${dark ? "bg-slate-800" : "bg-white"} rounded-lg border p-2 capitalize focus:outline-none`}
    >
      <option value="">Category</option>
      {data &&
        data?.map((item) => (
          <option key={item?._id} value={item?._id} className="capitalize">
            {item?.name}
          </option>
        ))}
    </select>
  );
};

export const QueryTag = () => {
  const { data } = useGetTagsQuery();
  const { queryTag } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    if (queryTag.includes(id)) {
      dispatch(setQueryTag(queryTag.filter((t) => t !== id)));
    } else dispatch(setQueryTag([...queryTag, id]));
    dispatch(setQueryResult());
  };

  return (
    <div className="py-2">
      <span>Tags : </span>
      <div className="inline-flex gap-1">
        {data?.map((item) => (
          <Badge
            key={item?._id}
            onClick={() => handleClick(item?._id)}
            className={`${
              queryTag.includes(item?._id) ? "bg-cyan-500" : "bg-gray-500"
            } text-white cursor-pointer hover:bg-cyan-500`}
          >
            {item?.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
