import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import Icon from '@/Components/Icon';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ auth, pieChartData, menunggu, proses, selesai, laporanAll, currentYearReports,   currentMonthReports, currentDayReports }) {
    const pieData = {
        labels: [
            'Menunggu Respon Petugas',
            'Sedang Diproses',
            'Selesai'
        ],
        datasets: [{
            label: 'Laporan',
            data: pieChartData.values,
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(0, 255, 0)'
            ],
            hoverOffset: 4
        }]
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className='flex flex-wrap justify-center px-5'>
                            <div className='flex flex-wrap justify-center w-full'>
                                <div className='relative w-72 animate__animated animate__fadeInLeft animate__slow m-4 overflow-hidden bg-gradient-to-r from-sky-400 to-sky-600  tracking-widest text-white h-min rounded-md'>
                                    <Icon className='absolute right-0 top-5 text-9xl opacity-70 translate-x-12 text-sky-200'>
                                        history
                                    </Icon>
                                    <div className='text-lg pt-6 mr-12 ml-4 uppercase'>
                                        Total Laporan
                                    </div>
                                    <div className='font-extrabold pb-6 text-6xl ml-8'>
                                        {laporanAll}
                                    </div>
                                </div>
                                <div className='relative animate__animated animate__fadeInLeft animate__slow w-72 m-4 overflow-hidden bg-gradient-to-r from-stone-400 to-stone-600  tracking-widest text-white h-min rounded-md'>
                                    <Icon className='absolute right-0 top-5 text-9xl opacity-70 translate-x-12 text-sky-200'>
                                        calendar_month
                                    </Icon>
                                    <div className='text-lg pt-6 mr-12 ml-4 uppercase'>
                                        Laporan Tahun Ini
                                    </div>
                                    <div className='font-extrabold pb-6 text-6xl ml-8'>
                                        {currentYearReports}
                                    </div>
                                </div>
                                <div className='relative animate__animated animate__fadeInRight animate__slow w-72 m-4 overflow-hidden bg-gradient-to-r from-red-400 to-red-600  tracking-widest text-white h-min rounded-md'>
                                    <Icon className='absolute right-0 top-5 text-9xl opacity-70 translate-x-12'>
                                        calendar_view_day
                                    </Icon>
                                    <div className='text-lg pt-6 mr-12 ml-4 uppercase'>
                                        Laporan Bulan Ini
                                    </div>
                                    <div className='font-extrabold pb-6 text-6xl ml-8'>
                                        {currentMonthReports}
                                    </div>
                                </div>
                                <div className='relative animate__animated animate__fadeInRight animate__slow w-72 m-4 overflow-hidden bg-gradient-to-r from-green-400 to-green-600  tracking-widest text-white h-min rounded-md'>
                                    <Icon className='absolute right-0 top-5 text-9xl opacity-70 translate-x-12'>
                                        today
                                    </Icon>
                                    <div className='text-xl pt-6 mr-12 ml-4 uppercase'>
                                        Laporan Hari Ini
                                    </div>
                                    <div className='font-extrabold pb-6 text-6xl ml-8'>
                                        {currentDayReports}
                                    </div>
                                </div>
                            </div>
                            <div className='p-3 bg-sky-300 rounded-xl animate__animated animate__fadeInUp animate__slow'>
                                <div className='text-center font-bold text-xl bg-sky-900 rounded-lg text-white py-2'>Laporan Status</div>
                                <Pie data={pieData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
