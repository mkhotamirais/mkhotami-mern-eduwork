import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";

const AuthRedirect = () => {
  const { data } = useGetMeQuery();

  if (!data?.role) {
    return <Outlet />;
  } else if (data?.role) {
    return <Navigate to="/" replace />;
  }
};

export default AuthRedirect;
