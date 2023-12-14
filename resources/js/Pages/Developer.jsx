import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import { usePage, Link } from '@inertiajs/react';

export default function Developer(){
    const { url } = usePage();

    return(
        <div className='bg-main w-screen flex md:flex-col flex-wrap items-center justify-center md:h-screen overflow-hidden'>
            <Head title="Developer" />

            <Link href={route('login')} className='fixed top-5 left-5 md:block hidden cursor-pointer hover:bg-gray-200 hover:scale-110 transition duration-300 rounded-full px-2 pt-2 pb-'>
                <Icon>
                    arrow_back
                </Icon>
            </Link>

            <div className='text-center font-extrabold text-4xl pb-2 animate__animated animate__fadeInDown animate__slower text-gray-800 font-serif tracking-wider'>PKL SMK Negeri 1 Bontang Tahun 2023</div>
            <div className='flex flex-wrap w-max w-96 bg-amber-700 mb-4 justify-center rounded-lg animate__animated animate__fadeInRight animate__slower'> 
                <div className='text-center m-3'>
                    <img src="/img/wandi.png" alt="Dev" className='rounded-lg h-40'/>
                </div>
                <div className='relative bg-sky-200 m-3 w-96 px-5 rounded-lg py-3'>
                    <div className='tracking-widest text-3xl font-bold uppercase'>Wandi</div>
                    <div>Rekayasa Perangkat Lunak</div>
                    <div className='underline'>wandider@gmail.com</div>
                    <div>
                        ig : @wnd_130
                    </div>
                    <Icon className='absolute right-0 top-9 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
                        GRADE
                    </Icon>
                </div>
            </div>
            <div className='flex flex-wrap w-max bg-amber-700 mb-4 justify-center rounded-lg animate__animated animate__fadeInLeft animate__slower'>
                <div className='text-center m-3'>
                    <img src="/img/sultan.png" alt="Dev" className='rounded-lg h-40'/>
                </div>
                <div className='bg-sky-200 m-3 w-96 px-5 rounded-lg py-5'>
                    <div className='tracking-widest text-3xl font-bold uppercase'>Sultan Syarif</div>
                    <div>Rekayasa Perangkat Lunak</div>
                    <div className='underline'>sultansyarif630@gmail.com</div>
                    <div>
                        ig : @sltn.syrf
                    </div>
                    <Icon className='absolute right-0 top-11 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
                        bolt
                    </Icon>
                </div>
            </div>
            <div className='flex flex-wrap w-max bg-amber-700 mb-4 justify-center rounded-lg animate__animated animate__fadeInRight animate__slower'>
                <div className='w-28 text-center m-3'>
                    <img src="/img/rima.png" alt="Dev" className='rounded-lg'/>
                </div>
                <div className='bg-sky-200 m-3 w-96 px-5 rounded-lg py-5'>
                    <div className='tracking-widest text-3xl font-bold uppercase'>Rima Fakhirah</div>
                    <div>Rekayasa Perangkat Lunak</div>
                    <div className='underline'>rimafakhirah15@gmail.com</div>
                    <div>
                        ig : @rima_fkhr
                    </div>
                    <Icon className='absolute right-0 top-11 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
                        cruelty_free
                    </Icon>
                </div>
            </div>
        </div>
    )
}