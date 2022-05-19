import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { StoryblokTag } from "../CategorySelect/CategorySelect.types";

interface DefaultLayoutProps {
  children: React.ReactNode;
  selectOptions: Array<StoryblokTag>;
  slug?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  selectOptions,
  slug,
}) => {
  return (
    <>
      <Header tags={selectOptions} slug={slug} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
