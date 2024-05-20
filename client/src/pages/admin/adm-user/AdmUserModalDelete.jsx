import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../../app/api/userApiSlice";
import { Modal } from "../../../components/Components";

const AdmUserModalDelete = ({ onClose, item, modalId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(item?._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <Modal
      onClose={onClose}
      itemId={item?._id}
      modalId={modalId}
      closeBtn={true}
      confirmDel={true}
      submitDel={handleDelete}
      loadDel={isLoading}
    >
      <div className="my-2">Delete {item?.username} apakah kamu yakin?</div>
    </Modal>
  );
};
AdmUserModalDelete.propTypes;

export default AdmUserModalDelete;
