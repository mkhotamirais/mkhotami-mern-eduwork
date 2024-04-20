import { useEffect } from "react";
import { useGetProductsQuery } from "../../app/api/productApiSlice";
import { Err, Loading } from "../../components/Components";

const Product = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = "halo";
  }
  return <div>{content}</div>;
};

export default Product;
