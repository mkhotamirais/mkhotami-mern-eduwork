import { FaMinus, FaPlus } from "react-icons/fa6";
import { useGetCartsQuery, useUpdateCartsMutation } from "../../app/api/cartApiSlice";
import { Err, Loading } from "../../components/Components";
import { Figure } from "../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { setCartPlus, setInitialCart } from "../../app/features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetCartsQuery();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [updateCart] = useUpdateCartsMutation();

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     dispatch(setInitialCart(data.map((item) => ({ id: item?.productId, qty: item?.qty }))));
  //   }
  // }, [dispatch, data]);

  // useEffect(() => {
  //   updateCart(cartItems);
  // }, [cartItems]);

  const plusCart = (id) => {
    if (data?.length > 0) {
      dispatch(setInitialCart(data.map((item) => ({ id: item?._id, qty: item?.qty }))));
    }
    dispatch(setCartPlus({ id }));
  };

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedCart =
      data &&
      data.map((item) => (
        <tr key={item?._id} className="*:border *:p-2 *:text-left *:rounded">
          <td>
            <Figure src={item?.imageUrl} alt={item?.imageName || "no image"} height="h-12" />
          </td>
          <td>{item?.name}</td>
          <td>
            <div className="flex gap-2 items-center">
              <button className="border rounded-full p-1 text-[0.7rem]">
                <FaMinus />
              </button>
              <div>{item?.qty}</div>
              <button onClick={() => plusCart(item?._id)} className="border rounded-full p-1 text-[0.7rem]">
                <FaPlus />
              </button>
            </div>
          </td>
          <td>Rp{item?.price?.toLocaleString("id-ID")}</td>
        </tr>
      ));
    content = (
      <table className="border-separate w-full border-spacing-1 text-sm">
        <thead>
          <tr className="*:border *:p-2 *:text-left *:rounded *:capitalize">
            <th>image</th>
            <th>name</th>
            <th>qty</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>{renderedCart}</tbody>
      </table>
    );
  }

  return <div>{content}</div>;
};

export default Cart;
