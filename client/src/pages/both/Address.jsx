import { useGetAddressesQuery } from "../../app/api/addressApiSlice";
import { Err, Loading } from "../../components/Components";
import { H2 } from "../../components/Tags";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import AddressItems from "./AddressItems";

const Address = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetAddressesQuery();

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedAddress = data && data.map((item, i) => <AddressItems key={item?._id} item={item} i={i} />);
      content = (
        <table className="w-full border-separate">
          <thead>
            <tr className="*:border *:rounded *:p-2">
              <th>No</th>
              <th>Name</th>
              <th>User</th>
              <th className="hidden sm:table-cell">Detail</th>
              <th className="hidden md:table-cell">Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderedAddress}</tbody>
        </table>
      );
    } else content = <div className="text-center italic mt-3">no content</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <H2>Address List</H2>
        <Link to="post" className="bg-cyan-500 text-white p-2 rounded-full hover:opacity-70">
          <FaPlus />
        </Link>
      </div>
      <div className="">{content}</div>
    </div>
  );
};

export default Address;
