import { client } from "src/libs/client";
import { useState } from "react";
import { Heading } from "src/components/Heading";
import { Posts } from "src/components/Posts";

export const getStaticProps = async () => {
  const bodyData = await client.get({
    endpoint: "articles",
  });

  const categoryData = await client.get({
    endpoint: "category",
  });

  return {
    props: {
      bodies: bodyData.contents,
      categories: categoryData.contents,
    },
  };
};

const Home = ({ bodies, categories }) => {
  const [search, setSearch] = useState();
  const [select, setSelect] = useState();

  return (
    <div>
      <Heading
        search={search}
        setSearch={setSearch}
        select={select}
        setSelect={setSelect}
        categories={categories}
      ></Heading>
      <Posts bodies={bodies} select={select} search={search}></Posts>
    </div>
  );
}

export default Home;