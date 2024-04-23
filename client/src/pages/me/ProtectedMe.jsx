import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";
import { Breadcrumb } from "../../components/Components";
import { Section } from "../../components/Tags";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartsQuery, useUpdateCartsMutation } from "../../app/api/cartApiSlice";
import { setInitialCart } from "../../app/features/cartSlice";

const ProtectedMe = () => {
  const { data } = useGetMeQuery();
  const dispatch = useDispatch();
  const { data: dataCart } = useGetCartsQuery();
  const [updateCart] = useUpdateCartsMutation();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (dataCart?.length > 0) {
      dispatch(setInitialCart(dataCart.map((item) => ({ id: item?.productId, qty: item?.qty }))));
    }
  }, [dispatch, dataCart]);

  useEffect(() => {
    updateCart(cartItems);
  }, [updateCart, cartItems]);

  if (data?.role === "user") {
    return (
      <Section>
        <Breadcrumb />
        <Outlet />
      </Section>
    );
  } else if (data?.role === "" || data?.role === null) {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedMe;
