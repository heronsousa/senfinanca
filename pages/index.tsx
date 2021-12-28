import { VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import FinancialTransactionsResume from '../components/FinancialTransactionsResume'
import FinancialTransactionsTable from '../components/FinancialTransactionsTable'

const Home: NextPage = () => {
  return (
    <>
        <Head>
            <title>SenFinança</title>
            <meta name="description" content="Controle financeiro pessoal" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <VStack
            maxW="1000" 
            marginX="auto"
            marginTop="10" 
        >
            <FinancialTransactionsResume />
            <FinancialTransactionsTable />
        </VStack>
    </>
  )
}

export default Home
