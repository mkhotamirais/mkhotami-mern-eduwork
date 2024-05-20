import { Err, Loading } from "../../components/Components";
import moment from "moment";
import { useGetMeQuery, useUpdateMeMutation } from "../../app/api/authApiSlice";
import { H2 } from "../../components/Tags";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProfileModalDelete from "./ProfileModalDelete";

const Profile = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetMeQuery();
  const { dark } = useSelector((state) => state.basic);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPass, setIsEditPass] = useState(false);
  const [username, setUsername] = useState(data?.username);
  const [email, setEmail] = useState(data?.email);
  const [role, setRole] = useState(data?.role);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [idModalDel, setIdModalDel] = useState(null);
  const [updateMe] = useUpdateMeMutation();

  const onClose = () => {
    setIdModalDel(null);
  };

  const handleUpdateMe = () => {
    let result = { username, email, role };
    if (data.role === "user") result = { username, email, role: null };
    if (password) result = { ...result, password, confPassword };
    updateMe(result)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setUsername(data?.username);
    setEmail(data?.email);
    setRole(data?.role);
  };

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <table className="rounded w-full border-separate border-spacing-2">
        <tbody className="*:text-left">
          <tr>
            <th>Username</th>
            <td>
              {isEdit ? (
                <input
                  type="text"
                  value={username}
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-inherit focus:outline-none"
                />
              ) : (
                data?.username
              )}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              {isEdit ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-inherit focus:outline-none"
                />
              ) : (
                data?.email
              )}
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>
              {isEdit ? (
                <select
                  disabled={data?.role === "user" ? true : false}
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`${dark ? "bg-slate-800" : "bg-white"} focus:outline-none`}
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              ) : (
                data?.role
              )}
            </td>
          </tr>
          {isEdit && (
            <tr>
              <td colSpan={2}>
                <button onClick={() => setIsEditPass((prev) => !prev)} href="#" className="underline">
                  {isEditPass ? "Hide" : "Edit"} Password
                </button>
              </td>
            </tr>
          )}
          {isEditPass && (
            <tr>
              <th className="flex flex-start">password</th>
              <td>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoFocus
                  placeholder="password"
                  className="block bg-inherit focus:outline-none mb-2"
                />
                <input
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="password"
                  placeholder="confirm password"
                  className="block bg-inherit focus:outline-none"
                />
              </td>
            </tr>
          )}
          <tr>
            <th>Created</th>
            <td>
              <div>{moment(data.createdAt).fromNow()}</div>
            </td>
          </tr>
          <tr>
            <th>Updated</th>
            <td>
              <div>{moment(data.updatedAt).fromNow()}</div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="md:mx-10 lg:mx-24">
      <H2>Profile</H2>
      <div className="border rounded-lg overflow-hidden p-2 *:has-[tbody>th]:border">
        {content}
        {isEdit ? (
          <div className="flex gap-2 py-2">
            <button onClick={handleUpdateMe} className="bg-cyan-500 text-white hover:opacity-70 px-3 rounded-lg">
              Save
            </button>
            <button onClick={handleCancel} className="bg-gray-500 text-white hover:opacity-70 px-3 rounded-lg">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2 py-2">
            <button onClick={() => setIsEdit(true)} className="bg-cyan-500 text-white hover:opacity-70 px-3 rounded-lg">
              Update
            </button>
            <button
              onClick={() => setIdModalDel(data?._id)}
              className="bg-red-500 text-white hover:opacity-70 px-3 rounded-lg"
            >
              Delete
            </button>
            <ProfileModalDelete onClose={onClose} item={data} modalId={idModalDel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
