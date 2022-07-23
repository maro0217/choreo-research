import { useForm } from '@mantine/form';
import { Box, TextInput, Button, Group } from '@mantine/core';
import { client } from '../libs/client';
import Link from "next/link";
import { useState } from 'react';


export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: 'blog',
  })

  return {
    props: {
      blog: data.contents
    },
  };
};

  export default function Home({ blog }) {
    const [search, setSearch] = useState({});
    
    const form = useForm({
      initialValues: { name: ''}
    });

    const handleSubmit = async(e) => {
      const q = e.name;
      const data = await fetch("/api/search", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ q }),
      });
      const json = await data.json();
      
      setSearch(json)
    }

    console.log(search);

    const contents = search ? search : blog;

  return (
    <div>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>

      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}, {blog.genre}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}