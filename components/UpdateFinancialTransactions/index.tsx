import { Button, DrawerProps, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FinancialTransaction, useFinancialTransactions } from '../../context/FinancialTransactionsContext';

type UpdateFinancialTransactionsProps = Omit<DrawerProps, 'children'> & {
    financialTransaction: FinancialTransaction | undefined;
};

type FinancialTransactionFormValue =  {
    title: string;
    category: string;
    status: 'Entrada' | 'Saida';
    value: string;
};

export default function UpdateFinancialTransactions({ 
    isOpen, 
    onClose,
    financialTransaction,
    ...props 
}: UpdateFinancialTransactionsProps) {
    const { transactionsCategories, updateFinancialTransaction, addFinancialTransaction } = useFinancialTransactions();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FinancialTransactionFormValue>({ mode: 'onTouched' });

    const handleSaveTransactions = (data: FinancialTransactionFormValue) => {
        const { title, value, status, category } = data;
        const formatedValue = parseFloat(value);
        
        if ( financialTransaction ) {
            updateFinancialTransaction({...financialTransaction, title, value: formatedValue, status, category}, financialTransaction.id);
        } else {
            addFinancialTransaction({ date: new Date(), title, value: formatedValue, category, status, id: Math.random()})
        }

        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(handleSaveTransactions)}>
                <ModalHeader>{financialTransaction ? 'Alterar transacao' : 'Adicionar nova transacao' }</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Titulo</FormLabel>
                        <Input 
                            placeholder='Titulo' 
                            {...register('title', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(financialTransaction && { defaultValue: financialTransaction.title })} 
                        />
                    </FormControl>
        
                    <FormControl mt={4} isRequired>
                        <FormLabel>Tipo</FormLabel>
                        <Select 
                            isRequired
                            {...register('status', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(financialTransaction && { defaultValue: financialTransaction?.status })}
                        >
                            <option value='Entrada'>Entrada</option>
                            <option value='Saida'>Saida</option>
                        </Select>
                    </FormControl>
        
                    <FormControl mt={4} isRequired>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                            isRequired
                            {...register('category', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(financialTransaction && { defaultValue: financialTransaction.category })}
                        >
                            {transactionsCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl mt={4} isRequired>
                        <FormLabel>Valor</FormLabel>
                        <Input 
                            placeholder='Valor' 
                            {...register('value', {
                                required: 'Campo obrigatório.',
                            })}
                            {...(financialTransaction && { defaultValue: financialTransaction.value })} 
                        />
                    </FormControl>
                </ModalBody>
    
                <ModalFooter>
                    <Button onClick={handleSubmit(handleSaveTransactions)} type="submit" colorScheme='blue' mr={3}>
                        Salvar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}