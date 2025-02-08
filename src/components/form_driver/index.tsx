'use client';

import { calculateAge } from '@/app/ts/calcAge';
import { useState } from 'react';
import ButtonComponent from '@/components/button';

export default function DriverFormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        cnh: '',
        birthdate: '',
        phone: '',
        email: '',
        zipcode: '',
        street: '',
        district: '',
        city: '',
        number_residence: '',
        type_residence: 'house',
        building: '',
        block: '',
        livingapartmentroom: '',
        reference_point: ''
    });
    const [age, setAge] = useState(0);

    const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const birthdate = e.target.value;
        setFormData({
            ...formData,
            birthdate: birthdate
        });
        const age = calculateAge(birthdate);
        setAge(isNaN(age) ? 0 : age);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form className='h-full flex flex-col justify-center gap-[5px] text-sm p-1 my-auto'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Nome</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='cpf'>CPF</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='cpf'
                    name='cpf'
                    type='number'
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='cnh'>CNH</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='cnh'
                    name='cnh'
                    type='number'
                    value={formData.cnh}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex items-end'>
                <div className='w-full'>
                    <label htmlFor='birthdate'>Data de Nascimento</label>
                    <input
                        className='w-full border border-blue-300 rounded p-0.5'
                        id='birthdate'
                        name='birthdate'
                        type='date'
                        value={formData.birthdate}
                        onChange={handleBirthdateChange}
                        required
                    />
                </div>
                <div className='px-2 text-center'>
                    <p>{age}</p>
                    <p>anos</p>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='phone'>Telefone</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='phone'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='email'>E-mail</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='zipcode'>CEP</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='zipcode'
                    name='zipcode'
                    type='number'
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='street'>Logradouro: Av/Rua/Trav</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='street'
                    name='street'
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='district'>Bairro/Distrito</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='district'
                    name='district'
                    value={formData.district}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='city'>Cidade</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex gap-3 justify-center items-center text-center'>
                <div className='flex items-center gap-1'>
                    <input
                        className='border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer'
                        id='house'
                        name='type_residence'
                        type='radio'
                        value='house'
                        onChange={handleChange}
                        checked={formData.type_residence === 'house'}
                    />
                    <label className='cursor-pointer' htmlFor='house'>Casa</label>
                </div>
                <div className='flex items-center gap-1'>
                    <input
                        className='border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer'
                        id='buildings'
                        name='type_residence'
                        type='radio'
                        value='buildings'
                        onChange={handleChange}
                        checked={formData.type_residence === 'buildings'}
                    />
                    <label className='cursor-pointer' htmlFor='buildings'>Edifício</label>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='number_residence'>Nº Casa/Edifício</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='number_residence'
                    name='number_residence'
                    value={formData.number_residence}
                    onChange={handleChange}
                    required
                />
            </div>

            {formData.type_residence === 'buildings' && (
                <div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='building'>Nome do Edifício</label>

                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='building'
                            name='building'
                            value={formData.building}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='block'>Bloco</label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='block'
                            name='block'
                            value={formData.block}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='livingapartmentroom'>Apartamento/Sala</label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='livingapartmentroom'
                            name='livingapartmentroom'
                            value={formData.livingapartmentroom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            )}

            <div className='flex flex-col gap-1'>
                <label htmlFor='reference_point'>Ponto de Referência</label>
                <textarea
                    className='border border-blue-300 rounded p-0.5'
                    id='reference_point'
                    name='reference_point'
                    value={formData.reference_point}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex justify-around pt-2 duration-[400ms]'>
                <ButtonComponent
                    type='submit'
                >
                    Cadastrar
                </ButtonComponent>
            </div>
        </form>
    );
}