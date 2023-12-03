import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import GuestButton from '@/Components/GuestButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        jabatan: '',
        nomor_badge: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className='text-white w-full text-center'>
                    <Icon className='text-6xl'>
                        account_circle
                    </Icon>
                </div>
                <div className='font-extrabold text-2xl w-full text-center text-white'>
                    <span>
                        Register
                    </span>
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nama" className='text-white'/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nomor_badge" value="Nomor Badge"  className='text-white'/>

                    <TextInput
                        id="nomor_badge"
                        type="text"
                        name="nomor_badge"
                        value={data.nomor_badge}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('nomor_badge', e.target.value)}
                        required
                    />

                    <InputError message={errors.nomor_badge} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="jabatan" value="Jabatan"  className='text-white'/>

                    <TextInput
                        id="jabatan"
                        type="text"
                        name="jabatan"
                        value={data.jabatan}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('jabatan', e.target.value)}
                        required
                    />

                    <InputError message={errors.jabatan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className='text-white' />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className='text-white' />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='text-white' />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 w-full">
                    <GuestButton className="flex justify-center w-full" disabled={processing}>
                        Register
                    </GuestButton>
                    <Link
                        href={route('login')}
                        className="underline text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
