import { useDispatch, useSelector } from "react-redux";
import { useGetCartsQuery } from "../../app/api/cartApiSlice";
import { useEffect } from "react";
import { setCartCount } from "../../app/features/cartSlice";

const CartCount = () => {
  const { data } = useGetCartsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const result = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue?.qty;
      }, 0);
      dispatch(setCartCount(result));
    }
  }, [data, dispatch]);

  const { cartCount } = useSelector((state) => state.cart);
  return (
    <div className="absolute -top-3 -right-1 bg-cyan-500 text-white text-xs w-4 h-4 rounded-md flex items-center justify-center">
      {cartCount}
    </div>
  );
};

export default CartCount;
