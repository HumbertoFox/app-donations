import {
    CheckedZipCodeDonorProps,
    CheckedZipCodeDriverProps,
    CheckedZipCodeHelperProps,
    CheckedZipCodeUserProps
} from '@/interfaces/interfaces';
import axios from 'axios';

const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export const checkedZipCode = async ({
    element,
    setFormData,
    setZipCodeErrors,
    zipCodeRef,
    numberResidenceRef
}: CheckedZipCodeHelperProps
    | CheckedZipCodeUserProps
    | CheckedZipCodeDriverProps
    | CheckedZipCodeDonorProps) => {
    const clearZipCode = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prevData: any) => ({
            ...prevData,
            street: '',
            district: '',
            city: '',
        }));
        if (zipCodeRef.current) zipCodeRef.current.focus();
    };

    const zipcode = element.target.value.replace(/\D/g, '');
    const validazipcode = /^[0-9]{8}$/;

    if (!zipcode) {
        clearZipCode();
        setZipCodeErrors({ zipcode: 'Formato de CEP inválido!' });
        return;
    };

    try {
        if (validazipcode.test(zipcode)) {
            const { data } = await viaCepApi.get(`${zipcode}/json/`);

            if (data && !data.erro) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setFormData((prevData: any) => ({
                    ...prevData,
                    street: data.logradouro,
                    district: data.bairro,
                    city: data.localidade,
                }));
                if (numberResidenceRef.current) numberResidenceRef.current.focus();
                setZipCodeErrors({ zipcode: null });
            } else {
                clearZipCode();
                setZipCodeErrors({ zipcode: 'CEP não encontrado!' });
            };
        } else {
            clearZipCode();
            setZipCodeErrors({ zipcode: 'Formato de CEP inválido!' });
        };
    } catch (error) {
        console.error(error);
        clearZipCode();
        setZipCodeErrors({ zipcode: 'Formato de CEP inválido ou não encontrado!' });
    };
};