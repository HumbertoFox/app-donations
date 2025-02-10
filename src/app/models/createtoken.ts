import 'server-only';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/models/opentoken';
import { SessionPayload } from '@/interfaces/interfaces';

export async function createSessionToken(payload: SessionPayload) {
    try {
        if (!process.env.SESSION_SECRET) {
            throw new Error('SESSION_SECRET não está definido');
        };

        const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
        const sessionAuthToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(secret);

        const tokenResponse = await openSessionToken(sessionAuthToken);

        const exp = tokenResponse?.exp;
        if (!exp) {
            throw new Error('Tempo de expiração não encontrado na resposta do token');
        };

        (await cookies()).set('sessionAuthToken', sessionAuthToken, {
            httpOnly: true,
            secure: true,
            expires: new Date((exp as number) * 1000),
            sameSite: 'lax',
            path: '/',
        });
    } catch (error) {
        console.error('Erro ao criar o token de sessão:', error);

        throw new Error('Falha ao criar o token de sessão');
    };
};