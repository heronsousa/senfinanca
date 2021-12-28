const formatPriceValue = (price: number): string => {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

export default formatPriceValue