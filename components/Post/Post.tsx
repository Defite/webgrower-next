import {PostProps} from "./Post.types";
import {Box, Link, Tag, Text} from "@chakra-ui/react";
import Image from 'next/image';

import {convertDate} from "../../helpers/date";
import NextLink from "next/link";
import React from "react";

const Post: React.FC<PostProps> = ({title, image, intro, date, category}) => {
    const postDate = convertDate(date);

    return (
        <Box as="article" display="flex" width="100%" alignContent="flex-start">
            <Box as="aside" maxW="180px" flex={1}>
                <Box color="lightGray">
                    <time dateTime={postDate}>{postDate}</time>
                </Box>
            </Box>
            <Box flex={2}>
                <Box mb={4}>
                    <Tag fontWeight={700}>{category.toUpperCase()}</Tag>
                </Box>

                <Text as="h1" mb={6} fontSize="4xl" fontWeight={700} lineHeight={1.2}>{title}</Text>

                <Box borderRadius={5} overflow="hidden" width={600} height={350} position="relative">
                    <Image src={`https:${image}`} layout="fill" objectFit="cover" alt={title}/>
                </Box>

                <Box mt={5}>
                    <Text fontSize="lg">{intro}</Text>
                </Box>

                <Box mt={5}>
                    <NextLink href={`/posts/`}><Link fontWeight={400} color="green.600" fontSize="lg">Read more</Link></NextLink>
                </Box>
            </Box>
        </Box>
    )
}

export default Post;
