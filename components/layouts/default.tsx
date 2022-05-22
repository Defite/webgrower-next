import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { PostCategory } from "../../types";
import { ColourOption } from "../CategorySelect/CategorySelect.types";

interface DefaultLayoutProps {
  children: React.ReactNode;
  selectOptions: Array<ColourOption>;
  slug?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  selectOptions,
  slug,
}) => {
  return (
    <>
      <Header categories={selectOptions} slug={slug} />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
