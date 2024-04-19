import { useEffect } from "react";
import { useGetProductsQuery } from "../../../app/api/productApiSlice";
import { Err, GridCard, Loading } from "../../../components/Components";
import { Section } from "../../../components/Tags";
import AdmProductCard from "./AdmProductCard";

const AdmProduct = () => {
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  useEffect(() => {
    console.log(products);
  }, [products]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedProduct = products && products.map((item) => <AdmProductCard key={item?._id} item={item} />);
    content = <GridCard>{renderedProduct}</GridCard>;
  }

  return <Section>{content}</Section>;
};

export default AdmProduct;
