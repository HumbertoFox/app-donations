export const formatPhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) return phone;
    return cleanedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
};