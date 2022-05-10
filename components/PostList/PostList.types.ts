import {PostProps} from "../Post/Post.types";

export type PostListItem = {
    content: PostProps;
    created_at: Date;
    tag_list: Array<string>;
    slug: string;
};

export interface PostListProps {
    items: Array<PostListItem>
}