export const formatCpf = (cpf) => {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) return cpf;
    return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};