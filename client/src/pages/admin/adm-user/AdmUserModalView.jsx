import moment from "moment";
import { CloseModalBtn, Modal } from "../../../components/Components";

const AdmUserModalView = ({ onClose, item }) => {
  return (
    <Modal onClick={onClose} id={item?._id}>
      <CloseModalBtn onClose={onClose} />
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
