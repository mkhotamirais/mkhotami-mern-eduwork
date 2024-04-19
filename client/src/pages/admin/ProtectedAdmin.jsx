import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";

const ProtectedAdmin = () => {
  const { data } = useGetMeQuery();

  return data?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedAdmin;
