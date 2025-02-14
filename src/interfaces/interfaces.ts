import {
    ButtonHTMLAttributes,
    ReactNode,
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

interface FormData {
    name: string;
    cpf: string;
    birthdate: string;
    phone: string;
    email: string;
    zipcode: string;
    street: string;
    district: string;
    city: string;
    number_residence: string;
    type_residence: string;
    building: string;
    block: string;
    livingapartmentroom: string;
    reference_point: string;
    password: string;
    password_confirmation: string;
};

export interface CheckedZipCodeProps {
    element: React.ChangeEvent<HTMLInputElement>;
    setFormData: React.Dispatch<SetStateAction<FormData>>;
    errors: { [key: string]: string | null };
    zipCodeRef: React.RefObject<HTMLInputElement | null>;
    numberResidenceRef: React.RefObject<HTMLInputElement | null>;
};

export interface SessionPayload {
    email?: string;
    id?: string;
    [key: string]: unknown;
};