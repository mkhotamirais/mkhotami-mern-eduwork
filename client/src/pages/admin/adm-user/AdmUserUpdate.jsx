import { useEffect, useState } from "react";
import { H2, Input, Label, Select } from "../../../components/Tags";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../app/api/userApiSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";

const AdmUserUpdate = () => {
  const { id } = useParams();
  const { data: user } = useGetUserByIdQuery(id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("user");
  const [editPass, setEditPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = { id: user?._id, username, email, role };
    if (password) data = { ...data, password, confPassword };
    updateUser(data)
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
      <H2>Update User</H2>
      <form onSubmit={handleSubmit}>
        <Label id="username">username</Label>
        <Input
          autoFocus={"on"}
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label id="email">email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={() => setEditPass((prev) => !prev)} className="underline block">
          {editPass ? "Hide" : "Change"} Password
        </button>
        {editPass && (
          <div>
            <Label id="password">password</Label>
            <Input type="password" id="password" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
            <Label id="confPassword">Confirm Password</Label>
            <Input type="password" id="confPassword" placeholder="*****" onChange={(e) => setConfPassword(e.target.value)} />
          </div>
        )}
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

export default AdmUserUpdate;
