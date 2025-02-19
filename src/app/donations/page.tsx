'use client';

import Icons from '@/components/icons';
import Link from 'next/link';
import {
    useEffect,
    useState
} from 'react';
import { formatPhone } from '@/app/ts/phoneFormat';
import { formatCep } from '@/app/ts/cepFormat';
import { formatDate } from '@/app/ts/dataFormat';
import ButtonComponent from '@/components/button';
import { daysSince } from '@/app/ts/sincedays';
import { getDonations } from '@/app/actions/getdonations';
import { DonationsResponseProps } from '@/interfaces/interfaces';

export default function DonationsPage() {
    const [donations, setDonations] = useState<DonationsResponseProps | null>(null);
    const [hoveredIcon, setHoveredIcon] = useState<Record<string, boolean>>({});
    const [hoveredDaysIndex, setHoveredDaysIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        phone: '',
        zipcode: '',
        date_start: '',
        date_end: ''
    });

    const handleMouseEnter = (id: string | bigint, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: true }));
    const handleMouseLeave = (id: string | bigint, action: string) => setHoveredIcon((prev) => ({ ...prev, [`${id}-${action}`]: false }));
    const handleMouseEnterDays = (index: number) => setHoveredDaysIndex(index);
    const handleMouseLeaveDays = () => setHoveredDaysIndex(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchDonors = async () => {
            const response = await getDonations();
            setDonations(response);
            setLoading(false);
        };

        fetchDonors();
    }, []);
    return (
        <div className='max-w-screen-2xl w-full min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='flex flex-col gap-2 w-full p-1'>
                <form
                    className='w-full flex flex-col gap-2 p-2 bg-white shadow sm:rounded-lg'
                >
                    <div className='flex flex-col gap-2 md:flex-row'>
                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            id='phone'
                            name='phone'
                            type='number'
                            value={formData.phone}
                            placeholder='Telefone Doador'
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            id='zipcode'
                            name='zipcode'
                            type='number'
                            value={formData.zipcode}
                            placeholder='CEP'
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            id='date_start'
                            name='date_start'
                            type='date'
                            title='Data Ínicio'
                            value={formData.date_start}
                            placeholder='Data Ínicio'
                            onChange={handleChange}
                        />

                        <input
                            className='px-2 py-0 text-sm md:w-1/4 rounded border border-blue-300'
                            id='date_end'
                            name='date_end'
                            type='date'
                            title='Data Fim'
                            value={formData.date_end}
                            placeholder='Data Fim'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex justify-center gap-2'>
                        <ButtonComponent
                            type='submit'
                        >
                            Pesquisar
                        </ButtonComponent>

                        <Link href='/donations'>
                            <ButtonComponent>
                                Limpar
                            </ButtonComponent>
                        </Link>
                    </div>
                </form>
                <h2 className='mx-auto duration-[400ms] drop-shadow-[1px_1px_0.5px_#AAF998]'>
                    Lista de Doações
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
                                    <th title='Quantidade'>Nº</th>
                                    <th title='Código da Doação'>Cód.</th>
                                    <th title='Nome do Doador'>Nome</th>
                                    <th title='Contato do Doador'>Telefone</th>
                                    <th title='Cep do Doador'>CEP</th>
                                    <th title='Data de Cadastro da Doação'>Data Cad.</th>
                                    <th title='Dias após Cadastro'>Há Dias</th>
                                    <th title='Ação'>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations?.data?.length === 0 && (
                                    <tr className='text-red-600 cursor-default'>
                                        <td colSpan={8}>Não Existe Doação Cadastrada</td>
                                    </tr>
                                )}
                                {donations?.data.map((donation, index) => {
                                    const days = daysSince(donation.created_at);
                                    const dayClass = days <= 5
                                        ? 'text-green-600'
                                        : days <= 10
                                            ? 'text-orange-600'
                                            : 'text-red-600';
                                    const dayIcon = days <= 5
                                        ? 'fa-solid fa-heart-circle-check'
                                        : days <= 10
                                            ? 'fa-solid fa-heart-circle-exclamation'
                                            : 'fa-solid fa-heart-circle-xmark';
                                    return (
                                        <tr key={index} className='border-b-[1px] border-gray-400'>
                                            <td className='border-r-[1px] border-gray-400'>
                                                {index + 1}
                                            </td>
                                            <td>{donation.id}</td>
                                            <td>{donation.donors.name}</td>
                                            <td>{formatPhone(donation.donors.phones.phone)}</td>
                                            <td>{formatCep(donation.donors.addresses.zipcodes.zipcode)}</td>
                                            <td>{formatDate(donation.created_at)}</td>
                                            <td
                                                className={`${dayClass} cursor-help`}
                                                onMouseEnter={() => handleMouseEnterDays(index)}
                                                onMouseLeave={handleMouseLeaveDays}
                                            >
                                                {hoveredDaysIndex === index ? days : <Icons icon={dayIcon} className='text-[25px]' />}
                                            </td>
                                            <td className='flex justify-evenly items-center my-1'>
                                                <Link href={`/donation/${donation.id}/edit`}>
                                                    <Icons
                                                        icon={hoveredIcon[`${donation.id}-edit`] ? 'fa-regular fa-address-book' : 'fa-solid fa-address-book'}
                                                        title={`Editar doação de ${donation.donors.name}`}
                                                        aria-label={`Editar doação de ${donation.donors.name}`}
                                                        className='text-[25px] text-[blue] duration-500 cursor-pointer hover:text-orange-600'
                                                        onMouseEnter={() => handleMouseEnter(donation.id, 'edit')}
                                                        onMouseLeave={() => handleMouseLeave(donation.id, 'edit')}
                                                    />
                                                </Link>
                                                <Link href={`/record/${donation.id}/register`}>
                                                    <Icons
                                                        icon={hoveredIcon[`${donation.id}-show`] ? 'fa-solid fa-check-double' : 'fa-solid fa-check'}
                                                        title={`Agendar Doação de ${donation.donors.name}`}
                                                        aria-label={`Agendar Doação de ${donation.donors.name}`}
                                                        className='text-[25px] text-[blue] duration-500 cursor-pointer hover:text-green-600'
                                                        onMouseEnter={() => handleMouseEnter(donation.id, 'show')}
                                                        onMouseLeave={() => handleMouseLeave(donation.id, 'show')}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}