'use server';

import {
    NextRequest,
    NextResponse
} from 'next/server';
import { isSessionValid } from './app/models/isvalid';

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
};

const publicRoutes = ['/login'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const session = await isSessionValid();

    if (session && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    };

    if (!session && !publicRoutes.includes(pathname)) {
        const isAPIRoute = pathname.startsWith('/api');

        if (isAPIRoute) {
            return {
                message: 'Não autorizado',
                status: 401,
            };
        };
        return NextResponse.redirect(new URL('/login', req.url));
    };

    return NextResponse.next();
};