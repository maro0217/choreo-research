import { Badge, Group, Title } from "@mantine/core";
import React from "react";

const Post = (props) => {
  const blog = props.blog;
  return (
    <div>
      <Group>
        <Title order={1} sx={{ padding: "2rem" }}>
          {blog.title}
        </Title>
        <Badge>{blog.category.name}</Badge>
      </Group>
      <Group position="center">
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </Group>
    </div>
  );
};

export default Post;
