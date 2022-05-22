import type { NextPage } from "next";

import { Storyblok } from "../lib/storyblok";
import { PostList } from "../components/PostList";
import { Container } from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { PER_PAGE } from "../components/Pagination/Pagination";
import DefaultLayout from "../components/layouts/default";
import Head from "next/head";
import {HomePageProps, PostCategory, Post} from '../types';
import { useCategorySelect } from "../components/CategorySelect/CategorySelect.utils";

const HomePage: NextPage<HomePageProps> = ({
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

      <main>
        <Container maxW="container.md">
          <PostList items={posts} />
          <Pagination
            url="page"
            currentPage={parseInt(currentPage, 10)}
            totalPosts={parseInt(totalPosts, 10)}
          />
        </Container>
      </main>
    </DefaultLayout>
  );
};

export default HomePage;

export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";

  let sbParams = {
    version: "published",
  };

  let { data: page } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);

  let { data: posts, total } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    per_page: PER_PAGE,
    page: 1,
  });
  let { data: categories } = await Storyblok.get("cdn/stories/", {
    starts_with: "category",
  });

  const postsWithCategories = posts.stories.map((post: Post) => {
    const category = categories.stories.filter(
      (categoryItem: PostCategory) => categoryItem.uuid === post.content.category
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
      page: page ? page.story : false,
      posts: postsWithCategories,
      key: page ? page.story.id : false,
      currentPage: 1,
      totalPosts: total,
      categories: categories.stories,
    },
    revalidate: 3600, // revalidate every hour
  };
}
