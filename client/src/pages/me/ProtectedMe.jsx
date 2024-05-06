import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";
import { Breadcrumb } from "../../components/Components";
import { Section } from "../../components/Tags";

const ProtectedMe = () => {
  const { data } = useGetMeQuery();

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
