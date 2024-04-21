import { Actions } from "../../../components/Components";
import { useState } from "react";
import AdmProductModalView from "./AdmProductModalView";
import AdmProductModalDelete from "./AdmProductModalDelete";
import { Figure } from "../../../components/Tags";

const AdmProductCard = ({ item }) => {
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const onClose = () => {
    if (openModalView) setOpenModalView(false);
    if (openModalDelete) setOpenModalDelete(false);
  };

  return (
    <div className="border rounded-lg p-1 sm:p-3 flex flex-col gap-1 sm:gap-2">
      <div className="text-sm text-gray-500">ID: {item?._id?.substring(0, 10)}...</div>
      <Figure src={item?.imageUrl} alt={item?.imageName || "no image"} />
      <div className="capitalize font-medium text-base sm:text-lg">{item?.name}</div>
      <div className="text-lg sm:text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
      <Actions
        id={item?._id}
        modalView={() => setOpenModalView(item?._id)}
        modalDelete={() => setOpenModalDelete(item?._id)}
      />
      {openModalView && <AdmProductModalView item={item} onClose={onClose} />}
      {openModalDelete && <AdmProductModalDelete item={item} onClose={onClose} />}
    </div>
  );
};
AdmProductCard.propTypes;

export default AdmProductCard;
