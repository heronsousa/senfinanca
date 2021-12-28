import React, { useEffect, useState } from 'react';
import { Table, Thead, Tr, Th, Tbody, Td, IconButton, useDisclosure, Button, Box, Badge, HStack, Text, VStack, Select } from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { RiAddFill } from 'react-icons/ri'
import { FinancialTransaction, useFinancialTransactions } from '../../context/FinancialTransactionsContext';
import UpdateFinancialTransactions from '../UpdateFinancialTransactions';
import formatPriceValue from '../../utils/formatPriceValue';

export default function FinancialTransactionsTable() {    
    const { transactionsCategories, financialTransactions, deleteFinancialTransaction } = useFinancialTransactions();
    const [ financialTransactionToUpdate, setFinancialTransactionToUpdate ] = useState<FinancialTransaction | undefined>();
    const [ transactionsToShow, setTransactionsToShow ] = useState<FinancialTransaction[]>(financialTransactions);

    const {
        isOpen: isOpenUpdate,
        onOpen: onOpenUpdate,
        onClose: onCloseUpdate,
    } = useDisclosure();

    const updateRegister = (financialTransaction: FinancialTransaction) => {
        setFinancialTransactionToUpdate(financialTransaction)
        onOpenUpdate();
    }
    
    const addRegister = () => {
        setFinancialTransactionToUpdate(undefined)
        onOpenUpdate();
    }

    const handleFilterByCategory = (category: string) => {
        if(!category) return

        if (category === "all") setTransactionsToShow(financialTransactions)
        else {
            setTransactionsToShow(financialTransactions.filter(transaction => transaction.category === category ))
        }        
    }

    const handleFilterByStatus = (status: string) => {
        if(!status) return

        if (status === "all") setTransactionsToShow(financialTransactions)
        else {
            setTransactionsToShow(financialTransactions.filter(transaction => transaction.status === status ))
        }        
    }

    useEffect(() => {
        setTransactionsToShow(financialTransactions)
    }, [financialTransactions])

    return (
        <VStack 
            width="full"
            background="white" 
            paddingX="4"
            paddingY="8"
            borderRadius="4"
            spacing="8"
        >
            <HStack justifyContent="space-between" w="full">
                <Text fontSize='2xl' fontWeight="semibold">Transacoes</Text>

                <HStack spacing="2">
                    <Button
                        onClick={addRegister}
                        leftIcon={<RiAddFill size={22}/>} 
                        colorScheme='blue' 
                        variant='solid'
                    >
                        Nova transacao
                    </Button>

                    <Select w="auto" placeholder='Filtre por categoria' onChange={e => handleFilterByCategory(e.target.value)}>
                        <option value="all">Todos</option>
                        {transactionsCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Select>

                    <Select w="auto" placeholder='Filtre por tipo' onChange={e => handleFilterByStatus(e.target.value)}>
                        <option value="all">Todos</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Saida">Saida</option>
                    </Select>
                </HStack>
            </HStack>
            <Table>
                <Thead>
                    <Tr fontSize="">
                        <Th>Título</Th>
                        <Th>Tipo</Th>
                        <Th>Categoria</Th>
                        <Th>Data</Th>
                        <Th>Valor</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactionsToShow.map(financialTransaction => (
                        <Tr key={financialTransaction.id}>
                            <Td>{financialTransaction.title}</Td>
                            <Td>{financialTransaction.status === 'Entrada' ? (
                                <Badge colorScheme='green'>Entrada</Badge>
                                ) : (
                                <Badge colorScheme='red'>Saida</Badge>
                            )}</Td>
                            <Td>{financialTransaction.category}</Td>
                            <Td>{new Date(financialTransaction.date).toLocaleDateString('pt-BR')}</Td>
                            <Td>{formatPriceValue(financialTransaction.value)}</Td>
                            <Td>
                                <IconButton 
                                    onClick={() => updateRegister(financialTransaction)} 
                                    aria-label='Editar transacao' 
                                    icon={<FiEdit2 />} 
                                    isRound 
                                    marginRight={2} 
                                />
                                <IconButton 
                                    onClick={() => deleteFinancialTransaction(financialTransaction.id)} 
                                    aria-label='Excluir transacao' 
                                    icon={<GrClose />} 
                                    isRound 
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <UpdateFinancialTransactions
                financialTransaction={financialTransactionToUpdate}
                {...(financialTransactionToUpdate && { key: financialTransactionToUpdate.id })}
                isOpen={isOpenUpdate}
                onClose={onCloseUpdate}
            />
        </VStack>
    );
}