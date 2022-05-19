import type { NextPage } from "next";

import { Storyblok } from "../lib/storyblok";
import DynamicComponent from "../components/storyblok/DynamicComponent";
import { PostList } from "../components/PostList";
import { Container } from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { PER_PAGE } from "../components/Pagination/Pagination";
import DefaultLayout from "../components/layouts/default";
import { StoryblokTag } from "../components/CategorySelect/CategorySelect.types";
import Head from "next/head";

interface HomePageProps {
  page: any;
  posts: any;
  currentPage: string;
  totalPosts: string;
  tags: Array<StoryblokTag>;
}

const Home: NextPage<HomePageProps> = ({
  page,
  posts,
  currentPage,
  totalPosts,
  tags,
}) => {
  return (
    <DefaultLayout selectOptions={tags}>
      <Head>
        <title>Webgrower.ru</title>
        <meta name="description" content="Almost everyday web dev journal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <Container maxW="container.md">
          {page && <DynamicComponent blok={page.content} />}
          <PostList items={posts.stories} />
          <Pagination
            currentPage={parseInt(currentPage, 10)}
            totalPosts={parseInt(totalPosts, 10)}
          />
        </Container>
      </main>
    </DefaultLayout>
  );
};

export default Home;

export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";

  let sbParams = {
    version: "published",
  };

  let { data: page } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);
  let { data: tagsList } = await Storyblok.get("cdn/tags/");

  let { data: posts, total } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    per_page: PER_PAGE,
    page: 1,
  });

  return {
    props: {
      page: page ? page.story : false,
      posts,
      key: page ? page.story.id : false,
      currentPage: 1,
      totalPosts: total,
      tags: tagsList.tags,
    },
    revalidate: 3600, // revalidate every hour
  };
}
