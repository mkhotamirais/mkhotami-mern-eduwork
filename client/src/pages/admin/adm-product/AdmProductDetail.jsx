import moment from "moment";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../app/api/productApiSlice";
import { Badge, Err, Loading } from "../../../components/Components";

const AdmProductDetail = () => {
  const { id } = useParams();
  const { data: item, isLoading, isSuccess, isError, error } = useGetProductByIdQuery(id);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div className="flex flex-col sm:flex-row gap-2">
        <figure className={`flex-1 border flex rounded overflow-hidden`}>
          <img
            src={item?.imageUrl}
            alt={item?.imageName || "no image"}
            className="h-full w-full object-cover flex-grow object-center"
          />
        </figure>
        <div className="flex-1 border rounded p-2 flex flex-col gap-2">
          <div>
            <b>Name</b> : {item?.name}
          </div>
          <div>
            <b>Price</b> : Rp{item?.price?.toLocaleString("id-ID")}
          </div>
          <div>
            <b>Description</b> : {item?.description}
          </div>
          <div>
            <b>Category</b> : {item?.category?.name}
          </div>
          <div>
            <b>Tags</b> :{" "}
            <div className="inline-flex gap-1">
              {item?.tags.map((tag) => (
                <Badge key={tag?._id}>{tag?.name}</Badge>
              ))}
            </div>
          </div>
          <div>Created {moment(item?.createdAt).fromNow()}</div>
          <div>Updated {moment(item?.updatedAt).fromNow()}</div>
        </div>
      </div>
    );
  }

  return content;
};

export default AdmProductDetail;
