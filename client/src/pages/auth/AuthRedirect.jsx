import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUserData } from "../../app/features/authSlice";

const AuthRedirect = () => {
  const { token, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserData(token));
  }, [dispatch, token]);

  return userData?.username ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
