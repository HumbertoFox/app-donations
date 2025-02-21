'use client';

import Icons from '@/components/icons';
import Link from 'next/link';
import {
    useEffect,
    useState
} from 'react';
import { getVehicles } from '@/app/actions/getvehicles';
import { VehiclesResponseProps } from '@/interfaces/interfaces';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<VehiclesResponseProps | null>(null);
    const [hoveredIcon, setHoveredIcon] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const handleMouseEnter = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: true }));
    const handleMouseLeave = (id: bigint | string, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: false }));

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await getVehicles();
            setVehicles(response);
            setLoading(false);
        };

        fetchVehicles();
    }, []);
    return (
        <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex flex-col gap-2 p-1'>
                <div className='w-full flex justify-between max-md:flex-col max-md:items-center p-1'>
                    <h2 className='text-lg font-semibold leading-tight text-gray-800 text-center text-nowrap'>
                        Lista de Veículos
                    </h2>

                    <nav className='text-sm text-gray-500 dark:text-gray-400'>
                        <Link
                            className='hover:text-gray-700 dark:text-gray-300 duration-300'
                            href='/menu'
                        >
                            Menu
                        </Link>

                        <span className='mx-1'>/</span>

                        <span className='cursor-default text-nowrap'>Veículos</span>
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
                                    <th>Renavam</th>
                                    <th>Placa</th>
                                    <th>Modelo</th>
                                    <th>Montadora</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles?.data.length === 0 && (
                                    <tr className='text-red-600 cursor-default'>
                                        <td colSpan={7}>
                                            Não Existe Veículo Cadastrado
                                        </td>
                                    </tr>
                                )}
                                {vehicles?.data.map((vehicle, index) => (
                                    <tr key={index} className='border-b-[1px] border-gray-400'>
                                        <td className='border-r-[1px] border-gray-400'>
                                            {index + 1}
                                        </td>
                                        <td>{vehicle.id}</td>
                                        <td>{vehicle.renavam}</td>
                                        <td>{vehicle.plate}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.automaker}</td>
                                        <td className='flex justify-center items-center gap-3 my-1'>
                                            <Link href={`/vehicles/editvehicle/?id=${vehicle.id}`}>
                                                <Icons
                                                    icon={hoveredIcon[`${vehicle.id}-edit`]
                                                        ? 'fa-solid fa-truck'
                                                        : 'fa-solid fa-truck-medical'
                                                    }
                                                    title={`Editar ${vehicle.plate}`}
                                                    aria-label={`Editar ${vehicle.plate}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-orange-600'
                                                    onMouseEnter={() => handleMouseEnter(vehicle.id, 'edit')}
                                                    onMouseLeave={() => handleMouseLeave(vehicle.id, 'edit')}
                                                />
                                            </Link>

                                            <div>
                                                <Icons
                                                    icon={hoveredIcon[`${vehicle.id}-delete`]
                                                        ? 'fa-solid fa-trash-can'
                                                        : 'fa-regular fa-trash-can'
                                                    }
                                                    title={`Exculir ${vehicle.plate}`}
                                                    aria-label={`Excluir ${vehicle.plate}`}
                                                    className='text-[25px] text-[blue] duration-[400ms] cursor-pointer hover:text-red-600'
                                                    onMouseEnter={() => handleMouseEnter(vehicle.id, 'delete')}
                                                    onMouseLeave={() => handleMouseLeave(vehicle.id, 'delete')}
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