import DriverFormComponent from '@/components/form_driver';
import Icons from '@/components/icons';
import Link from 'next/link';

export default function DriverRegisterPage() {
    return (
        <div className='max-w-screen-2xl min-h-screen flex flex-col justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full flex justify-between max-md:flex-col max-md:items-center p-1'>
                <h2 className='text-lg font-semibold leading-tight text-gray-800 text-center text-nowrap'>
                    Cadastrar Motorista
                </h2>

                <nav className='text-sm text-gray-500 dark:text-gray-400'>
                    <Link
                        href={'/menu'}
                        className='hover:text-gray-700 dark:text-gray-300 duration-300'
                    >
                        Menu
                    </Link>

                    <span className='mx-1'>/</span>

                    <Link
                        href={'/drivers'}
                        className='hover:text-gray-700 dark:text-gray-300 duration-300'
                    >
                        Motoristas
                    </Link>

                    <span className='mx-1'>/</span>

                    <span className='cursor-default text-nowrap'>Cadastrar Motorista</span>
                </nav>
            </div>
            <div className='w-full min-h-full flex flex-col justify-center items-center max-md:justify-start gap-4'>
                <Icons
                    className='text-[45px] text-[blue] p-2'
                    icon='fa-solid fa-address-card'
                />
                <DriverFormComponent />
            </div>
        </div>
    );
}