import moment from "moment";

const AdmProductCard = ({ item }) => {
  return (
    <div className="border rounded p-3">
      <div>{item?._id}</div>
      <figure>
        <img src={item?.imageUrl} alt={item.imageName} />
      </figure>
      <div>{item?.name}</div>
      <div>Created {moment(item?.createdAt).fromNow()}</div>
      <div>Updated {moment(item?.updatedAt).fromNow()}</div>
    </div>
  );
};
AdmProductCard.propTypes;

export default AdmProductCard;
