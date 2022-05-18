import { CategoryColors } from "../CategorySelect/CategorySelect.types";

export interface PostProps {
    image: string;
    intro: string;
    title: string;
    _uid: string;
    date: Date;
    category: keyof typeof CategoryColors;
    slug: string;
}