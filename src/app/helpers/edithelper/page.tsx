'use client';

import { getHelperId } from '@/app/actions/gethelper';
import { Toast } from '@/app/ts/sweetAlert';
import HelperFormComponent from '@/components/form_helper';
import Icons from '@/components/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    useEffect,
    useState
} from 'react';

export default function EditHelperPage() {
    const searchParams = useSearchParams();
    const [helper, setHelper] = useState<null | object>(null);
    const idParams = searchParams.get('id');
    const id = idParams ? BigInt(idParams) : 0;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGetHelper = async () => {
            const data = await getHelperId(id);

            if (data.info) {
                Toast.fire({
                    icon: 'info',
                    title: data.info
                });
                setHelper(null);
                setLoading(false);
            } else {
                setHelper(data.data || null);
                setLoading(false);
            };
        };

        fetchGetHelper();
    }, [id]);
    if (loading) {
        return (
            <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
                <div className='w-full flex justify-center items-center py-10'>
                    <div className='animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex justify-between max-md:flex-col max-md:items-center p-1'>
                <h2 className='text-lg font-semibold leading-tight text-gray-800 text-center text-nowrap'>
                    Editar Ajudante
                </h2>

                <nav className='text-sm text-gray-500 dark:text-gray-400'>
                    <Link
                        className='hover:text-gray-700 dark:text-gray-300 duration-300'
                        href='/menu'
                    >
                        Menu
                    </Link>

                    <span className='mx-1'>/</span>

                    <Link
                        className='hover:text-gray-700 dark:text-gray-300 duration-300'
                        href='/helpers'
                    >
                        Ajudantes
                    </Link>

                    <span className='mx-1'>/</span>

                    <span className='cursor-default text-nowrap'>Editar Ajudante</span>
                </nav>
            </div>
            <div className='w-full min-h-full flex flex-col justify-center items-center max-md:justify-start gap-4'>
                <Icons
                    className='text-[45px] text-[blue] p-2'
                    icon='fa-solid fa-id-card'
                />
                <HelperFormComponent
                    helper={helper}
                    valueButton='Editar'
                />
            </div>
        </div>
    );
}