import {Box, Container} from "@chakra-ui/react"
import {Logo} from "../Logo";
import React from "react";

const Header: React.FC = () => {
    return (
        <Box as="header" mb={20} mt={10}>
            <Container maxW="container.md">
                <Logo />
                <Box mt={2} color="lightGray">Almost everyday web dev journal</Box>
            </Container>
        </Box>
    )
}

export default Header;