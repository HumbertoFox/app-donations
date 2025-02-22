import DonationFormComponent from '@/components/form_donation';

export default function DonationEditPage() {
    return (
        <div className='max-w-screen-2xl h-dvh flex justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <DonationFormComponent
                valueButton='Editar'
            />
        </div>
    );
}