'use client';

import { Toast } from '@/app/ts/sweetAlert';
import { useState } from 'react';
import ButtonComponent from '@/components/button';
import { DonationFormComponentProps } from '@/types/types';

export default function DonationFormComponent({donorid, donation, valueButton}: DonationFormComponentProps) {
    const initialData: Record<string, string> = {
        donorcode: donorid ?? '',
        donationcode: donation ?? ''
    };

    const initialItemCount = 1;

    for (let i = initialItemCount + 1; i <= 20; i++) {
        initialData[`object${i}`] = '';
        initialData[`quant${i}`] = '';
    };

    const [formData, setFormData] = useState<Record<string, string>>(initialData);
    const [itemCount, setItemCount] = useState(initialItemCount);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createInputsFields = (count: number, startIndex: number) => (
        Array.from({ length: count }, (_, index) => (
            <div
                className='w-full flex flex-wrap max-sm:flex-col gap-[5px]'
                key={index}
            >
                <div className='flex flex-col'>
                    <label htmlFor={`object${startIndex + index}`}>
                        {`Objeto ${startIndex + index}`}
                    </label>
                    <input
                        className='w-[280px] max-sm:w-full border border-blue-300 rounded p-0.5'
                        id={`object${startIndex + index}`}
                        name={`object${startIndex + index}`}
                        type='text'
                        value={formData[`object${startIndex + index}`] || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor={`quant${startIndex + index}`}>
                        Qant/Caixa/Sacola
                    </label>
                    <input
                        className='w-[150px] max-md:w-full border border-blue-300 rounded p-0.5'
                        id={`quant${startIndex + index}`}
                        name={`quant${startIndex + index}`}
                        type='text'
                        value={formData[`quant${startIndex + index}`] || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        ))
    );

    const addItem = () => {
        const lastObjectIndex = itemCount;
        const lastQuantIndex = itemCount;

        const lastObjectValue = formData[`object${lastObjectIndex}`];
        const lastQuantValue = formData[`quant${lastQuantIndex}`];

        if (lastObjectValue && lastQuantValue) {
            if (itemCount < 20) {
                setItemCount(itemCount + 1);
            };
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'Por favor, preencha todos os campos antes de adicionar o próximo item.',
            });
        };
    };

    const removeItem = () => {
        if (itemCount > 1) {
            setItemCount(itemCount - 1);
        };
    };
    return (
        <form className='max-w-full flex flex-col px-1 text-sm duration-[400ms]'>
            <fieldset className='max-w-full flex flex-col gap-[5px] duration-[400ms]'>
                <legend className='mx-auto py-1 duration-[400ms] drop-shadow-[1px_1px_0.5px_#AAF998]'>
                    Informações da Doação
                </legend>

                <div className='flex'>
                    <div className='flex flex-wrap gap-[5px] bg-white p-1 border-2 rounded'>
                        <div className={`${valueButton === 'Cadastrar' ? 'w-[217.5px]' : 'w-[440px]'} max-sm:w-full flex flex-col`}>
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

                        {valueButton === 'Editar' && (
                            <div className='w-[217.5px] max-sm:w-full flex flex-col'>
                                <label htmlFor='donationcode'>
                                    Código da Doação
                                </label>
                                <input
                                    className='border border-blue-300 rounded p-0.5 cursor-not-allowed'
                                    id='donationcode'
                                    name='donationcode'
                                    type='number'
                                    value={formData.donationcode}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='max-w-full flex flex-col gap-[5px] p-1 border-2 rounded bg-white duration-[400ms]'>
                    <div className='max-w-full flex max-[966px]:flex-col flex-wrap gap-[5px]'>
                        <div className='max-w-full flex flex-col gap-[5px] duration-[400ms]'>
                            {createInputsFields(Math.ceil(itemCount / 2), 1)}
                        </div>
                        <div className='max-w-full flex flex-col gap-[5px] duration-[400ms]'>
                            {createInputsFields(Math.floor(itemCount / 2), Math.ceil(itemCount / 2) + 1)}
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-2 justify-evenly mt-2'>
                        {itemCount < 20 && (
                            <ButtonComponent
                                type='button'
                                onClick={addItem}
                            >
                                Adicionar Item
                            </ButtonComponent>
                        )}

                        {itemCount > 1 && (
                            <ButtonComponent
                                className='bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700'
                                type='button'
                                onClick={removeItem}
                            >
                                Remover Último Item
                            </ButtonComponent>
                        )}
                    </div>
                </div>
            </fieldset>
        </form>
    );
}