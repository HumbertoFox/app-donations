'use client';

import { useState } from 'react';
import ButtonComponent from '@/components/button';

export default function VehicleFormComponent() {
    const [formData, setFormData] = useState({
        model: '',
        automaker: '',
        renavam: '',
        plate: '',
        km: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <form className='max-w-[280px] w-full flex flex-col gap-[5px] text-sm p-1'>
            <div className='flex flex-col'>
                <label htmlFor='model'>Modelo</label>
                <input
                    className='w-full uppercase border border-blue-300 rounded p-0.5'
                    id='model'
                    name='model'
                    value={formData.model}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='automaker'>Montadora</label>
                <input
                    className='w-full uppercase border border-blue-300 rounded p-0.5'
                    id='automaker'
                    name='automaker'
                    value={formData.automaker}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='renavam'>Renavam</label>
                <input
                    className='w-full border border-blue-300 rounded p-0.5'
                    id='renavam'
                    name='renavam'
                    value={formData.renavam}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='plate'>Placa</label>
                <input
                    className='w-full uppercase border border-blue-300 rounded p-0.5'
                    id='plate'
                    name='plate'
                    value={formData.plate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='km'>Km</label>
                <input
                    className='w-full border border-blue-300 rounded p-0.5'
                    id='km'
                    name='km'
                    value={formData.km}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex justify-around pt-4 duration-[400ms]'>
                <ButtonComponent type='submit'>
                    Cadastrar
                </ButtonComponent>
            </div>
        </form>
    );
}