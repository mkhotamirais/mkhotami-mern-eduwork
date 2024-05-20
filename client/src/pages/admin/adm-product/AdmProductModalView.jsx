import { Badge, Modal } from "../../../components/Components";
import moment from "moment";

const AdmProductModalView = ({ item, modalId, onClose }) => {
  return (
    <Modal
      onClose={onClose}
      item={item}
      itemId={item?._id}
      modalId={modalId}
      closeBtn={true}
      className={"flex flex-col gap-2"}
    >
      <figure className={`flex-1 border flex rounded overflow-hidden`}>
        <img
          src={item?.imageUrl}
          alt={item?.imageName || "no image"}
          className="h-full w-full object-cover flex-grow object-center"
        />
      </figure>
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
