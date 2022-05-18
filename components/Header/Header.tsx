import { Box, Container, Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import React from "react";
import Link from "next/link";
import { CategorySelect } from "../CategorySelect";
import { HeaderProps } from "./Header.types";
import { useRouter } from "next/router";

const Header: React.FC<HeaderProps> = ({ tags }) => {
  const router = useRouter();

  const handleChangeCategory = (slug: string) => {
    router.push(`/category/${slug}`);
  };

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
          <CategorySelect items={tags} onChange={handleChangeCategory} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
