import {Box, Container, Link} from "@chakra-ui/react"
import NextLink from "next/link";
import React from "react";
import {Logo} from "../Logo";

const Footer: React.FC = () => {
    return (
        <Box as="footer" mt={20} mb={10}>
            <Container maxW="container.md">
                <Box textAlign="center" mb={4}><NextLink href="/"><a><Logo fontSize="3xl"/></a></NextLink></Box>
                <Box color="lightGray" fontSize="sm" textAlign="center">&copy; {new Date().getFullYear()} Webgrower.
                    Made with ❤️, <Link
                        href="https://nextjs.org/" color="gray.800">Next.js</Link>,
                    <Link href="https://chakra-ui.com/" color="gray.800">Chakra UI</Link> and <Link
                        href="https://www.storyblok.com/" color="gray.800">Storyblok</Link>.</Box>
            </Container>
        </Box>
    )
}

export default Footer;