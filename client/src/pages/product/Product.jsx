import { useGetProductsQuery } from "../../app/api/productApiSlice";
import { Err, GridCard, Loading } from "../../components/Components";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import { Section } from "../../components/Tags";
import ProductQuerySearch from "./ProductQuerySearch";
import ProductQueryTag from "./ProductQueryTag";
import ProductQueryCategory from "./ProductQueryCategory";

const Product = () => {
  const { queryResult } = useSelector((state) => state.product);
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery(queryResult);
  const { viewMode } = useSelector((state) => state.basic);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const productCard = products && products.map((item) => <ProductCard key={item?._id} item={item} />);
    const productTable = products && products.map((item, i) => <ProductTable key={item?._id} item={item} i={i} />);
    if (viewMode === "card") {
      content = <GridCard>{productCard}</GridCard>;
    } else if (viewMode === "table") {
      content = (
        <table>
          <thead>
            <tr>
              <th>no</th>
              <th>image</th>
              <th>name</th>
              <th>price</th>
              <th>description</th>
              <th>tags</th>
              <th>category</th>
              <th>created</th>
              <th>updated</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{productTable}</tbody>
        </table>
      );
    }
  }
  return (
    <Section>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <ProductQuerySearch />
          <ProductQueryCategory />
        </div>
        <ProductQueryTag />
      </div>
      {content}
    </Section>
  );
};

export default Product;
