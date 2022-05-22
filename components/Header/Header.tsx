import { Box, Container, Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import React from "react";
import Link from "next/link";
import { CategorySelect } from "../CategorySelect";
import { HeaderProps } from "./Header.types";
import { useRouter } from "next/router";

const Header: React.FC<HeaderProps> = ({ categories, slug }) => {
  const router = useRouter();

  const handleChangeCategory = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  const getSelectValue = () => {
    if (!slug) {
      return undefined;
    }

    return categories.filter((category) => category.value === slug)[0];
  };

  const value = getSelectValue();

  return (
    <Box as="header" mb={20} mt={10}>
      <Container
        maxW="container.md"
        textAlign={{ base: "center", md: "initial" }}
      >
        <Box display="inline-block">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </Box>
        <Flex
          justifyContent="space-between"
          flexFlow={{ base: "column", md: "row" }}
          width={{ base: 267, md: "100%" }}
          margin={{ base: "0 auto" }}
        >
          <Box mt={2} color="lightGray">
            Almost everyday web dev journal
          </Box>
          <Box mt={{ base: 5, md: 0 }}>
            <CategorySelect
              items={categories}
              onChange={handleChangeCategory}
              value={value}
              placeholder="Select the category..."
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
