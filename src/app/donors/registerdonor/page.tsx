import DonorFormComponent from '@/components/form_donor';

export default function DonorRegisterPage() {
    return (
        <div className='max-w-screen-2xl h-dvh flex justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <DonorFormComponent
                donor={null}
                valueButton='Cadastrar'
            />
        </div>
    );
}