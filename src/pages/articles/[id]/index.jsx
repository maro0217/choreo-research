import Post from "src/components/Post";
import { client } from "src/libs/client";

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "articles" });

  const paths = data.contents.map((content) => `/articles/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "articles", contentId: id });

  return {
    props: {
      article: data,
    },
  };
};

export default function PostsId({ article }) {
  return (
    <div>
      <Post article={article} />
    </div>
  );
}
