import { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../app/api/categoryApiSlice";
import { H2 } from "../../../components/Tags";
import { Err, Loading, Modal } from "../../../components/Components";
import toast from "react-hot-toast";
import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import AdmCategoryPost from "./AdmCategoryPost";
import { useDispatch, useSelector } from "react-redux";
import { setEditCat } from "../../../app/features/editSlice";

const AdmCategory = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = data.map((item) => <CategoryItem key={item?._id} item={item} />);
  }

  return (
    <>
      <H2>Category List</H2>
      <AdmCategoryPost />
      <div className="rounded flex flex-col gap-1 md:w-1/2">{content}</div>
    </>
  );
};
export default AdmCategory;

const CategoryItem = ({ item }) => {
  const [idModalDel, setIdModalDidModalDel] = useState(null);
  const { editCat } = useSelector((state) => state.edit);
  const [name, setName] = useState(item?.name);
  const [updateCategory] = useUpdateCategoryMutation();
  const dispatch = useDispatch();

  const onClose = () => {
    setIdModalDidModalDel(null);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateCategory({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(setEditCat(null));
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleCancelEdit = () => {
    dispatch(setEditCat(null));
    setName(item?.name);
  };

  return (
    <div className="flex gap-2 justify-between border rounded p-2">
      {editCat === item?._id ? (
        <form onSubmit={handleEdit} className="w-full">
          <input
            autoFocus="on"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:outline-none w-full"
          />
          <button type="submit" title="edit" />
        </form>
      ) : (
        <div onClick={() => dispatch(setEditCat(item?._id))} className="w-full hover:cursor-text">
          {item?.name}
        </div>
      )}
      <div className="flex items-center gap-4">
        {editCat === item?._id ? (
          <>
            <button onClick={handleEdit}>
              <FaCheck className="text-green-600" />
            </button>
            <button onClick={handleCancelEdit}>
              <FaXmark className="text-red-600" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(setEditCat(item?._id))}>
              <FaPenToSquare className="text-green-600" />
            </button>
            <button onClick={() => setIdModalDidModalDel(item?._id)}>
              <FaTrashCan className="text-red-600" />
            </button>
          </>
        )}
        <CategoryModalDelete item={item} onClose={onClose} idModalDel={idModalDel} />
      </div>
    </div>
  );
};
CategoryItem.propTypes;

const CategoryModalDelete = ({ onClose, item, idModalDel }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteCategory(item?._id)
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
      modalId={idModalDel}
      closeBtn={true}
      confirmDel={true}
      submitDel={handleDelete}
      loadDel={isLoading}
    >
      <div className="my-2">Delete {item?.name}, apakah kamu yakin</div>
    </Modal>
  );
};
CategoryModalDelete.propTypes;
