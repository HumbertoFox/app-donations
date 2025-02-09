'use client';

import { useState } from 'react';

export default function DonorFormComponent() {
    const [formData, setFormData] = useState({
        donorcode: '',
        name: '',
        phone: '',
        contact: '',
        contact_other: '',
        zipcode: '',
        street: '',
        district: '',
        city: '',
        type_residence: 'house',
        number_residence: '',
        cnpj: '',
        corporatename: '',
        building: '',
        block: '',
        livingapartmentroom: '',
        reference_point: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <form className='w-full flex text-sm text-gray-600 pl-1 pb-1'>
            <fieldset
                className='flex gap-[5px] flex-wrap duration-[400ms]'
            >
                <legend className='mx-auto py-1 duration-[400ms] drop-shadow-[1px_1px_0.5px_#AAF998]'>
                    Informações do Doador
                </legend>
                <div className='w-[280px]'>
                    <div className='p-1 border-2 rounded'>
                        <div className='flex flex-col'>
                            <label htmlFor='donorcode'>
                                Código do Doador
                            </label>
                            <input
                                className='border border-blue-300 rounded p-0.5 cursor-not-allowed'
                                id='donorcode'
                                name='donorcode'
                                type='number'
                                value={formData.donorcode}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='name'>
                                Nome do Doador
                            </label>
                            <input
                                className='border border-blue-300 rounded p-0.5'
                                id='name'
                                name='name'
                                type='text'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='phone'>
                                Contato do Responsável
                            </label>
                            <input
                                className='border border-blue-300 rounded p-0.5'
                                id='phone'
                                name='phone'
                                type='tel'
                                value={formData.phone}
                                onChange={handleChange}
                                minLength={11}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='contact'>
                                Contato/Ramal
                            </label>
                            <input
                                className='border border-blue-300 rounded p-0.5'
                                id='contact'
                                name='contact'
                                type='tel'
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='contact_other'>
                                Contato do Responsável
                            </label>
                            <input
                                className='border border-blue-300 rounded p-0.5'
                                id='contact_other'
                                name='contact_other'
                                type='tel'
                                value={formData.contact_other}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-[280px]'>
                    <div className='flex gap-5 justify-center p-1 border-2 rounded'>
                        <div className='flex flex-col'>
                            <input
                                className='cursor-pointer'
                                id='house'
                                name='type_residence'
                                type='radio'
                                value='house'
                                onChange={handleChange}
                                checked={formData.type_residence === 'house'}
                            />
                            <label
                                className='cursor-pointer'
                                htmlFor='house'
                            >
                                Casa
                            </label>
                        </div>

                        <div className='flex flex-col'>
                            <input
                                className='cursor-pointer'
                                id='buildings'
                                name='type_residence'
                                type='radio'
                                value='buildings'
                                onChange={handleChange}
                                checked={formData.type_residence === 'buildings'}
                            />
                            <label
                                className='cursor-pointer'
                                htmlFor='buildings'
                            >
                                Edifício
                            </label>
                        </div>

                        <div className='flex flex-col'>
                            <input
                                className='cursor-pointer'
                                id='enterprise'
                                name='type_residence'
                                type='radio'
                                value='enterprise'
                                onChange={handleChange}
                                checked={formData.type_residence === 'enterprise'}
                            />
                            <label
                                className='cursor-pointer'
                                htmlFor='enterprise'
                            >
                                Empresa
                            </label>
                        </div>
                    </div>
                </div>

                <div className='p-1 w-[280px] border-2 rounded'>
                    <div className='flex flex-col'>
                        <label htmlFor='zipcode'>
                            CEP
                        </label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='zipcode'
                            type='number'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='street'>
                            Logradouro: Av/Rua/Trav
                        </label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='street'
                            type='text'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='district'>
                            Bairro/Distrito
                        </label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='district'
                            type='text'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='city'>
                            Cidade
                        </label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='city'
                            type='text'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='number_residence'>
                            Nº Casa/Edifício/Empresa
                        </label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='number_residence'
                            type='text'
                            required
                        />
                    </div>

                    {formData.type_residence !== 'house' && (
                        <div className='w-full'>
                            <div className='flex flex-col'>
                                <label htmlFor='building'>
                                    Nome do Edifício
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5'
                                    id='building'
                                    name='building'
                                    type='text'
                                    value={formData.building}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='block'>
                                    Bloco
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5'
                                    id='block'
                                    name='block'
                                    type='text'
                                    value={formData.block}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='livingapartmentroom'>
                                    Apartamento/Sala
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5'
                                    id='livingapartmentroom'
                                    name='livingapartmentroom'
                                    type='text'
                                    value={formData.livingapartmentroom}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className='flex flex-col'>
                        <label htmlFor='reference_point'>
                            Ponto de Referência
                        </label>
                        <textarea
                            className='border border-blue-300 rounded p-0.5'
                            id='reference_point'
                            name='reference_point'
                            value={formData.reference_point}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {formData.type_residence === 'enterprise' && (
                    <div className='w-[280px]'>
                        <div className='p-1 border-2 rounded'>
                            <div className='flex flex-col'>
                                <label htmlFor='cnpj'>
                                    CNPJ
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5'
                                    id='cnpj'
                                    name='cnpj'
                                    type='text'
                                    value={formData.cnpj}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='corporatename'>
                                    Razão Social
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5'
                                    id='corporatename'
                                    name='corporatename'
                                    type='text'
                                    value={formData.corporatename}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
            </fieldset>
        </form >
    );
}