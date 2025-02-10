'use client';

import {
    useActionState,
    useEffect,
    useState
} from 'react';
import ButtonComponent from '@/components/button';
import Link from 'next/link';
import Icons from '@/components/icons';
import { signin } from '@/app/actions/authin';
import { Toast } from '@/app/ts/sweetAlert';
import { useRouter } from 'next/navigation';

export default function FormLoginComponent() {
    const [state, action, pending] = useActionState(signin, undefined);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const [isVisibledPassword, setIsVisibledPassword] = useState(false);

    const togglePasswordVisibility = () => setIsVisibledPassword(!isVisibledPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'remember' ? checked : value
        });
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            remember: false
        });
    };

    useEffect(() => {
        if (state?.message) {
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            resetForm();
            router.push('/');
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        };
    }, [router, state]);
    return (
        <form
            className='max-w-[280px] w-full flex flex-col gap-[5px] text-sm shadow rounded-lg p-2 mb-2'
            action={action}
        >
            <div className='flex flex-col'>
                <label htmlFor='email'>E-mail</label>
                <input
                    className='border border-blue-300 rounded p-0.5'
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                {state?.errors?.email && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.email}
                    </p>
                )}
            </div>

            <div className='flex flex-col'>
                <label htmlFor='password'>Senha</label>

                <div className='relative'>
                    <input
                        className='w-full border border-blue-300 rounded p-0.5'
                        id='password'
                        type={isVisibledPassword ? 'text' : 'password'}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        className='absolute right-2 top-1 opacity-50 hover:opacity-100 duration-500'
                        onClick={togglePasswordVisibility}
                    >
                        {isVisibledPassword ? (
                            <Icons icon='fa-regular fa-eye-slash' />
                        ) : (
                            <Icons icon='fa-regular fa-eye' />
                        )}
                    </button>
                </div>
                {state?.errors?.password && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.password}
                    </p>
                )}
            </div>

            <div className='mt-4 block'>
                <label className='flex items-center'>
                    <input
                        id='remember'
                        name='remember'
                        type='checkbox'
                        checked={formData.remember}
                        onChange={handleChange}
                    />
                    <span className='ms-2 text-sm text-gray-600'>
                        Lembre de mim
                    </span>
                </label>
            </div>

            <div className='flex items-center justify-between'>
                <Link
                    className='rounded-md text-sm text-gray-600 no-underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:underline'
                    href={'#'}
                >
                    Esqueceu sua senha?
                </Link>

                <ButtonComponent
                    type='submit'
                    disabled={pending}
                >
                    {pending ? 'Conectando...' : 'Conecte-se'}
                </ButtonComponent>
            </div>
        </form>
    );
}