import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Input, Label } from "../../components/Tags";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthLayout onSubmit={handleSubmit} title="register">
      <Label id="username">username</Label>
      <Input id="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
