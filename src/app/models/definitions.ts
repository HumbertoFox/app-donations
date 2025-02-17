import { z } from 'zod';

export const signInFormSchema = z.object({
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    password: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
});

export const signUpFormSchema = z.object({
    name: z
        .string()
        .min(10, { message: 'O nome deve ter pelo menos 10 letras.' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras e espaços.' })
        .trim(),
    cpf: z
        .string()
        .min(11, { message: 'O cpf deve ter 11 números.' })
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' })
        .trim(),
    birthdate: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: 'Formato esperado: YYYY-MM-DD.' }
        )
        .refine((date) => {
            const dateObj = new Date(date);
            return (
                dateObj instanceof Date &&
                !isNaN(dateObj.getTime()) &&
                dateObj.toISOString().slice(0, 10) === date
            );
        }, { message: 'Data de nascimento inválida.' })
        .transform((val) => val.trim()),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    zipcode: z
        .string()
        .min(8, { message: 'O CEP deve ter pelo menos 8 dígitos.' })
        .regex(/^\d+$/, { message: 'O CEP deve conter apenas números.' })
        .trim(),
    street: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    district: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    city: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    number_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    type_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    building: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim()
        .nullable(),
    block: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim()
        .nullable(),
    livingapartmentroom: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim()
        .nullable(),
    reference_point: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Ter pelo menos 8 caracteres' })
        .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })
        .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter pelo menos um caractere especial.' })
        .trim(),
});

export const vehicleUpFormSchema = z.object({
    model: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    automaker: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    renavam: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    plate: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    km: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
});

export const driverUpFormSchema = z.object({
    name: z
        .string()
        .min(10, { message: 'O nome deve ter pelo menos 10 letras.' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras e espaços.' })
        .trim(),
    cpf: z
        .string()
        .min(11, { message: 'O cpf deve ter 11 números.' })
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' })
        .trim(),
    cnh: z
        .string()
        .min(11, { message: 'O cnh deve ter 11 números.' })
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' })
        .trim(),
    birthdate: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: 'Formato esperado: YYYY-MM-DD.' }
        )
        .refine((date) => {
            const dateObj = new Date(date);
            return (
                dateObj instanceof Date &&
                !isNaN(dateObj.getTime()) &&
                dateObj.toISOString().slice(0, 10) === date
            );
        }, { message: 'Data de nascimento inválida.' })
        .transform((val) => val.trim()),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    zipcode: z
        .string()
        .min(8, { message: 'O CEP deve ter pelo menos 8 dígitos.' })
        .regex(/^\d+$/, { message: 'O CEP deve conter apenas números.' })
        .trim(),
    street: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    district: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    city: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    number_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    type_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    building: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    block: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    livingapartmentroom: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    reference_point: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
});

export const helperUpFormSchema = z.object({
    name: z
        .string()
        .min(10, { message: 'O nome deve ter pelo menos 10 letras.' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras e espaços.' })
        .trim(),
    cpf: z
        .string()
        .min(11, { message: 'O cpf deve ter 11 números.' })
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' })
        .trim(),
    birthdate: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: 'Formato esperado: YYYY-MM-DD.' }
        )
        .refine((date) => {
            const dateObj = new Date(date);
            return (
                dateObj instanceof Date &&
                !isNaN(dateObj.getTime()) &&
                dateObj.toISOString().slice(0, 10) === date
            );
        }, { message: 'Data de nascimento inválida.' })
        .transform((val) => val.trim()),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    zipcode: z
        .string()
        .min(8, { message: 'O CEP deve ter pelo menos 8 dígitos.' })
        .regex(/^\d+$/, { message: 'O CEP deve conter apenas números.' })
        .trim(),
    street: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    district: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    city: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    number_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    type_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    building: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    block: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    livingapartmentroom: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    reference_point: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
});

export const donorUpFormSchema = z.object({
    name: z
        .string()
        .min(5, { message: 'O nome deve ter pelo menos 5 letras.' })
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras e espaços.' })
        .trim(),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    contact: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    contact_other: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim()
        .nullable(),
    zipcode: z
        .string()
        .min(8, { message: 'O CEP deve ter 8 Números.' })
        .max(8, { message: 'O CEP deve ter 8 Números.' })
        .regex(/^\d{8}$/, { message: 'O CEP deve conter apenas números.' })
        .trim(),
    street: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    district: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    city: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    number_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    cnpj: z
        .string()
        .min(14, { message: 'O JNPJ deve ter 14 números.' })
        .max(14, {message: 'O JNPJ deve ter 14 números.'})
        .regex(/^\d{14}$/, { message: 'O CNPJ deve conter apenas números.' })
        .trim(),
    corporatename: z
        .string()
        .min(4, { message: 'Campo Obrigatório' })
        .trim(),
    type_residence: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    building: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    block: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    livingapartmentroom: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim()
        .nullable(),
    reference_point: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
});

export const updatePasswordFormSchema = z.object({
    old_password: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Ter pelo menos 8 caracteres' })
        .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })
        .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter pelo menos um caractere especial.' })
        .trim(),
});

export const updateEmailFormSchema = z.object({
    old_email: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    email: z.string()
        .email({ message: 'Insira um e-mail válido.' })
        .trim(),
});

export const updatePhoneFormSchema = z.object({
    old_phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })
        .trim(),
});