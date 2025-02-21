'use client';

import {
    useActionState,
    useEffect,
    useState
} from 'react';
import ButtonComponent from '@/components/button';
import { vehicleUp } from '@/app/actions/vehicleup';
import { Toast } from '@/app/ts/sweetAlert';
import { VehicleFormComponentProps } from '@/types/types';
import { vehicleUpdate } from '@/app/actions/vehicleupdate';

export default function VehicleFormComponent({ vehicle, valueButton }: VehicleFormComponentProps) {
    const [state, action, pending] = useActionState(valueButton === 'Editar' ? vehicleUpdate : vehicleUp, undefined);
    const [formData, setFormData] = useState({
        renavam: vehicle?.renavam ?? '',
        plate: vehicle?.plate ?? '',
        km: vehicle?.km ?? '',
        model: vehicle?.model ?? '',
        automaker: vehicle?.automaker ?? ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        setFormData({
            model: '',
            automaker: '',
            renavam: '',
            plate: '',
            km: ''
        });
    };

    useEffect(() => {
        if (state?.message) {
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            resetForm();
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        };
    }, [state]);
    return (
        <form
            className='max-w-[280px] w-full flex flex-col gap-[5px] text-sm bg-white shadow rounded-lg p-2 mb-2'
            action={action}
        >
            <div className='flex flex-col'>
                <label htmlFor='model'>Modelo</label>
                <input
                    className='w-full border border-blue-300 rounded p-0.5'
                    id='model'
                    name='model'
                    value={formData.model}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.model && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.model}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='automaker'>Montadora</label>
                <input
                    className='w-full border border-blue-300 rounded p-0.5'
                    id='automaker'
                    name='automaker'
                    value={formData.automaker}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.automaker && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.automaker}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='renavam'>Renavam</label>
                <input
                    className={`w-full border border-blue-300 rounded p-0.5 ${valueButton === 'Editar' ? 'cursor-no-drop' : ''}`}
                    id='renavam'
                    name='renavam'
                    value={formData.renavam}
                    onChange={handleChange}
                    readOnly={valueButton === 'Editar' ? true : false}
                    required
                />
                {state?.errors?.renavam && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.renavam}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='plate'>Placa</label>
                <input
                    className='w-full border border-blue-300 rounded p-0.5'
                    id='plate'
                    name='plate'
                    value={formData.plate}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.plate && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.plate}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='km'>Km</label>
                <input
                    className={`w-full border border-blue-300 rounded p-0.5 ${valueButton === 'Editar' ? 'cursor-no-drop' : ''}`}
                    id='km'
                    name='km'
                    value={formData.km}
                    onChange={handleChange}
                    readOnly={valueButton === 'Editar' ? true : false}
                    required
                />
            </div>

            <div className='flex justify-around pt-2 duration-[400ms]'>
                <ButtonComponent
                    type='submit'
                    disabled={pending}
                >
                    {pending
                        ? `${valueButton === 'Cadastrar'
                            ? 'Cadastrando...'
                            : 'Editando'}`
                        : `${valueButton}`
                    }
                </ButtonComponent>
            </div>
        </form>
    );
}