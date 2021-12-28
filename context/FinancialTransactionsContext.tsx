import {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

export type FinancialTransaction = {
    id: number;
    title: string;
    category: string;
    status: 'Entrada' | 'Saida';
    value: number;
    date: Date;
}

type FinancialTransactionsContextValue = {
    financialTransactions: FinancialTransaction[];
    transactionsCategories: string[];
    addFinancialTransaction: (newFinancialTransaction: FinancialTransaction) => void;
    updateFinancialTransaction: (financialTransactionToUpdate: FinancialTransaction, id: number) => void;
    deleteFinancialTransaction: (id: number) => void;
};

export const FinancialTransactionsContext = createContext({} as FinancialTransactionsContextValue);

export const FinancialTransactionsProvider: FC = function FinancialTransactionsProvider({ children }) {

    const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>([]);

    const transactionsCategories = [
        'Outros', 'Alimentacao', 'Lazer', 'Tarifas e impostos', 'Saude', 'Transporte', 'Educacao', 'Gastos pessoais', 'Servicos'
    ]

    useEffect(() => {
        const initialFinancialTransactions: FinancialTransaction[] = [
            {
                id: Math.random(),
                title: 'Burger King',
                status: 'Saida',
                category: 'Alimentacao',
                date: new Date('11/09/2021'),
                value: 31.90,
            },
            {
                id: Math.random(),
                title: 'Freela',
                status: 'Entrada',
                category: 'Servicos',
                date: new Date('11/10/2021'),
                value: 100,
            },
            {
                id: Math.random(),
                title: 'Kalzone',
                status: 'Saida',
                category: 'Alimentacao',
                date: new Date('12/20/2021'),
                value: 10.90,
            }
        ];

        const storageFinancialTransactions = window.localStorage.getItem('financialTransactions');

        if (!storageFinancialTransactions) {
            setFinancialTransactions(initialFinancialTransactions);
            window.localStorage.setItem('financialTransactions', JSON.stringify(initialFinancialTransactions));
        } else {
            setFinancialTransactions(JSON.parse(storageFinancialTransactions))
        }

    }, []);

    const updateFinancialTransaction = useCallback(
        (financialTransactionToUpdate: FinancialTransaction, id: number) => {
            const updatedValue = financialTransactions.map(transaction => transaction.id === id ? financialTransactionToUpdate : transaction)
            setFinancialTransactions(updatedValue)
            window.localStorage.setItem('financialTransactions', JSON.stringify(updatedValue));
        },
        [financialTransactions],
    );

    const addFinancialTransaction = useCallback(
        (newFinancialTransaction: FinancialTransaction) => {
            const newValue = [...financialTransactions, newFinancialTransaction];
            setFinancialTransactions(newValue)
            window.localStorage.setItem('financialTransactions', JSON.stringify(newValue));
        },
        [financialTransactions],
    );

    const deleteFinancialTransaction = useCallback(
        (id: number) => {
            const newValue = financialTransactions.filter(transaction => transaction.id !== id);
            setFinancialTransactions(newValue)
            window.localStorage.setItem('financialTransactions', JSON.stringify(newValue));
        },
        [financialTransactions],
    );

    return (
        <FinancialTransactionsContext.Provider value={{ transactionsCategories, financialTransactions, updateFinancialTransaction, addFinancialTransaction, deleteFinancialTransaction }}>
            {children}
        </FinancialTransactionsContext.Provider>
    );
};

export function useFinancialTransactions() {
    return useContext(FinancialTransactionsContext);
}
