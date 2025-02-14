'use server';

import { signInFormSchema } from '@/app/models/definitions';
import { FormStateSignIn } from '@/types/types';
import * as bcrypt from 'bcryptjs';
import Prisma from '@/app/models/prismadb';
import { createSessionToken } from '@/app/models/createtoken';

export async function signIn(state: FormStateSignIn, formData: FormData) {
    const validatedFields = signInFormSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    const { email, password } = validatedFields.data

    const existingUser = await Prisma.users.findFirst({
        where: {
            email
        }
    });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return {
                info: 'Dados informados inválido!'
            };
        };

        await createSessionToken({
            sub: String(existingUser.id),
            email: existingUser.email
        });

        return {
            message: 'Autenticado com Sucesso!',
        };
    };

    return {
        info: 'Dados informados inválido!',
    };
};