import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from '../chakra.config'
import DefaultLayout from "../components/layouts/default";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default MyApp
