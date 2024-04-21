import { Link } from "react-router-dom";
import { Figure } from "../../components/Tags";
import { FaCartPlus, FaCircleExclamation, FaEye } from "react-icons/fa6";
import { useState } from "react";
import ProductModalView from "./ProductModalView";
import { Badge } from "../../components/Components";

const ProductCard = ({ item }) => {
  const [openModelView, setOpenModelView] = useState(null);
  const onClose = () => {
    if (openModelView) setOpenModelView(null);
  };
  return (
    <div className="flex flex-col border rounded p-2 gap-2 relative">
      <Badge className={"absolute right-1 top-1 bg-green-500 text-white bg-opacity-70 rounded-none"}>
        {item?.category?.name}
      </Badge>
      <div className="absolute left-1 top-1 flex flex-col items-start gap-1">
        {item?.tags.map((tag) => (
          <Badge key={tag?._id} className={"bg-opacity-70 bg-gray-500 text-white"}>
            {tag?.name}
          </Badge>
        ))}
      </div>
      <Figure src={item?.imageUrl} alt={item?.imageName || "no image"} />
      <div className="capitalize font-medium text-base sm:text-lg">{item?.name}</div>
      <div className="text-lg sm:text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
      <div className="flex justify-between items-center p-1">
        <div className="flex gap-4">
          <button onClick={() => setOpenModelView(item?._id)}>
            <FaEye className="text-green-500" />
          </button>
          <Link to={`detail/${item?._id}`}>
            <FaCircleExclamation className="text-yellow-500" />
          </Link>
        </div>
        <button className="border rounded-full p-2 bg-cyan-600 text-white hover:opacity-70">
          <FaCartPlus />
        </button>
        {openModelView === item?._id && <ProductModalView onClose={onClose} item={item} />}
      </div>
    </div>
  );
};
ProductCard.propTypes;

export default ProductCard;
