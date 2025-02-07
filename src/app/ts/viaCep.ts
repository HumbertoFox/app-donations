import axios from 'axios';

const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export const checkedZipCode = async (element, setData, errors, zipCodeRef, numberResidenceRef) => {
    const clearZipCode = () => {
        setData(prevData => ({
            ...prevData,
            street: '',
            district: '',
            city: '',
        }));
        zipCodeRef.current.focus();
    };
    
    const zipcode = element.target.value.replace(/\D/g, '');
    const validazipcode = /^[0-9]{8}$/;
    if (!zipcode) {
        clearZipCode();
        errors.zipcode = 'Formato de CEP inválido!';
    };

    try {
        if (validazipcode.test(zipcode)) {
            const { data } = await viaCepApi.get(`${zipcode}/json/`);

            if (data && !data.erro) {
                setData(prevData => ({
                    ...prevData,
                    street: data.logradouro,
                    district: data.bairro,
                    city: data.localidade,
                }));
                numberResidenceRef.current.focus();
                errors.zipcode = null;
            } else {
                clearZipCode();
                errors.zipcode = 'CEP não encontrado!';
            };
        } else {
            clearZipCode();
            errors.zipcode = 'Formato de CEP inválido!';
        };
    } catch (error) {
        console.error(error);
        clearZipCode();
        errors.zipcode = 'Formato de CEP inválido ou não encontrado!';
    };
};