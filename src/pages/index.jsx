import { client } from "src/libs/client";
import { Posts } from "src/components/Posts";
import { Heading } from "src/components/Heading";
import { useState } from "react";
 
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


const Home= ({ bodies, categories }) => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  return (
    <div>
      <Heading
        select={select}
        setSelect={setSelect}
        search={search}
        setSearch={setSearch}
        categories={categories}
      ></Heading>
      <Posts bodies={bodies} select={select} search={search}></Posts>
    </div>
  );
}

export default Home;