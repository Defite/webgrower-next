import { CategoryColors } from "./components/CategorySelect/CategorySelect.types";

export interface HomePageProps {
  page: any;
  posts: any;
  currentPage: string;
  totalPosts: string;
  categories: Array<PostCategory>;
}

export interface PostPageProps {
  post: {
    created_at: string;
    content: {
      title: string;
      image: string;
      long_text: string;
    };
  };
  currentCategory: {
    title: string;
    slug: keyof typeof CategoryColors;
  };
  categories: Array<PostCategory>;
}

export interface CategoryPageProps {
  posts: any;
  currentPage: string;
  totalPosts: string;
  categories: Array<PostCategory>;
  slug: string;
  currentCategory: {
    title: string;
    slug: keyof typeof CategoryColors;
  };
}

export interface PostCategory {
  uuid: string;
  content: {
    title: string;
    slug: keyof typeof CategoryColors;
  };
}

export interface PageProps {
  posts: any;
  currentPage: string;
  totalPosts: string;
  categories: Array<PostCategory>;
}

export interface Post {
  content: {
    category: string;
  };
}
