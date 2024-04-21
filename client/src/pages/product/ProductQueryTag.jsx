import { useGetTagsQuery } from "../../app/api/tagApiSlice";
import { Badge } from "../../components/Components";
import { useDispatch, useSelector } from "react-redux";
import { setQueryResult, setQueryTag } from "../../app/features/productSlice";
const ProductQueryTag = () => {
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

export default ProductQueryTag;
