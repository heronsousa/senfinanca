import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { FinancialTransactionsProvider } from '../context/FinancialTransactionsContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <FinancialTransactionsProvider>
                <Box background="#edf2f7" h="100vh" paddingTop="10">
                    <Component {...pageProps} />
                </Box>
            </FinancialTransactionsProvider>
        </ChakraProvider>
    )
}

export default MyApp
