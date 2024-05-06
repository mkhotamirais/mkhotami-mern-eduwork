import { CloseModalBtn, ConfirmModalDel, Modal } from "../../components/Components";
import toast from "react-hot-toast";
import { useDeleteAddressMutation } from "../../app/api/addressApiSlice";

const AddressModalDelete = ({ onClose, item }) => {
  const [deleteAddress] = useDeleteAddressMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteAddress(item?._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        onClose();
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
AddressModalDelete.propTypes;

export default AddressModalDelete;
