import { useState } from "react";
import { Actions } from "../../../components/Components";
import moment from "moment";
import AdmUserModalDelete from "./AdmUserModalDelete";
import AdmUserModalView from "./AdmUserModalView";

const AdmUserTable = ({ item, i }) => {
  const [idModalDel, setIdModalDel] = useState(null);
  const [idModalView, setIdModalView] = useState(null);

  const onClose = () => {
    if (idModalDel) setIdModalDel(null);
    if (idModalView) setIdModalView(null);
  };

  return (
    <tr className="*:border *:rounded *:p-1 *:px-2">
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td className="hidden sm:table-cell">{item?.email}</td>
      <td className="hidden md:table-cell">{item?.role}</td>
      <td className="hidden lg:table-cell">{moment(item?.createdAt).fromNow()}</td>
      <td className="hidden xl:table-cell">{moment(item?.updatedAt).fromNow()}</td>
      <td>
        <Actions modalDelete={() => setIdModalDel(item?._id)} modalView={() => setIdModalView(item?._id)} id={item?._id} />
        <AdmUserModalDelete onClose={onClose} item={item} modalId={idModalDel} />
        <AdmUserModalView onClose={onClose} item={item} modalId={idModalView} />
      </td>
    </tr>
  );
};
AdmUserTable.propTypes;

export default AdmUserTable;
