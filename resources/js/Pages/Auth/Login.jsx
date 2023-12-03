import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import GuestButton from '@/Components/GuestButton';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nomor_badge: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className='text-white w-full text-center'>
                    <Icon className='text-6xl'>
                        account_circle
                    </Icon>
                </div>
                <div className='font-extrabold text-2xl w-full text-center text-white'>
                    <span>
                        Login
                    </span>
                </div>
                <div>
                    <InputLabel htmlFor="nomor_badge" value="Nomor Badge" className='text-white' />

                    <TextInput
                        id="nomor_badge"
                        type="text"
                        name="nomor_badge"
                        value={data.nomor_badge}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('nomor_badge', e.target.value)}
                    />

                    <InputError message={errors.nomor_badge} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className='text-white' />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-4">
                    <GuestButton className="w-full flex justify-center" disabled={processing}>
                        Log in
                    </GuestButton>
                    <div className='flex justify-between mt-2'>
                        <Link
                            href={route('register')}
                            className="underline text-sm text-white hover:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           No Have Account ?
                        </Link>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-white hover:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
