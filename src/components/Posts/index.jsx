import { Badge, Card, Image, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
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
        {contents().map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card
              sx={{
                backgroundColor: theme.colors.blue[1],
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              radius="md"
              shadow="sm"
              p="lg"
              withBorder
            >
              <Card.Section>
                <Image
                  src={article.thumbnail.url}
                  height={160}
                  alt={article.caption}
                />
              </Card.Section>
                <Text
                   weight={500}
                   mt="md"
                >
                  {article.title}
                </Text>
                <Text
                   size="sm"
                >
                  {article.choreographer}
                </Text>
                <Badge 
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  variant="light"
                  mb="xs"
                >
                  {article.category.name}
                </Badge>
              <Text size="sm" color="dimmed">
                {article.caption}
              </Text>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
};
