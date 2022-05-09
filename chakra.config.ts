import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {
        heading: 'Inter, Helvetica, sans-serif',
        body: 'Inter, Helvetica, sans-serif',
        logo: 'Rubik, sans-serif'
    },
    colors: {
        lightGray: '#757575'
    },
    sizes: {
        container: {
            sm: '640px',
            md: '780px',
            lg: '1024px',
            xl: '1280px',
        }
    }
})