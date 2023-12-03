import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Select from 'react-select';

export default function CetakLaporan({ auth, asset, unit, ruangan }) {
    const { data, setData, errors } = useForm({
        kode: '',
        id_asset: '',
        id_unit: '',
        id_ruangan: '',
        kategori: '',
        tanggal_awal: '',
        tanggal_akhir: '',

    });
    
    const unitOptions = unit.map((item) => ({ value: item.id, label: item.nama }));
    const ruanganOptions = ruangan.map((item) => ({ value: item.id, label: item.nama }));
    const assetOptions = [].concat(
        asset.map((item) => ({
            value: item.id,
            label: `${item.nomor} - (${item.nama_barang})`,
        }))
    );
    const kategoriOptions = [
        { value: 'Medis', label: 'Medis' },
        { value: 'Non Medis', label: 'Non Medis' },
    ];

    const handlePrintPDF = async () => {
        const dataToPrint = {
            kode: data.kode,
            id_asset: data.id_asset,
            id_unit: data.id_unit,
            id_ruangan: data.id_ruangan,
            kategori: data.kategori,
            tanggal_awal: data.tanggal_awal,
            tanggal_akhir: data.tanggal_akhir,
        };

        Inertia.visit(route('admin.cetak.laporan.pdf', { ...dataToPrint }));
    };

    const handlePrintExcel = () => {
        const dataToPrint = {
            kode: data.kode,
            id_asset: data.id_asset,
            id_unit: data.id_unit,
            id_ruangan: data.id_ruangan,
            kategori: data.kategori,
            tanggal_awal: data.tanggal_awal,
            tanggal_akhir: data.tanggal_akhir,
        };

        Inertia.visit(route('admin.cetak.laporan.excel', { ...dataToPrint }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Cetak Laporan</h2>}
        >
            <Head title="Cetak Laporan" />

            <div className="lg:py-12 pt-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-cyan-900/60 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form className='mb-4'>
                            <div className="text-4xl tracking-widest mb-2 bg-cyan-800 rounded-lg py-4 font-extrabold text-white text-center">Cetak Laporan</div>
                            <div>
                                <InputLabel htmlFor="kode" value="Kode Barang" className=' text-white' />

                                <TextInput
                                    id="kode"
                                    type="text"
                                    name="kode"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('kode', e.target.value)}
                                />

                                <InputError message={errors.kode} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="id_asset" value="Nomor Asset" className=' text-white' />

                                <Select
                                    id="id_asset"
                                    name="id_asset"
                                    className="mt-1 block w-full"
                                    options={assetOptions}
                                    onChange={(selectedOption) => setData('id_asset', selectedOption.value)}
                                />

                                <InputError message={errors.id_asset} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="id_unit" value="Unit Barang Berada" className=' text-white' />

                                <Select
                                    id="id_unit"
                                    name="id_unit"
                                    className="mt-1 block w-full"
                                    options={unitOptions}
                                    onChange={(selectedOption) => {
                                        setData('id_unit', selectedOption.value);
                                    }}
                                />

                                <InputError message={errors.id_unit} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="id_ruangan" value="Ruangan Barang Berada" className=' text-white' />

                                <Select
                                    id="id_ruangan"
                                    name="id_ruangan"
                                    className="mt-1 block w-full"
                                    options={ruanganOptions}
                                    onChange={(selectedOption) => {
                                        setData('id_ruangan', selectedOption.value);
                                    }}
                                />

                                <InputError message={errors.id_ruangan} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="kategori" value="Kategori" className=' text-white' />

                                <Select
                                    id="kategori"
                                    name="kategori"
                                    className="mt-1 block w-full"
                                    options={kategoriOptions}
                                    onChange={(selectedOption) => {
                                        setData('kategori', selectedOption.value);
                                    }}
                                />

                                <InputError message={errors.kategori} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="tanggal_awal" value="Tanggal Awal" className=' text-white' />

                                <TextInput
                                    type="date"
                                    id="tanggal_awal"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('tanggal_awal', e.target.value)}
                                />

                                <InputError message={errors.tanggal_awal} className="mt-2" />
                            </div>
                            <div className='my-4'>
                                <InputLabel htmlFor="tanggal_akhir" value="Tanggal Akhir" className=' text-white' />

                                <TextInput
                                    type="date"
                                    id="tanggal_akhir"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('tanggal_akhir', e.target.value)}
                                />

                                <InputError message={errors.tanggal_akhir} className="mt-2" />
                            </div>
                            <div className='flex items-center'>
                                <button onClick={handlePrintPDF} type='button' className='p-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 mx-2 rounded-md font-bold hover:scale-105 transition duration-300'>
                                    Cetak PDF
                                </button>
                                <button onClick={handlePrintExcel} type='button' className='p-2 bg-green-600 hover:bg-green-700 text-white py-2 px-3 mx-2 rounded-md font-bold hover:scale-105 transition duration-300'>
                                    Cetak Excel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
