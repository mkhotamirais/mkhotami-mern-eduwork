import moment from "moment";
import { Figure } from "../../../components/Tags";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../app/api/productApiSlice";
import { Badge } from "../../../components/Components";

const AdmProductDetail = () => {
  const { id } = useParams();
  const { data: item } = useGetProductByIdQuery(id);

  return (
    <div className="border rounded p-2 my-2 flex flex-col gap-2">
      <Figure src={item?.imageUrl} alt={item?.imageName} height="h-64 sm:h-72" />
      <div className="capitalize font-medium text-base sm:text-lg">{item?.name}</div>
      <div className="text-lg sm:text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
      <div>{item?.description}</div>
      <div>Category: {item?.category?.name}</div>
      <div>
        <span>Tags : </span>
        <div className="inline-flex gap-1">
          {item?.tags?.map((tag) => (
            <Badge key={tag?._id}>{tag?.name}</Badge>
          ))}
        </div>
      </div>
      <div className="text-sm">
        <div>Created {moment(item?.createdAt).fromNow()}</div>
        <div>Updated {moment(item?.updatedAt).fromNow()}</div>
      </div>
    </div>
  );
};

export default AdmProductDetail;
