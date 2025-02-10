import 'server-only';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/models/opentoken';

export async function updateSession() {
    const sessionAuthToken = (await cookies()).get('sessionAuthToken')?.value;

    if (!sessionAuthToken) {
        return null;
    };

    const payload = await openSessionToken(sessionAuthToken);

    if (!payload) {
        return null;
    };

    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set('sessionAuthToken', sessionAuthToken, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
};