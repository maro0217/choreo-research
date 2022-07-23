import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { client } from '../libs/client';
import Link from "next/link";

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
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}