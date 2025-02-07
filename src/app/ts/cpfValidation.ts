const isRepeatedCpf = (data) => {
    const sanitizedData = data.replace(/\D/g, '');

    if (sanitizedData.length !== 11) return;

    const firstDigit = sanitizedData[0];
    return sanitizedData.split('').every(digit => digit === firstDigit);
};

const calculateCheckDigit = (input) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const digit = Number(input.charAt(i));
        const weight = input.length + 1 - i;
        sum += digit * weight;
    };

    const remainder = sum % 11;
    return remainder < 2 ? '0' : (11 - remainder).toString();
};

export const getCheckedCpf = (data) => {
    if (isRepeatedCpf(data)) return false;

    let primaryCheckDigit = calculateCheckDigit(data.substring(0, 9));
    let secondaryCheckDigit = calculateCheckDigit(data.substring(0, 9) + primaryCheckDigit);
    let correctCpf = data.substring(0, 9) + primaryCheckDigit + secondaryCheckDigit;

    return data === correctCpf;
};