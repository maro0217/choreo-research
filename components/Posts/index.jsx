import {
  Badge,
  Card,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

export const Posts = (props) => {
  const theme = useMantineTheme();
  // if (props.isLoading) {
  //   return <Loader/>
  // }

  const contents = () => {
    if (props.search) {
      return props.search;
    } else if (props.select) {
      return props.select;
    } else {
      return props.bodies;
    }
  };

  return (
    <div>
      <SimpleGrid cols={3} sx={{ padding: "2rem" }}>
        {contents().map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card
              sx={{
                backgroundColor: theme.colors.blue[1],
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              shadow="sm"
              p="lg"
            >
              <Card.Section component="a" target="_blank"></Card.Section>
              <Text weight={800}>{blog.title}</Text>
              <Badge>{blog.category.name}</Badge>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
};
