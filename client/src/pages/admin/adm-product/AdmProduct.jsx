import { useGetProductsQuery } from "../../../app/api/productApiSlice";
import { Err, GridCard, Loading } from "../../../components/Components";
import { H2 } from "../../../components/Tags";
import AdmProductCard from "./AdmProductCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const AdmProduct = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedProduct = data.map((item) => <AdmProductCard key={item?._id} item={item} />);
    content = <GridCard>{renderedProduct}</GridCard>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <H2>Product List</H2>
        <Link to="post" className="bg-cyan-500 p-2 text-sm rounded-full text-white hover:opacity-70">
          <FaPlus />
        </Link>
      </div>
      <div className="mt-2">{content}</div>
    </>
  );
};

export default AdmProduct;
