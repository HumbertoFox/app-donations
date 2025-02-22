'use client';

import { getDonorId } from '@/app/actions/getdonor';
import { Toast } from '@/app/ts/sweetAlert';
import DonationFormComponent from '@/components/form_donation';
import DonorFormComponent from '@/components/form_donor';
import { useSearchParams } from 'next/navigation';
import {
    useEffect,
    useState
} from 'react';

export default function DonationRegisterPage() {
    const searchParams = useSearchParams();
    const [donor, setDonor] = useState<null | object>(null);
    const [donorId, setDonorId] = useState<string | null>();
    const idParams = searchParams.get('id');
    const id = idParams ? BigInt(idParams) : 0;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGetDonor = async () => {
            const data = await getDonorId(id);

            if (data.info) {
                Toast.fire({
                    icon: 'info',
                    title: data.info
                });
                setDonor(null);
                setDonorId(null);
                setLoading(false);
            } else {
                setDonor(data.data || null);
                setDonorId(data.data?.id);
                setLoading(false);
            };
        };

        fetchGetDonor();
    }, [id]);    
    if (loading) {
        return (
            <div className='max-w-screen-2xl h-dvh flex justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
                <div className='w-full flex justify-center items-center py-10'>
                    <div className='animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-screen-2xl h-dvh flex justify-start items-start pl-[200px] max-[1080px]:pl-[70px] duration-500 ease-in-out'>
            <DonorFormComponent
                donor={donor}
                valueButton=''
            />
            <DonationFormComponent
                donorid={donorId}
                donation={null}
                valueButton='Cadastrar'
            />
        </div>
    );
}