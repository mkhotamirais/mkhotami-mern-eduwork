import { Err, Loading } from "../components/Components";
import moment from "moment";
import { useGetMeQuery } from "../app/api/authApiSlice";
import { H2 } from "../components/Tags";

const Profile = () => {
  const { data = [], isLoading, isSuccess, isError, error } = useGetMeQuery();

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div className="border rounded p-2 flex flex-col gap-2">
        <div>Username: {data?.username}</div>
        <div>Email: {data?.email}</div>
        <div>Role: {data?.role}</div>
        <div>Created {moment(data.createdAt).fromNow()}</div>
        <div>Updated {moment(data.updatedAt).fromNow()}</div>
      </div>
    );
  }
  return (
    <div>
      <H2>Profile</H2>
      {content}
    </div>
  );
};

export default Profile;
