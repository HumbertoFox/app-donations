import { cpfs } from '@prisma/client';
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
    'aria-label'?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

interface Zipcodes {
    id: bigint;
    zipcode: string;
    district: string;
    city: string;
    street: string;
};

interface Addresses {
    id: bigint;
    zipcodes: Zipcodes;
};

interface Phones {
    id: bigint;
    phone: string;
    contact: string | null;
    contact_other: string | null;
    email: string | null;
};

interface Donors {
    id: bigint;
    name: string;
    phones: Phones;
    addresses: Addresses;
};

export interface DonorsResponseProps {
    data: Donors[];
};

interface Donations {
    id: bigint;
    donors: Donors;
    created_at: Date | null;
};

export interface DonationsResponseProps {
    data: Donations[];
};

interface Vehicle {
    id: bigint;
    renavam: string;
    plate: string;
    km: string;
    model: string;
    automaker: string;
};

export interface VehiclesResponseProps {
    data: Vehicle[];
};

interface Cpfs {
    id: bigint;
    cpf: string;
    name: string;
    birthdate: Date;
}

interface Cnhs {
    id: bigint;
    cnh: string;
    cpfs: Cpfs;
};

interface Driver {
    id: bigint;
    cnhs: Cnhs;
};

export interface DriversResponseProps {
    data: Driver[];
};

interface Helper {
    id: bigint;
    cpfs: cpfs;
};

export interface HelpersResponseProps {
    data: Helper[];
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