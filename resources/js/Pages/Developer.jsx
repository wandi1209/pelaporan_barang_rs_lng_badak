import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Developer(){
    return(
        <div className='bg-main flex flex-col flex-wrap items-center justify-center h-screen sm:h-auto overflow-hidden'>
            <Head title="Developer" />

            <div className='text-center font-extrabold text-4xl pb-2 animate__animated animate__fadeInDown animate__slower text-gray-800 font-serif tracking-wider'>PKL SMK Negeri 1 Bontang</div>
            <div className='flex flex-wrap w-max bg-amber-700 mb-4 justify-center rounded-lg animate__animated animate__fadeInRight animate__slower'>
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
                    <Icon className='text-white absolute right-0 top-9 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
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
                    <Icon className='text-white absolute right-0 top-11 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
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
                    <Icon className='text-white absolute right-0 top-11 text-9xl translate-x-12 translate-y-12 opacity-50 text-sky-400'>
                        cruelty_free
                    </Icon>
                </div>
            </div>
        </div>
    )
}