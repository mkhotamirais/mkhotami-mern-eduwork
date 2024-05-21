import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAddressByIdQuery, useGetAddressesQuery } from "../../app/api/addressApiSlice";
import { Err, Loading } from "../../components/Components";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setAddress } from "../../app/features/cartSlice";
import { useGetOrderByIdQuery, usePostOrderMutation } from "../../app/api/orderApiSlice";
import { useGetCartsQuery } from "../../app/api/cartApiSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const CheckoutAddress = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAddressesQuery();
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.cart);
  const { data: cart } = useGetCartsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length === 0) {
      navigate("/product");
    }
  }, [cart, navigate]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedData =
        data &&
        data.map((item) => (
          <div key={item?._id} className="border rounded p-1">
            <input
              type="radio"
              value={item?._id}
              id="alamat"
              name={"alamat"}
              checked={item?._id === address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />{" "}
            <label htmlFor="alamat">
              {item?.name} {item?.detail}
              Kel. {item?.kelurahan?.split("-")[1]} Kec. {item?.kecamatan?.split("-")[1]} Kab.{" "}
              {item?.kabupaten?.split("-")[1]} Prov. {item?.provinsi?.split("-")[1]}
            </label>
          </div>
        ));
      content = (
        <div className="flex flex-col rounded gap-2 my-2">
          <div>Choose Address</div>
          {renderedData}
          <div className="flex justify-between">
            <Link to={-1} className="capitalize hover:underline">
              &laquo; prev
            </Link>
            {address && (
              <Link to={"/me/checkout-confirm"} className="capitalize hover:underline">
                next &raquo;
              </Link>
            )}
          </div>
        </div>
      );
    } else {
      content = (
        <div className="text-center mt-3">
          no address,{" "}
          <Link to="/me/address/post" className="text-cyan-500 hover:underline">
            Add One
          </Link>
        </div>
      );
    }
  }

  return content;
};

export const CheckoutConfirm = () => {
  const { totalPrice, address } = useSelector((state) => state.cart);
  const { data: item } = useGetAddressByIdQuery(address);
  const { data: cart } = useGetCartsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart && cart.length === 0) {
      navigate("/product");
    }
  }, [cart, navigate]);

  const ongkir = 20000;
  const discount = 20000;
  const [postOrder] = usePostOrderMutation();
  const handleOrder = () => {
    postOrder({ totalPrice, address, cart: cart?.map((item) => item?._id) })
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success(res?.message);
        dispatch(clearCart());
        navigate(`/me/checkout-invoice/${res?.data?._id}`);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <div>
      <div className="border rounded p-2 my-2 flex flex-col gap-2">
        <div>
          <b>Alamat</b> : {item?.name} {item?.detail}, Kel. {item?.kelurahan?.split("-")[1]} Kec.{" "}
          {item?.kecamatan?.split("-")[1]}, Kab. {item?.kabupaten?.split("-")[1]}, Prov. {item?.provinsi?.split("-")[1]}
        </div>
        <div>
          <b>Subtotal</b> : Rp{totalPrice?.toLocaleString("id-ID")}
        </div>
        <div>
          <b>Ongkir</b> : Rp{ongkir?.toLocaleString("id-ID")}
        </div>
        <div>
          <b>Discount</b> : Rp{discount?.toLocaleString("id-ID")}
        </div>
        <div className="mt-4">
          <b>Total Price</b> : Rp{(totalPrice + ongkir - discount).toLocaleString("id-ID")}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link to={-1} className="hover:underline">
          &laquo; Prev
        </Link>
        <button onClick={handleOrder} className="rounded p-2 px-3 bg-cyan-500 text-white hover:opacity-70">
          Bayar
        </button>
      </div>
    </div>
  );
};

export const Invoice = () => {
  const { id } = useParams();
  const { data: order, isLoading, isSuccess, isError, error } = useGetOrderByIdQuery(id);
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (order) {
      content = (
        <div className="border rounded p-2 flex flex-col gap-2">
          <div>
            <b>Status</b> : Waiting_payment
          </div>
          <div>
            <b>Id</b> : {order?._id}
          </div>

          <div>
            <b>Price</b> : Rp{order?.totalPrice?.toLocaleString("id-ID")}
          </div>
          <div>
            <b>Billed To</b> : {order?.address?.name},{order?.address?.detail}, Kel, {order?.address?.kelurahan}, Kec.{" "}
            {order?.address?.kecamatan}, Kab. {order?.address?.kabupaten}, Prov. {order?.address?.provinsi},
          </div>
          <div>
            <b>Payment to</b> mkhotami
          </div>
        </div>
      );
    } else content = <div className="text-center italic mt-3">no content</div>;
  }
  return (
    <div>
      {content}
      <Link to="/product" className="text-cyan-500 my-2 hover:underline">
        Back to product
      </Link>
    </div>
  );
};
