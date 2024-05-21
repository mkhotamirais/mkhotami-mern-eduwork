import moment from "moment";
import { Badge, Modal } from "../../components/Components";

const ProductModalView = ({ onClose, item, modalId }) => {
  return (
    <Modal onClose={onClose} itemId={item?._id} modalId={modalId} closeBtn={true}>
      <div>
        <figure className={`flex-1 h-64 border flex rounded overflow-hidden`}>
          <img
            src={item?.imageUrl}
            alt={item?.imageName || "no image"}
            className="h-full w-full object-cover flex-grow object-center"
          />
        </figure>{" "}
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
    </Modal>
  );
};
ProductModalView.propTypes;

export default ProductModalView;
