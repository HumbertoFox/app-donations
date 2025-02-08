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
    street: string;
    district: string;
    city: string;
};

interface Errors {
    zipcode?: string | null;
};

export interface CheckedZipCodeProps {
    element: React.ChangeEvent<HTMLInputElement>;
    setFormData: React.Dispatch<SetStateAction<FormData>>;
    errors: Errors;
    zipCodeRef: React.RefObject<HTMLInputElement>;
    numberResidenceRef: React.RefObject<HTMLInputElement>;
};