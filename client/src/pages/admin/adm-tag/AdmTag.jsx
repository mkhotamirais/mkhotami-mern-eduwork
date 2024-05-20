import { useState } from "react";
import { H2 } from "../../../components/Tags";
import { Err, Loading, Modal } from "../../../components/Components";
import toast from "react-hot-toast";
import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import AdmTagPost from "./AdmTagPost";
import { useDeleteTagMutation, useGetTagsQuery, useUpdateTagMutation } from "../../../app/api/tagApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEditTag } from "../../../app/features/editSlice";

const AdmTag = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetTagsQuery();

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = data.map((item) => <TagItem key={item?._id} item={item} />);
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

const TagItem = ({ item }) => {
  const [idModalDel, setIdModalDel] = useState(null);
  const [name, setName] = useState(item?.name);
  const [updateTag] = useUpdateTagMutation();
  const dispatch = useDispatch();
  const { editTag } = useSelector((state) => state.edit);

  const onClose = () => {
    setIdModalDel(null);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateTag({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(setEditTag(null));
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleCancelEdit = () => {
    dispatch(setEditTag(null));
    setName(item?.name);
  };

  return (
    <div className="flex justify-between border rounded p-2 gap-2">
      {editTag === item?._id ? (
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
        <div onClick={() => dispatch(setEditTag(item?._id))} className="hover:cursor-text w-full">
          {item?.name}
        </div>
      )}
      <div className="flex items-center gap-4">
        {editTag === item?._id ? (
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
            <button onClick={() => dispatch(setEditTag(item?._id))}>
              <FaPenToSquare className="text-green-600" />
            </button>
            <button onClick={() => setIdModalDel(item?._id)}>
              <FaTrashCan className="text-red-600" />
            </button>
          </>
        )}
        <TagModalDelete item={item} onClose={onClose} idModalDel={idModalDel} />
      </div>
    </div>
  );
};
TagItem.propTypes;

const TagModalDelete = ({ onClose, item, idModalDel }) => {
  const [deleteTag, { isLoading }] = useDeleteTagMutation();
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

TagModalDelete.propTypes;
