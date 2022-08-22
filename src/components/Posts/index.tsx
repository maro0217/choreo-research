import { Badge, Card, Image, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";
import { useSearch } from "src/state/search";
import { Article } from "src/types/article";


type Props = {
  articles: Article[]
}

export const Posts: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const { search, select } = useSearch();
  const contentsFilter = () => {
    if (search.length !== 0) {
      return search;
    } else if (select.length !== 0) {
      return select;
    } else {
      return props.articles;
    }
  };
  return (
    <div>
      <SimpleGrid cols={3} sx={{ padding: "2rem" }}>
        {contentsFilter().map((article) => (
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
