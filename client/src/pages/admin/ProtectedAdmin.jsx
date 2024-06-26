import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";
import { Breadcrumb } from "../../components/Components";
import { Section } from "../../components/Tags";

const ProtectedAdmin = () => {
  const { data } = useGetMeQuery();

  if (data?.role === "admin") {
    return (
      <Section>
        <Breadcrumb />
        <div className="mt-2">
          <Outlet />
        </div>
      </Section>
    );
  } else if (data?.role === "" || data?.role === null) {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedAdmin;
