import { Heading } from "src/components/Heading";
import { Posts } from "src/components/Posts";
import { GetStaticProps, NextPage } from "next";
import { Article } from "src/types/article";
import { client } from "src/libs/client";
import { Category } from "src/types/category";

type Props = {
  articles: Article[];
  categories: Category[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articleData = await client.get({
    endpoint: "articles",
  });

  const categoryData = await client.get({
    endpoint: "category",
  });

  return {
    props: {
      articles: articleData.contents,
      categories: categoryData.contents,
    },
  };
};



const Home: NextPage<Props> = (props) => {

  return (
    <div>
      <Heading categories={props.categories}/>
      <Posts articles={props.articles}/>
    </div>
  );
}

export default Home;