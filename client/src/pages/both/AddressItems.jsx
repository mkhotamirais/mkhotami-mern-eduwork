import { useState } from "react";
import { Actions } from "../../components/Components";
import AddressModalDelete from "./AddressModalDelete";
import AddressModalView from "./AddressModalView";

const AddressItems = ({ item, i }) => {
  const [idModalDel, setIdModalDel] = useState(null);
  const [idModalView, setIdModalView] = useState(null);

  const onClose = () => {
    if (idModalDel) setIdModalDel(null);
    if (idModalView) setIdModalView(null);
  };

  return (
    <tr className="*:border *:rounded *:px-1">
      <td>{i + 1}</td>
      <td className="capitalize">{item?.name}</td>
      <td>{item?.user?.username}</td>
      <td className="hidden sm:table-cell">{item?.detail}</td>
      <td className="hidden md:table-cell">
        <div>
          Kel. {item?.kelurahan?.split("-")[1]} Kec. {item?.kecamatan?.split("-")[1]} Kab. {item?.kabupaten?.split("-")[1]}{" "}
          Prov. {item?.provinsi?.split("-")[1]}
        </div>
      </td>
      <td className="w-28">
        <Actions modalDelete={() => setIdModalDel(item?._id)} modalView={() => setIdModalView(item?._id)} id={item?._id} />
        <AddressModalDelete onClose={onClose} item={item} modalId={idModalDel} />
        <AddressModalView onClose={onClose} item={item} modalId={idModalView} />
      </td>
    </tr>
  );
};
AddressItems.propTypes;

export default AddressItems;
