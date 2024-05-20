import moment from "moment";
import { Badge, CloseModalBtn, Modal } from "../../components/Components";

const ProductModalView = ({ onClose, item }) => {
  return (
    <Modal onClick={onClose} id={item?._id}>
      <CloseModalBtn onClose={onClose} />
      <div>
        <figure className={`flex-1 border flex rounded overflow-hidden`}>
          <img
            src={item?.imageUrl}
            alt={item?.imageName || "no image"}
            className="h-full w-full object-cover flex-grow object-center"
          />
        </figure>{" "}
        <div>{item?.name}</div>
        <div>Rp{item?.price?.toLocaleString("id-ID")}</div>
        <div>{item?.description}</div>
        <div>Category : {item?.category?.name}</div>
        <div>
          <span>Tags : </span>
          <div className="inline-flex gap-1">
            {item?.tags.map((tag) => (
              <Badge key={tag?._id}>{tag?.name}</Badge>
            ))}
          </div>
        </div>
        <div>Created {moment(item?.createdAt).fromNow()}</div>
        <div>Updated {moment(item?.updatedAt).fromNow()}</div>
      </div>
    </Modal>
  );
};
ProductModalView.propTypes;

export default ProductModalView;
