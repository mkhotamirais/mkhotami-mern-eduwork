import toast from "react-hot-toast";
import { useDeleteMeMutation } from "../../app/api/authApiSlice";
import { Modal } from "../../components/Components";

const ProfileModalDelete = ({ onClose, item, modalId }) => {
  const [deleteMe, { isLoading }] = useDeleteMeMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteMe()
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <Modal
      onClose={onClose}
      item={item}
      itemId={item?._id}
      modalId={modalId}
      closeBtn={true}
      confirmDel={true}
      loadDel={isLoading}
      submitDel={handleDelete}
    >
      Delete your account, are you sure?
    </Modal>
  );
};
ProfileModalDelete.propTypes;

export default ProfileModalDelete;
