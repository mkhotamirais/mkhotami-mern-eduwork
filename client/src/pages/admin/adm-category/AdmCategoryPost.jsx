import { useState } from "react";
import { usePostCategoryMutation } from "../../../app/api/categoryApiSlice";
import toast from "react-hot-toast";
import { Input } from "../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setEditCat } from "../../../app/features/editSlice";

const AdmCategoryPost = () => {
  const [postCategory, { isLoading }] = usePostCategoryMutation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleFocus = () => {
    dispatch(setEditCat(null));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postCategory({ name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-1 md:w-1/2">
      <Input
        id="name"
        onFocus={handleFocus}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="input category name"
      />
      <button
        type="submit"
        className="border w-12 rounded flex items-center justify-center mb-2 bg-cyan-500 text-white hover:opacity-70"
      >
        {isLoading ? <PiSpinner /> : <FaPlus />}
      </button>
    </form>
  );
};

export default AdmCategoryPost;
