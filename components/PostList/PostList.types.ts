import {PostProps} from "../Post/Post.types";
import {CategoryColors} from '../CategorySelect/CategorySelect.types';

export type PostListItem = {
    content: PostProps;
    created_at: Date;
    tag_list: Array<keyof typeof CategoryColors>;
    slug: string;
};

export interface PostListProps {
    items: Array<PostListItem>
}