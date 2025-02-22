'use client';

import ButtonComponent from '@/components/button';
import Link from 'next/link';
import {
    useEffect,
    useState
} from 'react';
import { formatPhone } from '@/app/ts/phoneFormat';
import { formatCep } from '@/app/ts/cepFormat';
import Icons from '@/components/icons';
import { getDonors } from '@/app/actions/getdonors';
import { DonorsResponseProps } from '@/interfaces/interfaces';

export default function DonorsPage() {
    const [donors, setDonors] = useState<DonorsResponseProps | null>(null);
    const [hoveredIcon, setHoveredIcon] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        zipcode: '',
        district: ''
    });

    const handleMouseEnter = (id: string | bigint, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: true }));
    const handleMouseLeave = (id: string | bigint, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: false }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchDonors = async () => {
            const response = await getDonors();
            setDonors(response);
            setLoading(false);
        };

        fetchDonors();
    }, []);
    return (
        <div className='max-w-screen-2xl w-full min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex flex-col gap-2 p-1'>
                <form
                    className='w-full flex flex-col gap-2 p-2 bg-white shadow sm:rounded-lg'
                >
                    <div className='flex flex-col gap-2 md:flex-row'>
                        <input
                            className='px-2 py-0 text-sm md:w-1/4 border border-blue-300 rounded'
                            type='text'
                            placeholder='Nome do Doador'
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            type='number'
                            placeholder='Telefone'
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            type='number'
                            placeholder='CEP'
                            value={formData.zipcode}
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            type='text'
                            placeholder='Bairro'
                            value={formData.district}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex justify-center gap-2'>
                        <ButtonComponent
                            type='submit'
                        >
                            Pesquisar
                        </ButtonComponent>

                        <Link href='/donors'>
                            <ButtonComponent>
                                Limpar
                            </ButtonComponent>
                        </Link>
                    </div>
                </form>
                <h2 className='mx-auto duration-[400ms] drop-shadow-[1px_1px_0.5px_#AAF998]'>
                    Lista de Doadores
                </h2>
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
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>CEP</th>
                                    <th>Bairro</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors?.data?.length === 0 && (
                                    <tr className='text-red-600'>
                                        <td colSpan={7}>
                                            Não Existe Doador Cadastrada
                                        </td>
                                    </tr>
                                )}
                                {donors?.data?.map((donor, index) => (
                                    <tr key={index} className='border-b-[1px] border-gray-400'>
                                        <td className='border-r-[1px] border-gray-400'>
                                            {index + 1}
                                        </td>
                                        <td>{donor.id}</td>
                                        <td>{donor.name}</td>
                                        <td>{formatPhone(donor.phones.phone)}</td>
                                        <td>{formatCep(donor.addresses.zipcodes.zipcode)}</td>
                                        <td>{donor.addresses.zipcodes.district}</td>
                                        <td className='flex justify-evenly items-center gap-2 my-1'>
                                            <Link href={`/donors/editdonor/?id=${donor.id}`}>
                                                <Icons
                                                    icon={hoveredIcon[`${donor.id}-edit`]
                                                        ? 'fa-solid fa-user-pen'
                                                        : 'fa-solid fa-user-gear'
                                                    }
                                                    title={`Editar ${donor.name}`}
                                                    aria-label={`Editar ${donor.name}`}
                                                    className='text-[25px] text-[blue] duration-500 cursor-pointer hover:text-orange-600'
                                                    onMouseEnter={() => handleMouseEnter(donor.id, 'edit')}
                                                    onMouseLeave={() => handleMouseLeave(donor.id, 'edit')}
                                                />
                                            </Link>
                                            <Link href={`/donation/${donor.id}/register`}>
                                                <Icons
                                                    icon={hoveredIcon[`${donor.id}-show`]
                                                        ? 'fa-solid fa-person-circle-check'
                                                        : 'fa-solid fa-person-circle-question'
                                                    }
                                                    title={`Doação de ${donor.name}`}
                                                    aria-label={`Doação de ${donor.name}`}
                                                    className='text-[25px] text-[blue] duration-500 cursor-pointer hover:text-green-600'
                                                    onMouseEnter={() => handleMouseEnter(donor.id, 'show')}
                                                    onMouseLeave={() => handleMouseLeave(donor.id, 'show')}
                                                />
                                            </Link>
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