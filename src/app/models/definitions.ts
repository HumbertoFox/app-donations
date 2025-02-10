import { z } from 'zod';

export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
    password: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })
        .trim(),
});

export const UpdatePasswordFormSchema = z.object({
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

export const UpdateEmailFormSchema = z.object({
    old_email: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })
        .trim(),
    email: z.string()
        .email({ message: 'Insira um e-mail válido.' })
        .trim(),
});

export const UpdatePhoneFormSchema = z.object({
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