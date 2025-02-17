import {
    ButtonHTMLAttributes,
    ChangeEvent,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction
} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    disabled?: boolean;
    className?: string;
};

export interface TypeButtonProps extends ButtonProps {
    type?: 'button' | 'submit' | 'reset';
};

export interface IconsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: string | any;
    className?: string;
    title?: string;
};

interface FormDataBase {
    name: string;
    phone: string;
    zipcode: string;
    street: string;
    district: string;
    city: string;
    type_residence: string;
    number_residence: string;
    building: string;
    block: string;
    livingapartmentroom: string;
    reference_point: string;
};

interface FormDataHelper extends FormDataBase {
    cpf: string;
    birthdate: string;
    email: string;
};

interface FormDataUser extends FormDataHelper {
    password: string;
    password_confirmation: string;
};

interface FormDataDriver extends FormDataHelper {
    cnh: string;
};

interface FormDataDonor extends FormDataBase {
    donorcode: string;
    contact: string;
    contact_other: string;
    cnpj: string;
    corporatename: string;
};

export interface ZipCodeError {
    zipcode?: string | null;
};

export interface CheckedZipCodeProps {
    element: ChangeEvent<HTMLInputElement>;
    setFormData: Dispatch<SetStateAction<FormDataHelper | FormDataUser | FormDataDriver | FormDataDonor>>;
    setZipCodeErrors: Dispatch<SetStateAction<ZipCodeError>>;
    zipCodeRef: RefObject<HTMLInputElement | null>;
    numberResidenceRef: RefObject<HTMLInputElement | null>;
};

export interface SessionPayload {
    email?: string;
    id?: string;
    [key: string]: unknown;
};