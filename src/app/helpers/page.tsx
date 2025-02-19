'use client';

import Link from 'next/link';
import {
    useEffect,
    useState
} from 'react';
import { formatCpf } from '../ts/cpfFormat';
import Icons from '@/components/icons';
import { getHelpers } from '../actions/gethelpers';
import { HelpersResponseProps } from '@/interfaces/interfaces';

export default function HelpersPage() {
    const [helpers, setHelpers] = useState<HelpersResponseProps | null>(null);
    const [hoveredIcon, setHoveredIcon] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const handleMouseEnter = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: true }));
    const handleMouseLeave = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: false }));

    useEffect(() => {
        const fetchHelpers = async () => {
            const response = await getHelpers();
            setHelpers(response);
            setLoading(false);
        };

        fetchHelpers();
    }, []);
    return (
        <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex flex-col gap-2 p-1'>
                <div className='w-full flex justify-between max-md:flex-col max-md:items-center p-1'>
                    <h2 className='text-lg font-semibold leading-tight text-gray-800'>
                        Lista de Ajudantes
                    </h2>

                    <nav className='text-sm text-gray-500 dark:text-gray-400'>
                        <Link
                            className='hover:text-gray-700 dark:text-gray-300'
                            href='menu'
                        >
                            Menu
                        </Link>

                        <span className='mx-1'>/</span>

                        <span className='cursor-default'>Ajudantes</span>
                    </nav>
                </div>

                <div className='bg-white p-4 shadow sm:rounded-lg'>
                    {loading ? (
                        <div className='flex justify-center items-center py-10'>
                            <div className='animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10'></div>
                        </div>
                    ) : (
                        <table className='w-full text-center'>
                            <thead>
                                <tr className='border-b-[1px] border-gray-600 cursor-default'>
                                    <th>Nº</th>
                                    <th>Cód.</th>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {helpers?.data.length === 0 && (
                                    <tr className='text-red-600 cursor-default'>
                                        <td colSpan={5}>Não Existe Ajudante Cadastrado</td>
                                    </tr>
                                )}
                                {helpers?.data.map((helper, index) => (
                                    <tr key={index} className='border-b-[1px] border-gray-400'>
                                        <td className='border-r-[1px] border-gray-400'>
                                            {index + 1}
                                        </td>
                                        <td>{helper.id}</td>
                                        <td>{formatCpf(helper.cpfs.cpf)}</td>
                                        <td>{helper.cpfs.name}</td>
                                        <td className='flex justify-center items-center gap-3 my-1'>
                                            <Link href={`/helper/${helper.id}/edit`}>
                                                <Icons
                                                    icon={hoveredIcon[`${helper.id}-edit`]
                                                        ? 'fa-solid fa-id-card'
                                                        : 'fa-regular fa-id-card'
                                                    }
                                                    title={`Editar ${helper.cpfs.name}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-orange-600'
                                                    onMouseEnter={() => handleMouseEnter(helper.id, 'edit')}
                                                    onMouseLeave={() => handleMouseLeave(helper.id, 'edit')}
                                                />
                                            </Link>

                                            <div>
                                                <Icons
                                                    icon={hoveredIcon[`${helper.id}-delete`]
                                                        ? 'fa-solid fa-trash-can'
                                                        : 'fa-regular fa-trash-can'
                                                    }
                                                    title={`Exculir ${helper.cpfs.name}`}
                                                    aria-label={`Excluir ${helper.cpfs.name}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-red-600'
                                                    onMouseEnter={() => handleMouseEnter(helper.id, 'delete')}
                                                    onMouseLeave={() => handleMouseLeave(helper.id, 'delete')}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}