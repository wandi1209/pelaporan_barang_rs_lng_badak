import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center lg:pt-6 px-3 lg:px-0 sm:pt-0 bg-rs">
            <div className='fixed top-2 right-4'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden rounded-lg bg-gray-900/75">
                {children}
            </div>
        </div>
    );
}
