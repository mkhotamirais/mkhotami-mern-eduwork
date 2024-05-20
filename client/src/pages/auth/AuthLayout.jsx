import { Link } from "react-router-dom";
import { Title } from "../../components/Components";
import { useSelector } from "react-redux";
import { PiSpinner } from "react-icons/pi";

const AuthLayout = ({ children, onSubmit, title, isLoading }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <div className={`z-50 ${dark ? "" : ""} mt-5 flex items-center justify-center`}>
      <div className={`${dark ? "bg-slate-800" : "bg-white"} border rounded-lg mx-3 p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3`}>
        <Title>{title}</Title>
        <form onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="bg-cyan-600 hover:opacity-70 rounded p-2 text-white capitalize w-full flex justify-center"
          >
            {isLoading ? (
              <PiSpinner className="animate-spin my-1" />
            ) : title === "login" ? (
              "login"
            ) : title === "register" ? (
              "register"
            ) : null}
          </button>
        </form>
        <div className="mt-2">
          {title === "login" && (
            <p>
              Do not have an account?{" "}
              <Link className="text-cyan-600 hover:underline" to="/signup">
                signup
              </Link>
            </p>
          )}
          {title === "register" && (
            <p>
              Already have an account?{" "}
              <Link className="text-cyan-600 hover:underline" to="/signin">
                signin
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
AuthLayout.propTypes;

export default AuthLayout;
