import { FaCartPlus } from "react-icons/fa6";
import { useUpdateCartsMutation } from "../../app/api/cartApiSlice";

const ProductAddToCart = ({ item }) => {
  const [updateCart] = useUpdateCartsMutation();
  const handleAddToCart = () => {
    updateCart({ productId: item?._id, qty: 1 });
  };

  return (
    <div>
      <button onClick={handleAddToCart} className="border rounded-full p-2 bg-cyan-600 text-white hover:opacity-70">
        <FaCartPlus />
      </button>
    </div>
  );
};
ProductAddToCart.propTypes;

export default ProductAddToCart;
