import { PostProps } from "../Post/Post.types";
import { CategoryColors } from "../CategorySelect/CategorySelect.types";

export type PostListItem = {
  content: PostProps;
  created_at: Date;
  slug: string;
  category: {
    content: {
      title: string;
      slug: keyof typeof CategoryColors;
    };
  };
};

export interface PostListProps {
  items: Array<PostListItem>;
}
