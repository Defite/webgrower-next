import type { NextPage } from "next";

import { Storyblok } from "../../lib/storyblok";
import { PostList } from "../../components/PostList";
import { Container } from "@chakra-ui/react";
import { Pagination } from "../../components/Pagination";
import { PER_PAGE } from "../../components/Pagination/Pagination";
import DefaultLayout from "../../components/layouts/default";
import Head from "next/head";
import { PageProps, Post, PostCategory } from "../../types";
import { useCategorySelect } from "../../components/CategorySelect/CategorySelect.utils";

const Page: NextPage<PageProps> = ({
  posts,
  currentPage,
  totalPosts,
  categories,
}) => {
  const categoriesOptions = useCategorySelect(categories);

  return (
    <DefaultLayout selectOptions={categoriesOptions}>
      <Head>
        <title>Webgrower.ru</title>
        <meta name="description" content="Almost everyday web dev journal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header>
        <Container maxW="container.md"></Container>
      </header>

      <main>
        <Container maxW="container.md">
          <PostList items={posts} />
          <Pagination
            url="page"
            firstPage="home"
            currentPage={parseInt(currentPage, 10)}
            totalPosts={parseInt(totalPosts, 10)}
          />
        </Container>
      </main>

      <footer></footer>
    </DefaultLayout>
  );
};

export default Page;

export async function getStaticProps({ params }: any) {
  const { id } = params;

  let { data: posts, total } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    per_page: PER_PAGE,
    page: id,
  });

  let { data: categories } = await Storyblok.get("cdn/stories/", {
    starts_with: "category",
  });

  const postsWithCategories = posts.stories.map((post: Post) => {
    const category = categories.stories.filter(
      (categoryItem: PostCategory) =>
        categoryItem.uuid === post.content.category
    )[0];

    return {
      ...post,
      content: {
        ...post.content,
        category,
      },
    };
  });

  return {
    props: {
      posts: postsWithCategories,
      key: id,
      currentPage: id,
      totalPosts: total,
      categories: categories.stories,
    },
    revalidate: 3600, // revalidate every hour
  };
}

export const getStaticPaths = async () => {
  let { headers } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    per_page: PER_PAGE,
  });

  const total = parseInt(headers.total, 10);

  const buildPaths = (_: unknown, index: number) => {
    return {
      params: {
        id: (index + 1).toString(),
      },
    };
  };

  return {
    paths: [...Array(total)].map(buildPaths),
    fallback: false,
  };
};
