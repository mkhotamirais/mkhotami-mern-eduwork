import { useState } from "react";
import { H2, Input, Label, Select } from "../../../components/Tags";
import { usePostUserMutation } from "../../../app/api/userApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";

const AdmUserPost = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [postUser, { isLoading }] = usePostUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, email, password, confPassword, role };
    postUser(data)
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
    <div>
      <H2>Post User</H2>
      <form onSubmit={handleSubmit}>
        <Label id="username">username</Label>
        <Input autoFocus={"on"} id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <Label id="email">email</Label>
        <Input type="email" id="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        <Label id="password">password</Label>
        <Input type="password" id="password" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
        <Label id="confPassword">Confirm Password</Label>
        <Input type="password" id="confPassword" placeholder="*****" onChange={(e) => setConfPassword(e.target.value)} />
        <Label id="role">Role</Label>
        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={null}>select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
        <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4 hover:opacity-70 w-24">
          {isLoading ? <PiSpinner className="animate-spin mx-auto text-2xl py-1" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AdmUserPost;
