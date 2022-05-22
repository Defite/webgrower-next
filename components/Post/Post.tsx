import { PostProps } from "./Post.types";
import { Box, Link, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";

import { convertDate } from "../../helpers/date";
import NextLink from "next/link";
import React from "react";
import { CategoryColors } from "../CategorySelect/CategorySelect.types";

const Post: React.FC<PostProps> = ({
  title,
  image,
  intro,
  date,
  category,
  slug,
}) => {
  const postDate = convertDate(date);
  const categoryContent = category.content;

  return (
    <Box
      as="article"
      width="100%"
      pl={{ base: 0, md: "148px" }}
      position="relative"
    >
      <Box>
        <Box mb={4} display="inline-block" mr={5}>
          <Tag
            fontWeight={700}
            color="white"
            bgColor={CategoryColors[category.slug]}
          >
            {categoryContent.title.toUpperCase()}
          </Tag>
        </Box>
        <Box
          color="lightGray"
          position={{ base: "relative", md: "absolute" }}
          display="inline-block"
          top="0"
          left="0"
        >
          <time dateTime={postDate}>{postDate}</time>
        </Box>
      </Box>

      <Text
        as="h1"
        mb={6}
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight={700}
        lineHeight={1.2}
      >
        {title}
      </Text>

      <Box borderRadius={5} overflow="hidden" position="relative">
        <Image
          src={`https:${image}`}
          layout="responsive"
          width={600}
          height={350}
          objectFit="cover"
          alt={title}
        />
      </Box>

      <Box mt={5}>
        <Text fontSize={{ base: "md", md: "lg" }}>{intro}</Text>
      </Box>

      <Box mt={5}>
        <NextLink href={`/${category.slug}/${slug}`}>
          <Link fontWeight={400} color="green.600" fontSize="lg">
            Read more
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export default Post;
