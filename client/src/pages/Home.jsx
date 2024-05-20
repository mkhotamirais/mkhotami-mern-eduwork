import { useGetMeQuery } from "../app/api/authApiSlice";
import { Section } from "../components/Tags";

const Home = () => {
  const { data } = useGetMeQuery();

  return (
    <Section>
      Home{" "}
      <i>
        <b>{data && data?.username}</b>
      </i>
    </Section>
  );
};

export default Home;
