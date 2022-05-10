import {Post} from "../Post";
import {PostListItem, PostListProps} from "./PostList.types";
import React from "react";
import {VStack} from "@chakra-ui/react";

const PostList: React.FC<PostListProps> = ({items}) => {
    if (!items || !items.length) {
        return null;
    }

    const renderItem = (item: PostListItem) => <Post key={item.content._uid} {...item.content} date={item.created_at}
                                                     category={item.tag_list[0]} slug={item.slug}/>

    return <VStack spacing={20}>{items.map(renderItem)}</VStack>;
}

export default PostList