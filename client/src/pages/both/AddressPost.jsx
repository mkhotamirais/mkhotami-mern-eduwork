import { useEffect, useState } from "react";
import { Input, Label, Select, Textarea } from "../../components/Tags";
import { usePostAddressMutation } from "../../app/api/addressApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressPost = () => {
  const [provList, setProvList] = useState([]);
  const [kabList, setKabList] = useState([]);
  const [kecList, setKecList] = useState([]);
  const [kelList, setKelList] = useState([]);

  const [provId, setProvId] = useState("");
  const [kabId, setKabId] = useState("");
  const [kecId, setKecId] = useState("");

  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((r) => r.json())
      .then((prov) => setProvList(prov));
  }, []);
  useEffect(() => {
    if (provId && provId !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`)
        .then((r) => r.json())
        .then((kab) => setKabList(kab));
    } else {
      setKabList([]);
      setKecList([]);
      setKelList([]);
    }
  }, [provId]);
  useEffect(() => {
    if (kabId && kabId !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabId}.json`)
        .then((r) => r.json())
        .then((kec) => setKecList(kec));
    } else {
      setKecList([]);
      setKelList([]);
    }
  }, [kabId]);
  useEffect(() => {
    if (kecId && kecId !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecId}.json`)
        .then((r) => r.json())
        .then((kel) => setKelList(kel));
    } else setKelList([]);
  }, [kecId]);

  const handleChangeProvinsi = (e) => {
    setProvinsi(e.target.value.split("-")[1]);
    setProvId(e.target.value.split("-")[0]);
  };
  const handleChangeKabupaten = (e) => {
    setKabupaten(e.target.value.split("-")[1]);
    setKabId(e.target.value.split("-")[0]);
  };
  const handleChangeKecamatan = (e) => {
    setKecamatan(e.target.value.split("-")[1]);
    setKecId(e.target.value.split("-")[0]);
  };
  const handleChangeKelurahan = (e) => {
    setKelurahan(e.target.value.split("-")[1]);
  };

  const [postAddress] = usePostAddressMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, provinsi, kabupaten, kecamatan, kelurahan, detail };
    postAddress(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label id="name">name</Label>
        <Input id="name" onChange={(e) => setName(e.target.value)} />
        <Label id="provinsi">provinsi</Label>
        <Select id="provinsi" onChange={handleChangeProvinsi}>
          <option value="">select provinsi</option>
          {provList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kabupaten">kabupaten</Label>
        <Select id="kabupaten" onChange={handleChangeKabupaten}>
          <option value="">select kabupaten</option>
          {kabList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kecamatan">kecamatan</Label>
        <Select id="kecamatan" onChange={handleChangeKecamatan}>
          <option value="">select kecamatan</option>
          {kecList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kelurahan">kelurahan</Label>
        <Select id="kelurahan" onChange={handleChangeKelurahan}>
          <option value="">select kelurahan</option>
          {kelList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="detail">detail</Label>
        <Textarea id="detail" onChange={(e) => setDetail(e.target.value)} />
        <button type="submit" className="bg-cyan-500 p-2 px-3 rounded text-white hover:opacity-70">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressPost;
