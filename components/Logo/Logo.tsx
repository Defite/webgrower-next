import {Box} from "@chakra-ui/react";
import {LogoProps} from "./Logo.types";
import React from "react";

const Logo: React.FC<LogoProps> = ({ fontSize = '5xl' }) => {
    return (
        <Box fontSize={fontSize} fontWeight={700} fontFamily="logo">
            <Box as="span" color="#529B03">Web</Box>
            <Box as="span" color="#333">Grower</Box>
        </Box>
    )
}
export default Logo;