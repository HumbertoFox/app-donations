'use server';

import { cookies } from 'next/headers';

export async function destroySession(): Promise<boolean> {
    const cookieStore = cookies();
    
    const sessionCookie = (await cookieStore).get('sessionAuthToken');

    if (sessionCookie) {
        (await cookieStore).delete('sessionAuthToken');

        return true;
    };

    return false;
};