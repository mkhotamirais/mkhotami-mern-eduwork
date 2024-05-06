import { useState } from "react";
import { Actions } from "../../components/Components";
import AddressModalDelete from "./AddressModalDelete";
import AddressModalView from "./AddressModalView";

const AddressItems = ({ item, i }) => {
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalDelete) setShowModalDelete(null);
    if (showModalView) setShowModalView(null);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td className="capitalize">{item?.name}</td>
      <td>{item?.user?.username}</td>
      <td className="hidden sm:table-cell">{item?.detail}</td>
      <td className="hidden md:table-cell">
        <div>
          Kel. {item?.kelurahan} Kec. {item?.kecamatan} Kab. {item?.kabupaten} Prov. {item?.provinsi}
        </div>
      </td>
      <td className="w-28">
        <Actions
          modalDelete={() => setShowModalDelete(item?._id)}
          modalView={() => setShowModalView(item?._id)}
          id={item?._id}
        />
        {showModalDelete === item?._id && <AddressModalDelete onClose={onClose} item={item} />}
        {showModalView === item?._id && <AddressModalView onClose={onClose} item={item} />}
      </td>
    </tr>
  );
};
AddressItems.propTypes;

export default AddressItems;
