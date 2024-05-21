import { useEffect, useState } from "react";
import { Input, Label, Select, Textarea } from "../../components/Tags";
import { useGetAddressByIdQuery, useUpdateAddressMutation } from "../../app/api/addressApiSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AddressUpdate = () => {
  const { id } = useParams();
  const { data } = useGetAddressByIdQuery(id);

  const [provId, setProvId] = useState(12);
  const [kabId, setKabId] = useState("");
  const [kecId, setKecId] = useState("");

  const [provList, setProvList] = useState([]);
  const [kabList, setKabList] = useState([]);
  const [kecList, setKecList] = useState([]);
  const [kelList, setKelList] = useState([]);

  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProvId(data?.provinsi?.split("-")[0]);
      setKabId(data?.kabupaten?.split("-")[0]);
      setKecId(data?.kecamatan?.split("-")[0]);
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      setName(data?.name);
      setDetail(data?.detail);
      setProvinsi(data?.provinsi);
      setKabupaten(data?.kabupaten);
      setKecamatan(data?.kecamatan);
      setKelurahan(data?.kelurahan);
    }
  }, [data]);

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
    setProvinsi(e.target.value);
    setProvId(e.target.value.split("-")[0]);
  };
  const handleChangeKabupaten = (e) => {
    setKabupaten(e.target.value);
    setKabId(e.target.value.split("-")[0]);
  };
  const handleChangeKecamatan = (e) => {
    setKecamatan(e.target.value);
    setKecId(e.target.value.split("-")[0]);
  };
  const handleChangeKelurahan = (e) => {
    setKelurahan(e.target.value);
  };

  const [updateAddress] = useUpdateAddressMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { id, name, provinsi, kabupaten, kecamatan, kelurahan, detail };
    updateAddress(data)
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
      <div>Update Address</div>
      <form onSubmit={handleSubmit}>
        <Label id="name">name</Label>
        <Input id="name" autoFocus={true} value={name} onChange={(e) => setName(e.target.value)} />
        <Label id="provinsi">provinsi</Label>
        <Select id="provinsi" value={provinsi} onChange={handleChangeProvinsi}>
          <option value="">select provinsi</option>
          {provList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kabupaten">kabupaten</Label>
        <Select id="kabupaten" value={kabupaten} onChange={handleChangeKabupaten}>
          <option value="">select kabupaten</option>
          {kabList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kecamatan">kecamatan</Label>
        <Select id="kecamatan" value={kecamatan} onChange={handleChangeKecamatan}>
          <option value="">select kecamatan</option>
          {kecList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="kelurahan">kelurahan</Label>
        <Select id="kelurahan" value={kelurahan} onChange={handleChangeKelurahan}>
          <option value="">select kelurahan</option>
          {kelList.map((item) => (
            <option key={item?.id} value={`${item.id}-${item.name}`}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="detail">detail</Label>
        <Textarea id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} />
        <button type="submit" className="bg-cyan-500 p-2 px-3 rounded text-white hover:opacity-70">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressUpdate;
