import { useState } from "react";
import { H2, Input, Label, Textarea } from "../../../components/Tags";

const AdmProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <H2>Product Post</H2>
      <form>
        <div>
          <Label id="name">name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Label id="price">price</Label>
          <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <Label id="category">category</Label>
          <Label id="tag">Tag</Label>
        </div>
        <Label id="description">description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label id="image">Image</Label>
      </form>
    </>
  );
};

export default AdmProductPost;
