export const formatCep = (cep) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) return cep;
    return cleanedCep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
};