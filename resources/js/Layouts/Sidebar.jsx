import { Link, usePage } from "@inertiajs/react"
import Icon from "@/Components/Icon"
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Sidebar({ auth, isMenuOpen }) {
    const { url } = usePage();
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        // Fetch the badge count
        const fetchBadgeCount = async () => {
        try {
            const response = await axios.get('/sidebar/count');
            setBadgeCount(response.data.badgeCount);
        } catch (error) {
            console.error('Error fetching badge count:', error);
        }
        };

        fetchBadgeCount();
    }, []);
    return(
        <div className={`fixed left-0 bg-gray-50 h-screen lg:w-1/4 w-10/12 pt-32 z-30 transition-transform ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="m-5">
                <Link href={route('admin.dashboard')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('dashboard') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        widgets
                    </Icon>
                    <span className="pl-2">
                        Dashboard
                    </span>
                </Link>
                {auth.user.role == 'admin' &&
                <>
                    <Link href={route('admin.user.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('user') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                        <Icon className="font-xl">
                            person
                        </Icon>
                        <span className="pl-2">
                            User
                        </span>
                    </Link>
                    <Link href={route('admin.badge.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('nomor-badge') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                        <Icon className="font-xl">
                            badge
                        </Icon>
                        <span className="pl-2">
                            Nomor Badge
                        </span>
                    </Link>
                </>}
                <Link href={route('admin.unit.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('unit') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        ad_units
                    </Icon>
                    <span className="pl-2">
                        Unit
                    </span>
                </Link>
                <Link href={route('admin.ruangan.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('ruangan') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        location_on
                    </Icon>
                    <span className="pl-2">
                        Ruangan
                    </span>
                </Link>
                <Link href={route('admin.asset.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('asset') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        web_asset
                    </Icon>
                    <span className="pl-2">
                        Nomor Aset
                    </span>
                </Link>
                <Link href={route('admin.laporan.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('laporan') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        lab_profile
                    </Icon>
                    <span className="pl-2">
                        Laporan
                        {badgeCount > 0 && 
                        <div className="badge bg-red-500 text-white ml-1">
                            {badgeCount}
                        </div>
                        }
                    </span>
                </Link>
                <Link href={route('admin.cetak.laporan.index')} className={`flex items-center hover:bg-gray-200 rounded-xl p-3 m-1 trasnsition-transform duration-300 text-lg font-medium text-gray-700 ${url.includes('cetak') ? 'bg-gray-200' : 'hover:scale-105'}`}>
                    <Icon className="font-xl">
                        print
                    </Icon>
                    <span className="pl-2">
                        Cetak Laporan
                    </span>
                </Link>
            </div>
        </div>
    )
}