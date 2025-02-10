import FormLoginComponent from '@/components/form_login';
import ApplicationLogo from '@/components/logo';

export default function LoginPage() {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <div className='w-24'>
                <ApplicationLogo />
            </div>
            <FormLoginComponent />
        </div>
    );
}