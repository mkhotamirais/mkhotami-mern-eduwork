import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../app/api/userApiSlice";
import { Err, Loading } from "../../../components/Components";
import moment from "moment";

const AdmUserDetail = () => {
  const { id } = useParams();
  const { data: item, isLoading, isSuccess, isError, error } = useGetUserByIdQuery(id);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div className="flex flex-col gap-2 border rounded p-2">
        <div>Username : {item?.username}</div>
        <div>Email : {item?.email}</div>
        <div>Role : {item?.role}</div>
        <div>Created {moment(item?.createdAt).fromNow()}</div>
        <div>Updated {moment(item?.updatedAt).fromNow()}</div>
      </div>
    );
  }
  return content;
};

export default AdmUserDetail;
