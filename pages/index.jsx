import { useForm } from '@mantine/form';
import {TextInput, Header, createStyles, Select, Card, SimpleGrid, Text, useMantineTheme } from '@mantine/core';
import { client } from '../libs/client';
import Link from "next/link";
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    marginBottom: 50
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

}));


export const getStaticProps = async () => {
  const bodyData = await client.get({
    endpoint: 'blog',
  })

  const categoryData = await client.get({
    endpoint: 'category',
  })

  return {
    props: {
      bodies: bodyData.contents,
      categories: categoryData.contents
    },
  };
};

  export default function Home({ bodies, categories }) {
    const { classes } = useStyles();
    const form = useForm({
      initialValues: {
         name: '', 
         genre: ''
        }
    });
    const [search, setSearch] = useState();
    const [select, setSelect] = useState();

    const handleSubmit = async (e) => {
      console.log(JSON.stringify(e));
        const q = e.name;
        const data = await fetch("/api/search", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({ q }),
        });
        const json = await data.json();
        setSearch(json.contents)    
    }

    const categorySubmit = async (e) => {
        const id = categories.map((data) => {
          if (data.name === e.genre) {
            return data.id
          }
        })
        const data = await fetch("/api/category", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({ id }),
        });
        const json = await data.json();
        setSelect(json.contents)    
    }

    const contents = () => {
      if (search) {
        return search;
      } else if (select) {
        return select;
      } else {
        return bodies;
      }
    }
    const genre = categories.map((category) => category.name)
    const theme = useMantineTheme();
  return (
    <div>
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                  className={classes.input} 
                  placeholder="どんなコレオをお探しですか？" 
                  {...form.getInputProps('name')} 
            />
        </form>
          <Select
                data={genre}
                searchable
                placeholder="お探しのスタイルはどれですか？"
                {...form.getInputProps('genre')}
                
          /> 


    </div>
    </Header>

      
    <SimpleGrid cols={3}>
        {contents().map((blog) => (
          <Link  key={blog.id}  href={`/blog/${blog.id}`}>
                <Card
                  sx={{
                    backgroundColor: theme.colors.blue[1]
                  }}
                  shadow="sm"
                  p="lg"
                >
                <Card.Section component="a" target="_blank">

                </Card.Section>
                <Text  weight={800} >{blog.title}</Text>
                <a>{blog.category.name}</a>
                </Card>
          </Link>
        ))}
    </SimpleGrid> 
      
    </div>
  );
}