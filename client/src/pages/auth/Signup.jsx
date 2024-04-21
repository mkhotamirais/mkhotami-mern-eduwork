import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Input, Label } from "../../components/Tags";
import { useSignupMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useSignupMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, email, password, confPassword };
    register(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <AuthLayout onSubmit={handleSubmit} title="register" isLoading={isLoading}>
      <Label id="username">username</Label>
      <Input
        autoFocus={"on"}
        id="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Label id="email">email</Label>
      <Input type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label id="password">password</Label>
      <Input
        type="password"
        id="password"
        placeholder="*****"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Label id="confPassword">confPassword</Label>
      <Input
        type="password"
        id="confPassword"
        placeholder="*****"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      />
    </AuthLayout>
  );
};

export default Signup;
