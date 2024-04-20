import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../../app/api/userApiSlice";
import { CloseModalBtn, ConfirmModalDel, Modal } from "../../../components/Components";

const AdmUserModalDelete = ({ onClose, item }) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(item?._id)
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <Modal onClick={onClose} id={item?._id}>
      <CloseModalBtn onClose={onClose} />
      <div className="my-2">Delete {item?.username} apakah kamu yakin?</div>
      <ConfirmModalDel onClose={onClose} onSubmit={handleDelete} />
    </Modal>
  );
};
AdmUserModalDelete.propTypes;

export default AdmUserModalDelete;
