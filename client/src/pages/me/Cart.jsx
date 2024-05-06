import { useGetCartsQuery } from "../../app/api/cartApiSlice";
import { Err, Loading } from "../../components/Components";
import { useState } from "react";
import CartItems from "./CartItems";

const Cart = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetCartsQuery();
  const [changeQtyId, setChangeQtyId] = useState(null);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedCart =
      data &&
      data.map((item) => (
        <CartItems key={item?._id} item={item} changeQtyId={changeQtyId} setChangeQtyId={setChangeQtyId} />
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
