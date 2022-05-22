import type { NextPage } from "next";

import { Storyblok } from "../../../lib/storyblok";
import { PostList } from "../../../components/PostList";
import { Box, Container, Text } from "@chakra-ui/react";
import { Pagination } from "../../../components/Pagination";
import { PER_PAGE } from "../../../components/Pagination/Pagination";
import DefaultLayout from "../../../components/layouts/default";
import { CategoryColors } from "../../../components/CategorySelect/CategorySelect.types";
import Head from "next/head";
import { PostCategory, CategoryPageProps, Post } from "../../../types";
import { useCategorySelect } from "../../../components/CategorySelect/CategorySelect.utils";

const Page: NextPage<CategoryPageProps> = ({
  posts,
  currentPage,
  totalPosts,
  categories,
  currentCategory,
  slug,
}) => {
  const categoriesOptions = useCategorySelect(categories);

  return (
    <DefaultLayout selectOptions={categoriesOptions} slug={slug}>
      <Head>
        <title>{currentCategory.title} – Webgrower.ru</title>
        <meta name="description" content="Almost everyday web dev journal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header>
        <Container maxW="container.md">
          <Box borderBottom="1px solid #dfdfdf" pb={12}>
            <Box
              as="span"
              display="inline-block"
              width="16px"
              height="16px"
              borderRadius="10px"
              backgroundColor={
                CategoryColors[slug as keyof typeof CategoryColors]
              }
              marginRight={2}
            ></Box>
            <Text
              as="h1"
              display="inline-block"
              fontSize="2xl"
              fontWeight="700"
            >
              {currentCategory.title}
            </Text>
          </Box>
        </Container>
      </header>

      <main>
        <Container maxW="container.md" mt={16}>
          <PostList items={posts} />
          <Pagination
            url={`category/${slug}`}
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

  let { data: categories } = await Storyblok.get("cdn/stories/", {
    starts_with: "category",
  });

  const currentCategory = categories.stories.filter(
    (category: PostCategory) => category.content.slug === slug
  )[0];

  let { data: posts, total } = await Storyblok.get(`cdn/stories`, {
    starts_with: "posts",
    filter_query: {
      category: {
        in: currentCategory.uuid,
      },
    },
    per_page: PER_PAGE,
    page: 1,
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
      key: slug,
      currentPage: 1,
      totalPosts: total,
      slug,
      categories: categories.stories,
      currentCategory: {
        title: currentCategory.content.title,
        slug: currentCategory.content.slug,
      },
    },
    revalidate: 3600, // revalidate every hour
  };
}

export const getStaticPaths = async () => {
  let { data: categories } = await Storyblok.get("cdn/stories/", {
    starts_with: "category",
  });

  const buildPaths = (category: any) => {
    return {
      params: {
        slug: category.slug,
      },
    };
  };

  return {
    paths: categories.stories.map(buildPaths),
    fallback: false,
  };
};
