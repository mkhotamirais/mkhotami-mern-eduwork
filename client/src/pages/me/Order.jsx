import { Link } from "react-router-dom";
import { useGetOrderQuery } from "../../app/api/orderApiSlice";
import { Err, Loading } from "../../components/Components";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Order = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetOrderQuery();
  const [openOrderId, setOpenOrderId] = useState(null);
  const toggleOpenOrderId = (id) => {
    if (openOrderId === id) setOpenOrderId(null);
    else setOpenOrderId(id);
  };
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data) {
      const renderedData =
        data &&
        data.map((item) => (
          <div key={item?._id} className="border rounded my-1 p-1">
            <div className="flex gap-2">
              <button onClick={() => toggleOpenOrderId(item?._id)} className="border rounded p-1 hover:opacity-70">
                <FaChevronRight className={`${openOrderId === item?._id ? "rotate-90" : ""} transition-all duration-100`} />
              </button>
              <div className="flex justify-between items-center w-full">
                <div className="flex">
                  <div className="w-32">ID:{item?._id?.substring(0, 5)}..</div>
                  <div>Rp{item?.totalPrice?.toLocaleString("id-ID")}</div>
                </div>
                <Link
                  to={`/me/checkout-invoice/${item?._id}`}
                  className="bg-cyan-500 text-white text-sm rounded p-1 px-2 hover:opacity-70"
                >
                  Invoice
                </Link>
              </div>
            </div>
            {openOrderId === item?._id && (
              <div className="border my-1 rounded p-1">
                <div className="flex justify-between border rounded p-1 mb-1 font-medium">
                  <div className="flex">
                    <div className="w-32">Name</div>
                    <div>Qty</div>
                  </div>
                  <div>Price</div>
                </div>
                {item?.cart?.map((item) => (
                  <div key={item?._id} className="border rounded p-1 flex justify-between mb-1">
                    <div className="flex">
                      <div className="w-32">{item?.productId?.name}</div>
                      <div>{item?.qty}</div>
                    </div>
                    <div>Rp{item?.productPrice?.toLocaleString("id-ID")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ));
      content = <div>{renderedData}</div>;
    } else content = <div className="text-center italic mt-3">no content</div>;
  }

  return <div>{content}</div>;
};

export default Order;
