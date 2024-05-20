import { useEffect, useState } from "react";
import { H2, Input, Label, Textarea } from "../../../components/Tags";
import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";
import { useGetTagsQuery } from "../../../app/api/tagApiSlice";
import { usePostProductMutation } from "../../../app/api/productApiSlice";
import toast from "react-hot-toast";
import { Select } from "../../../components/Tags";
import { useNavigate } from "react-router-dom";
import { PreviewImg } from "../../../components/Components";

const AdmProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState([]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
  };

  useEffect(() => {
    console.log(tag);
  }, [tag]);

  const handleChangeImage = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleChangeTag = (e) => {
    setTag((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();
  const [postProduct] = usePostProductMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    tag.map((t) => {
      data.append("tags[]", t);
    });
    data.append("image", image);
    data.append("description", description);
    postProduct(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <>
      <H2>Product Post</H2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="flex-1">
            <Label id="name">name</Label>
            <Input id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label id="price">price</Label>
            <Input type="number" placeholder="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="flex-1">
            <Label id="category">category</Label>
            <Select id="category" onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              {categories?.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            <Label id="tag">tag</Label>
            <div className="flex gap-2 border rounded p-2 flex-wrap">
              {tags?.map((item) => (
                <div key={item?._id} className="flex items-center capitalize gap-2">
                  <input type="checkbox" name="tag" value={item?._id} onChange={handleChangeTag} />
                  {item?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Label id="description">description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label id="image">Image</Label>
        <Input type="file" onChange={handleChangeImage} />
        {preview && <PreviewImg preview={preview} onRemovePreview={onRemovePreview} />}
        <button type="submit" className="bg-cyan-500 text-white p-2 px-4 rounded hover:opacity-70">
          Submit
        </button>
      </form>
    </>
  );
};

export default AdmProductPost;
