'use client';

import { calculateAge } from '@/app/ts/calcAge';
import {
    useActionState,
    useEffect,
    useRef,
    useState
} from 'react';
import ButtonComponent from '@/components/button';
import { driverUp } from '@/app/actions/driverup';
import { Toast } from '@/app/ts/sweetAlert';
import { checkedZipCode } from '@/app/ts/viaCep';
import { ZipCodeError } from '@/interfaces/interfaces';
import { DriverFormComponentProps } from '@/types/types';

export default function DriverFormComponent({ driver, valueButton }: DriverFormComponentProps) {
    const [state, action, pending] = useActionState(driverUp, undefined);
    const [formData, setFormData] = useState({
        name: driver?.cnhs?.cpfs?.name ?? '',
        cpf: driver?.cnhs?.cpfs?.cpf ?? '',
        cnh: driver?.cnhs?.cnh ?? '',
        birthdate: driver?.cnhs?.cpfs?.birthdate ?? '',
        phone: driver?.phones?.phone ?? '',
        email: driver?.phones?.email ?? '',
        zipcode: driver?.addresses?.zipcodes?.zipcode ?? '',
        street: driver?.addresses?.zipcodes?.street ?? '',
        district: driver?.addresses?.zipcodes?.district ?? '',
        city: driver?.addresses?.zipcodes?.city ?? '',
        number_residence: driver?.addresses?.number_residence ?? '',
        type_residence: driver?.addresses?.type_residence ?? 'house',
        building: driver?.addresses?.building ?? '',
        block: driver?.addresses?.block ?? '',
        livingapartmentroom: driver?.addresses?.livingapartmentroom ?? '',
        reference_point: driver?.addresses?.reference_point ?? ''
    });
    const [zipCodeErrors, setZipCodeErrors] = useState<ZipCodeError>({
        zipcode: null
    });
    const zipCodeRef = useRef<HTMLInputElement | null>(null);
    const numberResidenceRef = useRef<HTMLInputElement | null>(null);
    const [age, setAge] = useState<number>(0);

    const handleZipCodeChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        checkedZipCode({
            element,
            setFormData,
            setZipCodeErrors,
            zipCodeRef,
            numberResidenceRef
        });
    };

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

    const resetForm = () => {
        setFormData({
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
        setAge(0);
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
                <label htmlFor='name'>Nome</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.name && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.name}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
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
                {state?.errors?.cpf && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.cpf}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
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
                {state?.errors?.cnh && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.cnh}
                    </p>
                )}
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
                    {state?.errors?.birthdate && (
                        <p className='text-red-500 text-xs pl-2'>
                            {state.errors.birthdate}
                        </p>
                    )}
                </div>
                <div className='px-2 text-center'>
                    <p>{age}</p>
                    <p>anos</p>
                </div>
            </div>

            <div className='flex flex-col'>
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
                {state?.errors?.phone && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.phone}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
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
                {state?.errors?.email && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.email}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='zipcode'>CEP</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='zipcode'
                    name='zipcode'
                    type='number'
                    value={formData.zipcode}
                    onChange={handleChange}
                    onBlur={handleZipCodeChange}
                    required
                    ref={zipCodeRef}
                />
                {zipCodeErrors.zipcode && (
                    <p className='text-red-500 text-xs pl-2'>
                        {zipCodeErrors.zipcode}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='street'>Logradouro: Av/Rua/Trav</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='street'
                    name='street'
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.street && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.street}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
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

            <div className='flex flex-col'>
                <label htmlFor='city'>Cidade</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.city && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.city}
                    </p>
                )}
            </div>

            <div className='flex gap-3 justify-center items-center text-center'>
                <div className='flex gap-1 items-center'>
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
                <div className='flex gap-1 items-center'>
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

            <div className='flex flex-col'>
                <label htmlFor='number_residence'>Nº Casa/Edifício</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='number_residence'
                    name='number_residence'
                    value={formData.number_residence}
                    onChange={handleChange}
                    required
                    ref={numberResidenceRef}
                />
                {state?.errors?.number_residence && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.number_residence}
                    </p>
                )}
            </div>

            {formData.type_residence === 'buildings' && (
                <div>
                    <div className='flex flex-col'>
                        <label htmlFor='building'>Nome do Edifício</label>

                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='building'
                            name='building'
                            value={formData.building}
                            onChange={handleChange}
                            required
                        />
                        {state?.errors?.building && (
                            <p className='text-red-500 text-xs pl-2'>
                                {state.errors.building}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='block'>Bloco</label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='block'
                            name='block'
                            value={formData.block}
                            onChange={handleChange}
                            required
                        />
                        {state?.errors?.block && (
                            <p className='text-red-500 text-xs pl-2'>
                                {state.errors.block}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='livingapartmentroom'>Apartamento/Sala</label>
                        <input
                            className='border border-blue-300 rounded p-0.5'
                            id='livingapartmentroom'
                            name='livingapartmentroom'
                            value={formData.livingapartmentroom}
                            onChange={handleChange}
                            required
                        />
                        {state?.errors?.livingapartmentroom && (
                            <p className='text-red-500 text-xs pl-2'>
                                {state.errors.livingapartmentroom}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className='flex flex-col'>
                <label htmlFor='reference_point'>Ponto de Referência</label>
                <textarea
                    className='border border-blue-300 rounded p-0.5'
                    id='reference_point'
                    name='reference_point'
                    value={formData.reference_point}
                    onChange={handleChange}
                    required
                />
                {state?.errors?.reference_point && (
                    <p className='text-red-500 text-xs pl-2'>
                        {state.errors.reference_point}
                    </p>
                )}
            </div>

            <div className='flex justify-around pt-2 duration-[400ms]'>
                <ButtonComponent
                    type='submit'
                    disabled={pending}
                >
                    {pending
                        ? `${valueButton === 'Editar' ? 'Editando...' : 'Cadastrando...'}`
                        : `${valueButton}`
                    }
                </ButtonComponent>
            </div>
        </form>
    );
}