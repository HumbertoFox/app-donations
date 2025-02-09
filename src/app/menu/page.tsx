import Icons from '@/components/icons';
import Link from 'next/link';

const linksItems = [
    { title: 'Início', icon: 'fa-solid fa-house', route: '/', hover: 'hover:text-[blue]' },
    { title: 'Cadastrar Usuário', icon: 'fa-solid fa-user-plus', route: '', hover: 'hover:text-[blue]' },
    { title: 'Usuários Cadastrados', icon: 'fa-solid fa-users-gear', route: '', hover: 'hover:text-[orange]' },
    { title: 'Cadastrar Veículo', icon: 'fa-solid fa-truck-medical', route: '/vehicles/registervehicle', hover: 'hover:text-[blue]' },
    { title: 'Veículos Cadastrados', icon: 'fa-solid fa-truck', route: '/vehicles', hover: 'hover:text-[orange]' },
    { title: 'Cadastrar Motorista', icon: 'fa-solid fa-address-card', route: '/drivers/registerdriver', hover: 'hover:text-[blue]' },
    { title: 'Motoristas Cadastrados', icon: 'fa-regular fa-address-card', route: '/drivers', hover: 'hover:text-[orange]' },
    { title: 'Cadastrar Ajudante', icon: 'fa-solid fa-id-card', route: '/helpers/registerhelper', hover: 'hover:text-[blue]' },
    { title: 'Ajudantes Cadastrados', icon: 'fa-regular fa-id-card', route: '/helpers', hover: 'hover:text-[orange]' }
];

export default function MenuComponent() {
    return (
        <div className='max-w-screen-2xl h-dvh max-md:h-full flex flex-col max-md:flex-col-reverse justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <div className='w-full h-full flex justify-center p-1'>
                <div className='max-w-7xl h-full flex justify-center items-center flex-wrap gap-20 sm:px-6 lg:px-8'>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <nav className='flex flex-wrap justify-center items-center gap-8 p-8 text-gray-900'>
                            {linksItems.map(({
                                route,
                                icon,
                                title,
                                hover
                            }, index) => (
                                <Link
                                    key={index}
                                    href={route}
                                    title={title}
                                    aria-label={title}
                                >
                                    <Icons
                                        className={`text-[95px] text-[green] duration-[400ms] ${hover}`}
                                        icon={icon}
                                    />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg'>
                    <div className='p-6 text-gray-900'>
                        Você está logado!
                    </div>
                </div>
            </div>
        </div>
    );
}