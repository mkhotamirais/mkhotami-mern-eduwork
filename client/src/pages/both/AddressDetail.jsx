import { useParams } from "react-router-dom";
import { useGetAddressByIdQuery } from "../../app/api/addressApiSlice";
import moment from "moment";
import { Err, Loading } from "../../components/Components";

const AddressDetail = () => {
  const { id } = useParams();
  const { data: item, isLoading, isSuccess, isError, error } = useGetAddressByIdQuery(id);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div className="my-2 border rounded p-2 flex flex-col gap-2">
        <div>
          <b>User</b> : {item?.user?.username}
        </div>
        <div>
          <b>Address</b> : {item?.name}, {item?.detail}, KEL. {item?.kelurahan}, KEC. {item?.kecamatan}, KAB.{" "}
          {item?.kabupaten}, PROV. {item?.provinsi}
        </div>
        <div>
          <b>Created</b> {moment(item?.createdAt).fromNow()}
        </div>
        <div>
          <b>Updated</b> {moment(item?.updatedAt).fromNow()}
        </div>
      </div>
    );
  }

  return content;
};

export default AddressDetail;
