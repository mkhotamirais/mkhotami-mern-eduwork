import { useState } from "react";
import { H2 } from "../../../components/Tags";
import { CloseModalBtn, ConfirmModalDel, Err, Loading, Modal } from "../../../components/Components";
import toast from "react-hot-toast";
import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import AdmTagPost from "./AdmTagPost";
import { useDeleteTagMutation, useGetTagsQuery, useUpdateTagMutation } from "../../../app/api/tagApiSlice";

const AdmTag = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetTagsQuery();
  const [isEdit, setIsEdit] = useState(null);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = data.map((item) => <TagItem key={item?._id} item={item} isEdit={isEdit} setIsEdit={setIsEdit} />);
  }

  return (
    <>
      <H2>Tag List</H2>
      <AdmTagPost />
      <div className="rounded flex flex-col gap-1 md:w-1/2">{content}</div>
    </>
  );
};
export default AdmTag;

const TagItem = ({ item, isEdit, setIsEdit }) => {
  const [openModalDelete, setOpenModalDelete] = useState(null);
  const [name, setName] = useState(item?.name);
  const [updateTag] = useUpdateTagMutation();

  const onClose = () => {
    setOpenModalDelete(null);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateTag({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsEdit(null);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleCancelEdit = () => {
    setIsEdit(null);
    setName(item?.name);
  };

  return (
    <div className="flex justify-between border rounded p-2">
      {isEdit === item?._id ? (
        <form onSubmit={handleEdit}>
          <input autoFocus="on" value={name} onChange={(e) => setName(e.target.value)} className="focus:outline-none" />
          <button type="submit" title="edit" />
        </form>
      ) : (
        <div onClick={() => setIsEdit(item?._id)}>{item?.name}</div>
      )}
      <div className="flex items-center gap-4">
        {isEdit === item?._id ? (
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
            <button onClick={() => setIsEdit(item?._id)}>
              <FaPenToSquare className="text-green-600" />
            </button>
            <button onClick={() => setOpenModalDelete(item?._id)}>
              <FaTrashCan className="text-red-600" />
            </button>
          </>
        )}
        {openModalDelete === item?._id && <TagModalDelete item={item} onClose={onClose} />}
      </div>
    </div>
  );
};
TagItem.propTypes;

const TagModalDelete = ({ onClose, item }) => {
  const [deleteTag] = useDeleteTagMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteTag(item?._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <Modal onClick={onClose} id={item?._id}>
      <CloseModalBtn onClose={onClose} />
      <div className="my-2">Delete {item?.name}, apakah kamu yakin</div>
      <ConfirmModalDel onSubmit={handleDelete} onClose={onClose} />
    </Modal>
  );
};
TagModalDelete.propTypes;
