import { Modal } from "../../components/Components";
import toast from "react-hot-toast";
import { useDeleteAddressMutation } from "../../app/api/addressApiSlice";

const AddressModalDelete = ({ onClose, item, modalId }) => {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
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
    <Modal
      onClose={onClose}
      item={item}
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
AddressModalDelete.propTypes;

export default AddressModalDelete;
