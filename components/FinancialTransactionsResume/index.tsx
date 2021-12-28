import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from 'react-icons/gi'
import { useFinancialTransactions } from '../../context/FinancialTransactionsContext';
import formatPriceValue from './../../utils/formatPriceValue';

export default function FinancialTransactionsResume() {    
    const { financialTransactions } = useFinancialTransactions();

    const [total, setTotal] = useState(0);
    const [expense, setExpenses ] = useState(0);
    const [income, setIncome] = useState(0);

    useEffect(() => {
        const sumIncome = financialTransactions
            .filter(t => t.status === "Entrada")
            .reduce((accumulator, transaction) => accumulator + transaction.value, 0);

        const sumExpenses = financialTransactions
            .filter(t => t.status === "Saida")
            .reduce((accumulator, transaction) => accumulator + transaction.value, 0);

        setExpenses(sumExpenses);
        setIncome(sumIncome);
        setTotal(sumIncome - sumExpenses);
    }, [financialTransactions]);

    return (
        <HStack width="full">
            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <GiReceiveMoney size="40" />
                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Entradas</Text>
                    <Text fontSize="2xl" fontWeight="semibold" color="green">+ {formatPriceValue(income)}</Text>
                </VStack>
            </HStack>
            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <GiPayMoney size="40" />
                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Saidas</Text>
                    <Text fontSize="2xl" fontWeight="semibold" color="red">- {formatPriceValue(expense)}</Text>
                </VStack>
            </HStack>
            <HStack background="white" padding="8" borderRadius="8" flex={1} spacing="6">
                <GiTakeMyMoney size="40" />
                <VStack alignItems="initial">
                    <Text fontSize="xl" color="gray">Total</Text>
                    <Text fontSize="2xl" fontWeight="semibold">{formatPriceValue(total)}</Text>
                </VStack>
            </HStack>
        </HStack>
    );
}