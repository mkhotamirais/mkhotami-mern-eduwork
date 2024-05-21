import { useGetCartsQuery } from "../../app/api/cartApiSlice";
import { Err, Loading } from "../../components/Components";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice } from "../../app/features/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetCartsQuery();
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [changeQtyId, setChangeQtyId] = useState(null);
  useEffect(() => {
    if (data) {
      let hasil = data.reduce((acc, cur) => acc + cur?.productPrice, 0);
      dispatch(setTotalPrice(hasil));
    }
  }, [data, dispatch]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedCart =
        data &&
        data.map((item) => (
          <CartItems key={item?._id} item={item} changeQtyId={changeQtyId} setChangeQtyId={setChangeQtyId} />
        ));
      content = (
        <>
          <table className="border-separate w-full text-sm">
            <thead>
              <tr className="*:border *:p-2 *:text-left *:rounded *:capitalize">
                <th className="hidden sm:table-cell">image</th>
                <th>name</th>
                <th>qty</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>{renderedCart}</tbody>
          </table>
          <div className="text-right mt-3">
            <Link to="/me/checkout-address" className="rounded p-2 px-3 bg-cyan-500 text-white my-2 hover:opacity-70">
              Checkout
            </Link>
          </div>
        </>
      );
    } else content = <div className="text-center mt-3 italic">no content</div>;
  }

  return (
    <div>
      <div>Cart List</div>
      <div className="text-right text-2xl">Total price : Rp{totalPrice?.toLocaleString("id-ID")}</div>
      {content}
    </div>
  );
};

export default Cart;
