import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from 'react-select';
import { Inertia } from '@inertiajs/inertia';

export default function Form({ auth, unit, ruangan, inventaris }) {
    const { csrf_token } = usePage().props;
    const [assetOptions, setAssetOptions] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState([]);
    const { data, setData, post , errors } = useForm({
        nama_barang: '',
        asset: null,
        id_unit: '',
        id_ruangan: '',
        kategori: '',
        keterangan: '',
        gambar: null,
    });

    const handleGambarChange = (e) => {
        const files = Array.from(e.target.files);
        setData('gambar', files);
    };

    const unitOptions = unit.map((item) => ({ value: item.id, label: item.nama }));
    const ruanganOptions = ruangan
        .filter((item) => item.id_unit === selectedUnit)
        .map((item) => ({ value: item.id, label: item.nama }));

    const kategoriOptions = [
        { value: 'Medis', label: 'Medis' },
        { value: 'Non Medis', label: 'Non Medis' },
    ];

    useEffect(() => {
        const options = [].concat(
            { value: '', label: 'Tidak Ada Nomor Asset' },
            inventaris.map((item) => ({
                value: item.id,
                label: `${item.nomor} - (${item.nama_barang})`,
            }))
        );
        setAssetOptions(options);
    }, [inventaris]);

    const submit = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('nama_barang', data.nama_barang);
            formData.append('asset', data.asset);
            formData.append('id_unit', selectedUnit.value);
            formData.append('id_ruangan', data.id_ruangan);
            formData.append('kategori', data.kategori);
            formData.append('keterangan', data.keterangan);
            data.gambar.forEach((file) => {
                formData.append(`gambar[]`, file);
            });
            await post(route('formulir.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-Token': csrf_token,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Formulir" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='text-center text-2xl font-bold bg-cyan-900 text-white p-3'>Formulir Laporan</div>
                        <form onSubmit={submit} encType='multipart/form-data'>
                            <div className='p-3'>
                                <div>
                                    <InputLabel htmlFor="nama_barang" value="Nama Barang" />

                                    <TextInput
                                        id="nama_barang"
                                        type="text"
                                        name="nama_barang"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('nama_barang', e.target.value)}
                                    />

                                    <InputError message={errors.nama_barang} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="asset" value="Nomor Aset" />
                                    <Select
                                        id="asset"
                                        name="asset"
                                        className="mt-1 block w-full"
                                        options={assetOptions}
                                        onChange={(selectedOption) => setData('asset', selectedOption.value)}
                                    />
                                    <InputError message={errors.asset} className="mt-2" />
                                </div>
                                
                                <div className='mt-4'>
                                    <InputLabel htmlFor="id_unit" value="Unit Barang Berada" />

                                    <Select
                                        id="id_unit"
                                        name="id_unit"
                                        className="mt-1 block w-full"
                                        options={unitOptions}
                                        onChange={(selectedOption) => {
                                            setSelectedUnit(selectedOption.value);
                                            setData('id_unit', selectedOption.value);
                                        }}
                                    />

                                    <InputError message={errors.id_unit} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="id_ruangan" value="Ruangan Barang Berada" />

                                    <Select
                                        id="id_ruangan"
                                        name="id_ruangan"
                                        className="mt-1 block w-full"
                                        options={ruanganOptions}
                                        onChange={(selectedOption) => setData('id_ruangan', selectedOption.value)}
                                    />

                                    <InputError message={errors.id_ruangan} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="kategori" value="Kategori" />
                                    
                                    <Select
                                        id="kategori"
                                        name="kategori"
                                        className="mt-1 block w-full"
                                        options={kategoriOptions}
                                        onChange={(selectedOption) => setData('kategori', selectedOption.value)}
                                    />

                                    <InputError message={errors.kategori} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="keterangan" value="Keterangan" />

                                    <TextArea
                                        id="keterangan"
                                        type="text"
                                        name="keterangan"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                    />

                                    <InputError message={errors.keterangan} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="gambar" value="Bukti Barang Rusak" />

                                    <input
                                        id="gambar"
                                        type="file"
                                        name="gambar"
                                        multiple
                                        className="mt-1 block w-full bg-white file-input file-input-bordered"
                                        onChange={handleGambarChange}
                                    />

                                    <InputError message={errors.gambar} className="mt-2" />
                                </div>
                                <div className='mt-6'>
                                    <PrimaryButton>
                                        Laporkan
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
