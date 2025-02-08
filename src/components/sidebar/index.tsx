'use client';

import Link from 'next/link';
import ApplicationLogo from '@/components/logo/ApplicationLogo';
import { usePathname } from 'next/navigation';
import Icons from '@/components/icons';

const classLinks = 'flex items-center p-2.5 gap-[15px] duration-500 text-black hover:bg-[#79D1FF] hover:text-white ease-in-out';

const menuItems = [
    { title: 'Cadastrar Doação', icon: 'fa-solid fa-pen-to-square', route: '/donations/registerdonation' },
    { title: 'Cadastrar Doador', icon: 'fa-solid fa-user-plus', route: '/donors/registerdonor' },
    { title: 'Editar Doação', icon: 'fa-regular fa-pen-to-square', route: '/donations/editdonation' },
    { title: 'Editar Doador', icon: 'fa-solid fa-user-pen', route: '/donors/editdonor' },
    { title: 'Agendar Coleta', icon: 'fa-solid fa-file-circle-plus', route: '/menu/record' },
    { title: 'Confirmar Coleta', icon: 'fa-solid fa-file-circle-check', route: '/menu/confirmed' },
    { title: 'Relatório', icon: 'fa-solid fa-file-lines', route: '/menu/report' },
    { title: 'Agenda', icon: 'fa-solid fa-calendar-days', route: '/menu/agenda' }
];

export default function SidebarComponent() {
    const pathname = usePathname();

    return (
        <nav className='w-[200px] h-full flex flex-col fixed border-r-[3px] border-[#79D1FF] bg-[#AAF998] duration-500 overflow-hidden max-[1080px]:w-[70px] ease-in-out'>
            <Link
                className='max-w-[110px] mx-auto duration-500 ease-in-out'
                href='/menu'
                title='Menu'
            >
                <ApplicationLogo />
            </Link>

            <ul>

                {menuItems.map(({ title, icon, route }, index) => (
                    <li
                        key={index}
                        title={title}
                    >
                        <Link
                            className={`${classLinks} ${pathname === route && 'bg-[#79D1FF] text-black hover:text-white'}`}
                            href={route}
                            aria-label={title}
                            role='menuitem'
                        >
                            <Icons icon={icon} className='w-8 h-8' />
                            <span className='text-sm max-[1080px]:hidden'>
                                {title}
                            </span>
                        </Link>
                    </li>
                ))}

                <li
                    className='duration-500 mt-4 ease-in-out'
                    title='Sair/Logout'
                >
                    <Link
                        className='flex items-center p-2.5 gap-[15px] duration-500 hover:text-red-600 hover:font-bold active:bg-[#79D1FF] ease-in-out'
                        href='/logout'
                        role='button'
                    >
                        <Icons
                            icon='fa-solid fa-right-from-bracket'
                            className='w-8 h-8 rotate-180'
                        />
                        <span className='text-sm max-[1080px]:hidden'>
                            Sair do Sistema
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}