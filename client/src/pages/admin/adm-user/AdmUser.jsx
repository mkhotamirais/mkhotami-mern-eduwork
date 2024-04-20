// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../app/api/userApiSlice";
import { Err, Loading } from "../../../components/Components";
import { H2 } from "../../../components/Tags";
import { FaPlus } from "react-icons/fa6";
import AdmUserTable from "./AdmUserTable";

const AdmUser = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetUsersQuery();
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedUser = data.map((item, i) => <AdmUserTable key={item?._id} item={item} i={i} />);
    content = (
      <table className="w-full border-separate border-spacing-1 *:text-left">
        <thead>
          <tr className="*:border *:rounded *:p-1 *:px-2 *:py-2">
            <th>No</th>
            <th>Username</th>
            <th className="hidden sm:table-cell">Email</th>
            <th className="hidden md:table-cell">Role</th>
            <th className="hidden lg:table-cell">Created</th>
            <th className="hidden xl:table-cell">Updated</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{renderedUser}</tbody>
      </table>
    );
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <H2>User List</H2>
        <Link to="post" className="bg-cyan-500 p-2 text-sm rounded-full text-white hover:opacity-70">
          <FaPlus />
        </Link>
      </div>
      <div className="mt-2">{content}</div>
    </>
  );
};

export default AdmUser;
