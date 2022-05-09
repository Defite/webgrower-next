import React from "react";
import {Box, Button, Grid, GridItem} from "@chakra-ui/react";
import NextLink from "next/link";
import {PaginationProps} from "./Pagination.types";

export const PER_PAGE = 5;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPosts }) => {
    const totalPages = Math.floor(totalPosts / PER_PAGE);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const buildPrevLink = currentPage === 2 ? `/` : `/page/${currentPage - 1}`

    if (!totalPages) {
        return null
    }

    return (
        <Box>
            <Grid templateColumns='repeat(2, 1fr)' width="100%" maxW={600} float="right" flex={2} mt={20}>
                <GridItem textAlign="left">
                    {!isFirstPage &&<NextLink href={buildPrevLink} passHref>
                        <Button variant="outline" borderRadius="999em">&larr; Prev</Button>
                    </NextLink>}
                </GridItem>
                <GridItem textAlign="right">
                    {!isLastPage &&<NextLink href={`/page/${currentPage + 1}`} passHref>
                        <Button variant="outline" borderRadius="999em">Next &rarr;</Button>
                    </NextLink>}
                </GridItem>

            </Grid>
        </Box>
    )
}

export default Pagination;