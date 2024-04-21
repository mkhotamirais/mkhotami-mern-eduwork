import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../app/api/categoryApiSlice";
import { ConfigProvider, Select } from "antd";
import { setQueryObject, setQueryResult } from "../../app/features/productSlice";

const ProductQueryCategory = () => {
  const { dark } = useSelector((state) => state.basic);
  const { data } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handleChange = (val) => {
    dispatch(setQueryObject({ category: val }));
    dispatch(setQueryResult());
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: dark && {
            Select: {
              colorBgContainer: "#334155",
              colorText: "lightgray",
              colorBgElevated: "#334155",
              colorTextPlaceholder: "gray",
            },
          },
        }}
      >
        <Select
          size={"large"}
          placeholder="Filter Category"
          def
          onChange={handleChange}
          className={`w-32`}
          options={
            data
              ? [{ value: "", label: "Filter Category" }, ...data.map((item) => ({ value: item?._id, label: item?.name }))]
              : []
          }
        />{" "}
      </ConfigProvider>
    </div>
  );
};

export default ProductQueryCategory;
