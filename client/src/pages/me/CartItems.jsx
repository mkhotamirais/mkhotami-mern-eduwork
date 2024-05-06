import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { Figure } from "../../components/Tags";
import { useUpdateCartsMutation } from "../../app/api/cartApiSlice";
import { useState } from "react";

const CartItems = ({ item, changeQtyId, setChangeQtyId }) => {
  const [updateCart] = useUpdateCartsMutation();
  const [newQty, setNewQty] = useState(item?.qty);

  const handlePlusCart = () => {
    if (changeQtyId) setChangeQtyId(null);
    updateCart({ productId: item?.productId, cartId: item?._id, qty: 1, type: "plus" });
    setNewQty(item?.qty + 1);
  };

  const handleMinusCart = () => {
    if (changeQtyId) setChangeQtyId(null);
    updateCart({ productId: item?.productId, cartId: item?._id, qty: -1, type: "minus" });
    setNewQty(item?.qty - 1);
  };

  const handleChangeQty = (e) => {
    e.preventDefault();
    if (newQty && newQty !== 0) {
      updateCart({ productId: item?.productId, cartId: item?._id, qty: newQty });
    }
    setChangeQtyId(null);
  };

  return (
    <tr key={item?._id} className="*:border *:p-2 *:text-left *:rounded">
      <td>
        <Figure src={item?.productId?.imageUrl} alt={item?.productId?.imageName || "no image"} height="h-12" />
      </td>
      <td>{item?.productId?.name}</td>
      <td>
        <div className="flex gap-2 items-center">
          <>
            {item?.qty === 1 ? (
              <button onClick={handleMinusCart}>
                <FaTrashCan />
              </button>
            ) : (
              <button onClick={handleMinusCart} className="border rounded-full p-1 text-[0.7rem]">
                <FaMinus />
              </button>
            )}
          </>
          {item?._id === changeQtyId ? (
            <form onSubmit={handleChangeQty}>
              <input
                type="number"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="border-b w-10 appearance-none"
                autoFocus
              />
              <button type="submit"></button>
            </form>
          ) : (
            <div onClick={() => setChangeQtyId(item?._id)}>{item?.qty}</div>
          )}
          <button onClick={handlePlusCart} className="border rounded-full p-1 text-[0.7rem]">
            <FaPlus />
          </button>
        </div>
      </td>
      <td>Rp{item?.productPrice?.toLocaleString("id-ID")}</td>
    </tr>
  );
};
CartItems.propTypes;

export default CartItems;
