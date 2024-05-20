import { Actions, Badge } from "../../../components/Components";
import { useState } from "react";
import AdmProductModalView from "./AdmProductModalView";
import AdmProductModalDelete from "./AdmProductModalDelete";
import { Link } from "react-router-dom";

const AdmProductCard = ({ item }) => {
  const [idModalView, setIdModalView] = useState(null);
  const [idModalDelete, setIdModalDelete] = useState(null);

  const onClose = () => {
    if (idModalView) setIdModalView(null);
    if (idModalDelete) setIdModalDelete(null);
  };

  return (
    <div className="border rounded-lg p-1 sm:p-2 flex flex-col justify-between gap-1 sm:gap-2 relative">
      <Badge className={"z-30 absolute right-1 top-1 bg-green-500 text-white bg-opacity-70"}>{item?.category?.name}</Badge>
      <div className="z-30 absolute left-1 top-1 flex flex-col items-start gap-1">
        {item?.tags.map((tag) => (
          <Badge key={tag?._id} className={"bg-opacity-70 bg-gray-500 text-white"}>
            {tag?.name}
          </Badge>
        ))}
      </div>
      <div className="py-1">
        <Link to={`detail/${item?._id}`}>
          <figure className={`h-32 rounded overflow-hidden border`}>
            <img
              src={item?.imageUrl}
              alt={item?.imageName || "no image"}
              className="h-full w-full object-cover object-center hover:object-contain hover:scale-95 transition-all duration-150"
            />
          </figure>
        </Link>{" "}
        <div className="capitalize text-base leading-relaxed">{item?.name}</div>
        <div className="text-lg sm:text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
      </div>
      <Actions id={item?._id} modalView={() => setIdModalView(item?._id)} modalDelete={() => setIdModalDelete(item?._id)} />
      <AdmProductModalView item={item} modalId={idModalView} onClose={onClose} />
      <AdmProductModalDelete item={item} modalId={idModalDelete} onClose={onClose} />
    </div>
  );
};
AdmProductCard.propTypes;

export default AdmProductCard;
