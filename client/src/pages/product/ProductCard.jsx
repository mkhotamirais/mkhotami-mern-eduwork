import { Link } from "react-router-dom";
import { FaCircleExclamation, FaEye } from "react-icons/fa6";
import { useState } from "react";
import ProductModalView from "./ProductModalView";
import { Badge } from "../../components/Components";
import ProductAddToCart from "./ProductAddToCart";

const ProductCard = ({ item }) => {
  const [idModalView, setIdModalView] = useState(null);
  const onClose = () => {
    if (idModalView) setIdModalView(null);
  };

  return (
    <div className="flex flex-col border justify-between rounded p-2 gap-1 relative">
      <Badge className={"z-30 absolute right-1 top-1 bg-green-500 text-white bg-opacity-70"}>{item?.category?.name}</Badge>
      <div className="z-30 absolute left-1 top-1 flex flex-col items-start gap-1">
        {item?.tags.map((tag) => (
          <Badge key={tag?._id} className={"bg-opacity-70 bg-gray-500 text-white"}>
            {tag?.name}
          </Badge>
        ))}
      </div>
      <div>
        <Link to={`detail/${item?._id}`}>
          <figure className={`h-32 rounded overflow-hidden border`}>
            <img
              src={item?.imageUrl}
              alt={item?.imageName || "no image"}
              className="h-full w-full object-cover object-center hover:object-contain hover:scale-95 transition-all duration-150"
            />
          </figure>
        </Link>
        <div className="capitalize font-medium text-base sm:text-lg">{item?.name}</div>
        <div className="text-lg sm:text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
      </div>
      <div className="flex justify-between items-center p-1">
        <div className="flex gap-4">
          <button onClick={() => setIdModalView(item?._id)}>
            <FaEye className="text-green-500" />
          </button>
          <Link to={`detail/${item?._id}`}>
            <FaCircleExclamation className="text-yellow-500" />
          </Link>
        </div>
        <ProductAddToCart item={item} />
        <ProductModalView onClose={onClose} item={item} modalId={idModalView} />
      </div>
    </div>
  );
};
ProductCard.propTypes;

export default ProductCard;
