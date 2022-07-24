import { useForm } from '@mantine/form';
import {TextInput, Header, createStyles, Select } from '@mantine/core';
import { client } from '../libs/client';
import Link from "next/link";
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    width: 100
  }
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
        <form onSubmit={form.onSubmit(categorySubmit) }>
          <Select
                data={genre}
                searchable
                placeholder="お探しのスタイルはどれですか？"
                {...form.getInputProps('genre')}
                onSearchChange={categorySubmit}
          /> 
        </form>

    </div>
    </Header>

      <ul style={{listStyle:"none"}}>
        {contents().map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a className='flex'>{blog.title}, {blog.category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}