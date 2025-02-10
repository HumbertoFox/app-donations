import Image from 'next/image';
import Logo from '@/images/LOGOBFN-INTER.png';

export default function ApplicationLogo() {
    return <Image
        src={Logo}
        alt='Logo BetoFoxNet_Info'
    />;
}