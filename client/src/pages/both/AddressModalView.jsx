import { Modal } from "../../components/Components";
import moment from "moment";

const AddressModalView = ({ onClose, item, modalId }) => {
  return (
    <Modal onClose={onClose} item={item} itemId={item?._id} modalId={modalId} closeBtn={true}>
      <div className="my-2 flex flex-col gap-2">
        <div>
          <b>User</b> : {item?.user?.username}
        </div>
        <div>
          <b>Address</b> : {item?.name}, {item?.detail}, Kel. {item?.kelurahan?.split("-")[1]} Kec.{" "}
          {item?.kecamatan?.split("-")[1]} Kab. {item?.kabupaten?.split("-")[1]} Prov. {item?.provinsi?.split("-")[1]}
        </div>
        <div>
          <b>Created</b> {moment(item?.createdAt).fromNow()}
        </div>
        <div>
          <b>Updated</b> {moment(item?.updatedAt).fromNow()}
        </div>
      </div>
    </Modal>
  );
};
AddressModalView.propTypes;

export default AddressModalView;
