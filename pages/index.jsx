import { client } from "libs/client";
import { useState } from "react";
import { Heading } from "components/Heading";
import { Posts } from "components/Posts";

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

export default function Home({ bodies, categories }) {
  const [search, setSearch] = useState();
  const [select, setSelect] = useState();
  const handleSubmit = async (e) => {
    const q = e.name;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json = await data.json();
    setSearch(json.contents);
  };

  const categorySubmit = async (e) => {
    console.log(e);
    const obj = categories.filter((data) => data.name === e.genre);
    const id = obj[0].id;
    const data = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await data.json();
    setSelect(json.contents);
  };

  return (
    <div>
      <Heading
        categorySubmit={categorySubmit}
        handleSubmit={handleSubmit}
        categories={categories}
      ></Heading>
      <Posts bodies={bodies} select={select} search={search}></Posts>
    </div>
  );
}
