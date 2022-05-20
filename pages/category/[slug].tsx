import type { NextPage } from "next";

import { Storyblok } from "../../lib/storyblok";
import { PostList } from "../../components/PostList";
import { Container } from "@chakra-ui/react";
import { Pagination } from "../../components/Pagination";
import { PER_PAGE } from "../../components/Pagination/Pagination";
import DefaultLayout from "../../components/layouts/default";
import { StoryblokTag } from "../../components/CategorySelect/CategorySelect.types";
import Head from 'next/head';

interface PageProps {
  posts: any;
  currentPage: string;
  totalPosts: string;
  tags: Array<StoryblokTag>;
  slug: string;
}

const Page: NextPage<PageProps> = ({
  posts,
  currentPage,
  totalPosts,
  tags,
  slug,
}) => {
  const currentTag = tags.filter(tag => tag.name.toLowerCase() === slug);
  const categoryTitle = currentTag[0].name;

  return (
    <DefaultLayout selectOptions={tags} slug={slug}>
      <Head>
        <title>{categoryTitle} – Webgrower.ru</title>
        <meta name="description" content="Almost everyday web dev journal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header>
        <Container maxW="container.md"></Container>
      </header>

      <main>
        <Container maxW="container.md">
          <PostList items={posts.stories} />
          <Pagination
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
  const { slug } = params;

  let { data: posts, total } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    with_tag: slug,
    per_page: PER_PAGE,
    page: 1,
  });

  let { data: tagsList } = await Storyblok.get("cdn/tags/");

  return {
    props: {
      posts,
      key: slug,
      currentPage: 1,
      totalPosts: total,
      tags: tagsList.tags,
      slug,
    },
    revalidate: 3600, // revalidate every hour
  };
}

export const getStaticPaths = async () => {
  let { data } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    per_page: PER_PAGE,
  });

  const buildPaths = (story: any) => {
    return {
      params: {
        slug: story.tag_list[0].toLowerCase(),
      },
    };
  };

  return {
    paths: data.stories.map(buildPaths),
    fallback: false,
  };
};
