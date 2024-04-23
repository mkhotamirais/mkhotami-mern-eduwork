import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setInitialCart } from "../../app/features/cartSlice";
import { useGetCartsQuery, useUpdateCartsMutation } from "../../app/api/cartApiSlice";
import { useEffect } from "react";

const ProductAddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const { data } = useGetCartsQuery();
  const { cartItems } = useSelector((state) => state.cart);
  const [updateCart] = useUpdateCartsMutation();

  const handleAddToCart = () => {
    if (data?.length > 0) {
      dispatch(setInitialCart(data.map((item) => ({ id: item?.productId, qty: item?.qty }))));
    }
    dispatch(setCartItems({ id: item?._id, qty: 1 }));
  };

  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setInitialCart(data.map((item) => ({ id: item?.productId, qty: item?.qty }))));
    }
  }, [dispatch, data]);

  useEffect(() => {
    updateCart(cartItems);
  }, [updateCart, cartItems]);

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
