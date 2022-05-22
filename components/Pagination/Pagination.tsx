import React from "react";
import { Button, Grid, GridItem, Container } from "@chakra-ui/react";
import NextLink from "next/link";
import { PaginationProps } from "./Pagination.types";

export const PER_PAGE = 5;

const Pagination: React.FC<PaginationProps> = ({
  url,
  currentPage,
  totalPosts,
  firstPage,
}) => {
  const totalPages = Math.floor(totalPosts / PER_PAGE);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const buildPrevLink =
    currentPage === 2
      ? firstPage === "home"
        ? `/`
        : `/${url}/`
      : `/${url}/${currentPage - 1}`;

  if (!totalPages) {
    return null;
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      flex={2}
      mt={20}
      ml={{ base: 0, md: "148px" }}
    >
      <GridItem textAlign="left">
        {!isFirstPage && (
          <NextLink href={buildPrevLink} passHref>
            <Button variant="outline" borderRadius="999em">
              &larr; Prev
            </Button>
          </NextLink>
        )}
      </GridItem>
      <GridItem textAlign="right">
        {!isLastPage && (
          <NextLink href={`/${url}/${currentPage + 1}`} passHref>
            <Button variant="outline" borderRadius="999em">
              Next &rarr;
            </Button>
          </NextLink>
        )}
      </GridItem>
    </Grid>
  );
};

export default Pagination;
