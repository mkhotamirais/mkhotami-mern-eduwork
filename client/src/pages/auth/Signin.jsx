import { useState } from "react";
import { Input, Label } from "../../components/Tags";
import AuthLayout from "./AuthLayout";
import { useSigninMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { setToken } from "../../app/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(setToken(res.data));
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <AuthLayout onSubmit={handleSubmit} title="login" isLoading={isLoading}>
      <Label id="username">username</Label>
      <Input id="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Label id="password">password</Label>
      <Input
        type="password"
        placeholder="*****"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthLayout>
  );
};

export default Signin;
