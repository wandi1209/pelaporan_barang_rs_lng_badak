import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Sidebar from './Sidebar';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { url } = usePage();
    const adminSidebar = url.includes('admin');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sidebarButton = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const sidebarMainButton = () => {
        setIsMenuOpen(false);
    }
    return (
        <div className="min-h-screen bg-main">
            <nav className="bg-quaternary fixed w-full z-50"
                onClick={sidebarMainButton}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <Icon>
                                                    person
                                                </Icon>

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:bg-cyan-700 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>

                    <div className="pt-4 pb-1 border-t border-gray-800">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.name}</div>
                            <div className="font-medium text-sm text-white">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && adminSidebar ? (
                <header className="text-white shadow fixed z-40 w-full pt-16 flex items-center bg-cyan-900">
                        <Icon 
                            className='fixed p-2 ml-4 hover:bg-gray-400 hover:scale-110 transition-transform duration-300 rounded-xl cursor-pointer'
                            onClick={sidebarButton}    
                        >
                            menu
                        </Icon>
                    <div className="w-full text-center mx-auto py-6 px-4 text-white sm:px-6 lg:px-24">{header}</div>
                </header>
            ) : (
                <header className="text-white shadow fixed z-40 w-full pt-16 flex items-center bg-cyan-900">
                    <div className="w-full mx-auto py-6 px-4 text-white sm:px-6 lg:px-24">
                        <div className="flex justify-between font-semibold lg:text-xl text-sm leading-tight w-full">
                            <Link href={route('laporan.saya.index')} className={`transition duration-300 ${url.includes('laporan-saya') ? 'underline' : 'hover:scale-110'}`}>
                                <h1>Laporan Saya</h1>
                            </Link>
                            <Link href={route('dashboard')} className={`transition duration-300 ${url.includes('dashboard') ? 'underline' : 'hover:scale-110'}`}>
                                <h1>Panduan</h1>
                            </Link>
                            <Link href={route('formulir.index')} className={`transition duration-300 ${url.includes('formulir') ? 'underline' : 'hover:scale-110'}`}>
                                <h1>Formulir</h1>
                            </Link>
                        </div>
                    </div>
                </header>
            )}
            <Sidebar isMenuOpen={isMenuOpen} auth={{ user }} />
            <main 
                className='pt-28 z-20'
                onClick={sidebarMainButton}>
                {children}
            </main>
        </div>
    );
}
