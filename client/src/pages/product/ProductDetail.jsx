import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../app/api/productApiSlice";
import { Figure, H2, Section } from "../../components/Tags";
import moment from "moment";
import { Badge } from "../../components/Components";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: item } = useGetProductByIdQuery(id);
  return (
    <Section>
      <H2>Detail {item?.name}</H2>
      <div>
        <Figure src={item?.imageUrl} alt={item?.imageName || "no image"} height="h-56 sm:h-72" />
        <div>{item?.name}</div>
        <div>Rp{item?.price?.toLocaleString("id-ID")}</div>
        <div>{item?.description}</div>
        <div>Category : {item?.category?.name}</div>
        <div>
          <span>Tags : </span>
          <div className="inline-flex gap-1">
            {item?.tags.map((tag) => (
              <Badge key={tag?._id}>{tag?.name}</Badge>
            ))}
          </div>
        </div>
        <div>Created {moment(item?.createdAt).fromNow()}</div>
        <div>Updated {moment(item?.updatedAt).fromNow()}</div>
      </div>
    </Section>
  );
};

export default ProductDetail;
