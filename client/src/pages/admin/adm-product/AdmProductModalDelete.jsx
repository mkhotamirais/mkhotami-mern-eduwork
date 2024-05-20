import { useDeleteProductMutation } from "../../../app/api/productApiSlice";
import { Modal } from "../../../components/Components";
import toast from "react-hot-toast";
const AdmProductModalDelete = ({ item, modalId, onClose }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const submitDel = (e) => {
    e.preventDefault();
    deleteProduct(item?._id)
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
      item={item}
      itemId={item?._id}
      modalId={modalId}
      onClose={onClose}
      confirmDel={true}
      submitDel={submitDel}
      loadDel={isLoading}
    >
      <div className="mb-3">Delete {item?.name}, are you sure?</div>
    </Modal>
  );
};
AdmProductModalDelete.propTypes;

export default AdmProductModalDelete;
