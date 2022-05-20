import { Box, Container, Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import React from "react";
import Link from "next/link";
import { CategorySelect } from "../CategorySelect";
import { HeaderProps } from "./Header.types";
import { useRouter } from "next/router";
import { CategoryColors } from "../CategorySelect/CategorySelect.types";

const Header: React.FC<HeaderProps> = ({ tags, slug }) => {
  const router = useRouter();

  const handleChangeCategory = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  const getSelectValue = () => {
    if (!slug) {
      return undefined;
    }

    const match = tags.filter((tag) => tag.name.toLowerCase() === slug);
    const name = match[0].name;
    const value = name.toLocaleLowerCase();

    return {
      label: name,
      value,
      color: CategoryColors[value as keyof typeof CategoryColors],
    };
  };

  const value = getSelectValue();

  return (
    <Box as="header" mb={20} mt={10}>
      <Container maxW="container.md">
        <Box display="inline-block">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </Box>
        <Flex justifyContent="space-between">
          <Box mt={2} color="lightGray">
            Almost everyday web dev journal
          </Box>
          <CategorySelect
            items={tags}
            onChange={handleChangeCategory}
            value={value}
            placeholder="Select the category..."
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
