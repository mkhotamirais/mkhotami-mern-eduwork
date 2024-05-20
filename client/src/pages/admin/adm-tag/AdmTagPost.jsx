import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { usePostTagMutation } from "../../../app/api/tagApiSlice";
import { useDispatch } from "react-redux";
import { setEditTag } from "../../../app/features/editSlice";

const AdmTagPost = () => {
  const [postTag, { isLoading }] = usePostTagMutation();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleFocus = () => {
    dispatch(setEditTag(null));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postTag({ name })
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
        placeholder="input tag name"
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

export default AdmTagPost;
