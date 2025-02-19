'use client';

import Icons from '@/components/icons';
import Link from 'next/link';
import {
    useEffect,
    useState
} from 'react';
import { formatCpf } from '@/app/ts/cpfFormat';
import { getDrivers } from '@/app/actions/getdrivers';
import { DriversResponseProps } from '@/interfaces/interfaces';

export default function DriversPage() {
    const [drivers, setDrivers] = useState<DriversResponseProps | null>(null);
    const [hoveredIcon, setHoveredIcon] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const handleMouseEnter = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: true }));
    const handleMouseLeave = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: false }));

    useEffect(() => {
        const fetchDrivres = async () => {
            const response = await getDrivers();
            setDrivers(response);
            setLoading(false);
        };

        fetchDrivres();
    }, []);
    return (
        <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex flex-col gap-2 p-1'>
                <div className='w-full flex justify-between max-md:flex-col max-md:items-center p-1'>
                    <h2 className='text-lg font-semibold leading-tight text-gray-800'>
                        Lista de Motoristas
                    </h2>

                    <nav className='text-sm text-gray-500 dark:text-gray-400'>
                        <Link
                            className='hover:text-gray-700 dark:text-gray-300'
                            href='/menu'
                        >
                            Menu
                        </Link>

                        <span className='mx-1'>/</span>

                        <span className='cursor-default'>Motoristas</span>
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
                                    <th>CNH</th>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers?.data.length === 0 && (
                                    <tr className='text-red-600 cursor-default'>
                                        <td colSpan={6}>Não Existe Motorista Cadastrado</td>
                                    </tr>
                                )}
                                {drivers?.data.map((driver, index) => (
                                    <tr key={index} className='border-b-[1px] border-gray-400'>
                                        <td className='border-r-[1px] border-gray-400'>
                                            {index + 1}
                                        </td>
                                        <td>{driver.id}</td>
                                        <td>{driver.cnhs.cnh}</td>
                                        <td>{formatCpf(driver.cnhs.cpfs.cpf)}</td>
                                        <td>{driver.cnhs.cpfs.name}</td>
                                        <td className='flex justify-center items-center gap-3 my-1'>
                                            <Link href={`/driver/${driver.id}/edit`}>
                                                <Icons
                                                    icon={hoveredIcon[`${driver.id}-edit`]
                                                        ? 'fa-solid fa-address-card'
                                                        : 'fa-regular fa-address-card'
                                                    }
                                                    title={`Editar ${driver.cnhs.cpfs.name}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-orange-600'
                                                    onMouseEnter={() => handleMouseEnter(driver.id, 'edit')}
                                                    onMouseLeave={() => handleMouseLeave(driver.id, 'edit')}
                                                />
                                            </Link>

                                            <div>
                                                <Icons
                                                    icon={hoveredIcon[`${driver.id}-delete`]
                                                        ? 'fa-solid fa-trash-can'
                                                        : 'fa-regular fa-trash-can'
                                                    }
                                                    title={`Exculir ${driver.cnhs.cpfs.name}`}
                                                    aria-label={`Excluir ${driver.cnhs.cpfs.name}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-red-600'
                                                    onMouseEnter={() => handleMouseEnter(driver.id, 'delete')}
                                                    onMouseLeave={() => handleMouseLeave(driver.id, 'delete')}
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