import moment from "moment";
import { Modal } from "../../../components/Components";

const AdmUserModalView = ({ onClose, item, modalId }) => {
  return (
    <Modal onClose={onClose} item={item} itemId={item?._id} modalId={modalId} closeBtn={true}>
      <div>
        <div>Username : {item?.username}</div>
        <div>Email : {item?.email}</div>
        <div>Role : {item?.role}</div>
        <div>Created {moment(item?.createdAt).fromNow()}</div>
        <div>Updated {moment(item?.updatedAt).fromNow()}</div>
      </div>
    </Modal>
  );
};
AdmUserModalView.propTypes;

export default AdmUserModalView;
