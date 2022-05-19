import type { NextPage } from "next";

import { Storyblok } from "../../lib/storyblok";
import { render } from "storyblok-rich-text-react-renderer-ts";
import { Box, Container, Tag, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { convertDate } from "../../helpers/date";
import DefaultLayout from "../../components/layouts/default";
import { StoryblokTag } from "../../components/CategorySelect/CategorySelect.types";
import Head from "next/head";

interface PostProps {
  post: any;
  tags: Array<StoryblokTag>;
}

const PostPage: NextPage<PostProps> = ({ post, tags }) => {
  const { created_at, tag_list } = post;
  const { title, image } = post.content;
  const date = convertDate(created_at);

  return (
    <DefaultLayout selectOptions={tags}>
      <Head>
        <title>{title} – Webgrower.ru</title>
        <meta name="description" content="Almost everyday web dev journal" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <Container maxW="container.md">
          <Text
            as="h1"
            mb={6}
            fontSize="4.5xl"
            fontWeight={700}
            lineHeight={1.2}
          >
            {title}
          </Text>

          <Box display="flex" mb={8}>
            <Box mr={4}>
              <Tag fontWeight={700}>{tag_list[0].toUpperCase()}</Tag>
            </Box>
            <Box color="lightGray">
              <time dateTime={date}>{date}</time>
            </Box>
          </Box>

          <Box
            borderRadius={5}
            overflow="hidden"
            width="100%"
            height={350}
            position="relative"
            mb={8}
          >
            <Image
              src={`https:${image}`}
              layout="fill"
              objectFit="cover"
              alt={title}
            />
          </Box>

          <Box fontSize="lg">{render(post.content.long_text)}</Box>
        </Container>
      </main>
    </DefaultLayout>
  );
};

export default PostPage;

export async function getStaticProps({ params }: any) {
  let sbParams = {
    version: "published",
  };

  let { data: post } = await Storyblok.get(
    `cdn/stories/posts/${params.slug}`,
    sbParams
  );
  let { data: tagsList } = await Storyblok.get("cdn/tags/");

  return {
    props: {
      post: post.story,
      key: post ? post.story.id : false,
      tags: tagsList.tags,
    },
    revalidate: 3600, // revalidate every hour
  };
}

export async function getStaticPaths() {
  let { data } = await Storyblok.get("cdn/stories/", {
    starts_with: "posts",
  });

  const buildPaths = (story: any) => {
    return {
      params: {
        categorySlug: story.tag_list[0].toLowerCase(),
        slug: story.slug,
      },
    };
  };

  return {
    paths: data.stories.map(buildPaths),
    fallback: false,
  };
}
