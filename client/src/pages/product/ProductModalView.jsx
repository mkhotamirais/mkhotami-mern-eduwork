import moment from "moment";
import { Badge, CloseModalBtn, Modal } from "../../components/Components";
import { Figure } from "../../components/Tags";

const ProductModalView = ({ onClose, item }) => {
  return (
    <Modal onClick={onClose} id={item?._id}>
      <CloseModalBtn onClose={onClose} />
      <div>
        <Figure src={item?.imageUrl} alt={item?.imageName || "no image"} height="h-48 sm:h-64" />
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
