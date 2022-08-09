import { Badge, Group, Title } from "@mantine/core";
import React from "react";

const Post = (props) => {
  const article = props.article;
  return (
    <div>
      <Group>
        <Title order={1} sx={{ padding: "2rem" }}>
          {article.title}
        </Title>
        <Badge>{article.category.name}</Badge>
      </Group>
      <Group position="center">
        <div
          dangerouslySetInnerHTML={{
            __html: `${article.body}`,
          }}
        />
      </Group>
    </div>
  );
};

export default Post;
