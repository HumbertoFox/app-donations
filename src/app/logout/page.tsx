'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { destroySession } from '@/app/models/removecookies';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            const success = await destroySession();
            if (success) {
                router.push('/login');
            } else {
                console.error('Falha ao excluir o cookie.');
            };
        };

        const timer = setTimeout(logout, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return (
        <section className='min-w-full min-h-screen flex justify-center items-center'>
            <span>Aguarde Saindo...</span>
        </section>
    );
}