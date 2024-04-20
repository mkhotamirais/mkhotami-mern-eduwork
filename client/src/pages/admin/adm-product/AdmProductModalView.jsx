import { Badge, Modal } from "../../../components/Components";
import moment from "moment";
import { Figure } from "../../../components/Tags";

const AdmProductModalView = ({ item, onClose }) => {
  return (
    <Modal id={item?._id} onClick={onClose} className={"flex flex-col gap-2"}>
      <Figure src={item.imageUrl} alt={item.imageName} height="h-64 sm:h-72" />
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
    </Modal>
  );
};
AdmProductModalView.propTypes;

export default AdmProductModalView;
