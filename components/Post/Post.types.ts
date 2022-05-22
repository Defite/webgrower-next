import { CategoryColors } from "../CategorySelect/CategorySelect.types";

export interface PostProps {
  image: string;
  intro: string;
  title: string;
  _uid: string;
  date: Date;
  category: {
    content: {
      title: string;
    };
    slug: keyof typeof CategoryColors;
  };
  slug: string;
}
