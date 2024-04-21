const ProductTable = ({ item, i }) => {
  return (
    <tr className="*:border *:p-1">
      <td>{i + 1}</td>
      <td>{item?.name}</td>
      <td>{item?.price}</td>
      <td>{item?.description}</td>
      <td>{item?.tags}</td>
      <td>{item?.category}</td>
    </tr>
  );
};
ProductTable.propTypes;

export default ProductTable;
