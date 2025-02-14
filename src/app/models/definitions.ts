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