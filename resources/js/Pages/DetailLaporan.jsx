import Icon from '@/Components/Icon';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from 'react-select';
import TextArea from '@/Components/TextArea';

export default function DetailLaporan({ auth, laporan, foto_laporan, asset, unit, ruangan }) {
    const [assetOptions, setAssetOptions] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalUpload, setIsModalUpload] = useState(false);
    const { data, setData, put, post, delete: deleteRecord, errors, processing } = useForm({
        nama_barang: laporan.nama_barang,
        id_asset: laporan.asset ? laporan.asset.id : null,
        id_unit: laporan.unit ? laporan.unit.id : '',
        id_ruangan: laporan.ruangan ? laporan.ruangan.id : '',
        kategori: laporan.kategori ? laporan.kategori : '',
        keterangan: laporan.keterangan,
        gambar: null,
    });

    const unitOptions = unit.map((item) => ({ value: item.id, label: item.nama }));
    const ruanganOptions = ruangan
        .filter((item) => item.id_unit === data.id_unit)
        .map((item) => ({ value: item.id, label: item.nama }));

    const kategoriOptions = [
        { value: 'Medis', label: 'Medis' },
        { value: 'Non Medis', label: 'Non Medis' },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
          };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const hapusFoto = async (fotoId) => {
    try {
        const confirmed = await Swal.fire({
            title: 'Apa Anda Yakin?',
            text: 'Hapus Bukti Laporan ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
        });

        if (confirmed.isConfirmed) {
            await deleteRecord(route('laporan.foto.destroy', { id: fotoId }));
            window.location.reload();
        }
        } catch (error) {
        console.error('Error deleting record:', error);
        }
    };

    const handleDelete = async (laporanId) => {
    try {
        const confirmed = await Swal.fire({
            title: 'Apa Anda Yakin?',
            text: 'Laporan Akan Dihapus Secara Permanen',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
        });

        if (confirmed.isConfirmed) {
            await deleteRecord(route('laporan.saya.destroy', { id: laporanId }));
            Inertia.visit(route('laporan.saya.index'));
        }
        } catch (error) {
        console.error('Error deleting record:', error);
        }
    };

    const openModalEdit = () => {
        setIsModalEditOpen(true);
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try{
           await Promise.all([
            // Assuming that the post request returns a promise
                put(route('laporan.saya.update', { id: laporan.id }),{
                    nama_barang: data.nama_barang,
                    id_asset: data.id_asset,
                    id_unit: data.id_unit,
                    id_ruangan: data.id_ruangan,
                    kategori: data.kategori,
                    keterangan: data.keterangan,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }),
                // Using a Promise to reload the page after a delay (adjust the delay as needed)
                new Promise((resolve) => setTimeout(resolve, 1000)), // 1000 milliseconds delay
            ]);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleGambarChange = (e) => {
        const files = Array.from(e.target.files);
        setData('gambar', files);
    };

     const openModalUpload = () => {
        setIsModalUpload(true);
    };

    const submitUpload = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            data.gambar.forEach((file) => {
                formData.append(`gambar[]`, file);
            });
            await Promise.all([
            // Assuming that the post request returns a promise
                post(route('laporan.saya.upload', { id: laporan.id }), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }),
                // Using a Promise to reload the page after a delay (adjust the delay as needed)
                new Promise((resolve) => setTimeout(resolve, 1000)), // 1000 milliseconds delay
            ]);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const closeModal = () => {
        setIsModalEditOpen(false);
        setIsModalUpload(false);
    }

    useEffect(() => {
        const options = [].concat(
            { value: '', label: 'Tidak Ada Nomor Asset' },
            asset.map((item) => ({
                value: item.id,
                label: `${item.nomor} - (${item.nama_barang})`,
            }))
        );
        setAssetOptions(options);

    }, [asset]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Detail Laporan</h2>}
        >
            <Head title="Detail Laporan" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3 bg-cyan-900 text-white text-center text-2xl font-extrabold">Detail Laporan</div>
                        {laporan.status == 'Menunggu Respon Petugas' ? 
                            <div className='w-full flex justify-center pt-2'>
                                <button 
                                    className='flex items-center mx-2 bg-gray-600 text-white p-2 rounded-lg hover:scale-105 transform duration-300 hover:bg-gray-700'
                                    onClick={() => openModalUpload()}
                                >
                                    <Icon>
                                        upload    
                                    </Icon>
                                    <span className='ml-1 lg:block hidden'>
                                        Upload Bukti Laporan
                                    </span>
                                </button>
                                <button 
                                    className='flex items-center mx-2 bg-green-600 text-white p-2 rounded-lg hover:scale-105 transform duration-300 hover:bg-green-700'
                                    onClick={() => openModalEdit()}
                                >
                                    <Icon>
                                        edit    
                                    </Icon>
                                    <span className='ml-1 lg:block hidden'>
                                        Edit Laporan
                                    </span>
                                </button>
                                <button 
                                    className='flex items-center mx-2 bg-red-600 text-white p-2 rounded-lg hover:scale-105 transform duration-300 hover:bg-red-700'
                                    onClick={() => handleDelete(laporan.id)}
                                >
                                    <Icon>
                                        delete    
                                    </Icon>
                                    <span className='ml-1 lg:block hidden'>
                                        Hapus Laporan
                                    </span>
                                </button>
                            </div>: null}
                        <div className='flex flex-wrap lg:flex-nowrap bg-gray-200 p-4 m-3 rounded-lg'>
                            {foto_laporan ? 
                            <div className="bg-gray-100 p-3 rounded-box rounded-lg w-96 m-3">
                                <h1 className='text-center text-xl font-bold'>Bukti Laporan</h1>
                                {foto_laporan.map((foto, index) => (
                                    <div key={index} className='flex items-center hover:bg-gray-50 p-2 rounded-lg relative overflow-hidden'>
                                        <a href={`/foto_laporan/${foto.foto}`} target="_blank" className='flex items-center'>
                                            <span>
                                                {index+1}.
                                            </span> 
                                            <span className='pl-2 text-blue-700 underline'>
                                                {foto.foto}
                                            </span>
                                        </a>
                                        {laporan.status === 'Menunggu Respon Petugas' ?
                                        <span onClick={() => hapusFoto(foto.id)} className='cursor-pointer absolute top-2 right-2 rounded-full text-center flex items-center px-2 py-1 hover:bg-gray-600 hover:text-white transition duration-300'>
                                            <Icon className='text-sm'>close</Icon>
                                        </span>
                                        : null}
                                    </div>
                                ))}
                            </div>
                            : null}
                            <div className='flex lg:w-2/3 w-full flex-col lg:flex-row rounded-lg pr-14 pb-5 lg:mx-12'>
                                <div className='pl-4 lg:w-1/2 text-gray-800'>
                                    <div className='font-bold mt-2'>Kode Laporan :</div>
                                    <div className='ml-4'>{laporan.kode}</div>

                                    <div className='font-bold mt-2'>Nama Barang :</div>
                                    <div className='ml-4'>{laporan.asset ? laporan.asset.nama_barang : laporan.nama_barang}</div>

                                    <div className='font-bold mt-2'>Nomor Asset :</div>
                                    <div className='ml-4'>{laporan.asset ? laporan.asset.nomor : '-'}</div>

                                    <div className='font-bold mt-2'>Unit Barang :</div>
                                    <div className='ml-4'>{laporan.unit.nama}</div>

                                    <div className='font-bold mt-2'>Lokasi Ruangan :</div>
                                    <div className='ml-4'>{laporan.ruangan.nama}</div>

                                    <div className='font-bold mt-2'>Kategori:</div>
                                    <div className='ml-4 capitalize'>{laporan.kategori}</div>

                                    <div className='font-bold mt-2'>Tanggal Laporan Dibuat :</div>
                                    <div className='ml-4'>{formatDate(laporan.created_at)}</div>
                                </div>
                                <div className='lg:pl-0 pl-4 text-gray-800'>
                                    {laporan.status == 'Selesai' ? (
                                        <div>
                                            <div className='font-bold mt-2'>Tanggal Laporan Selesai :</div>
                                            <div className='ml-4'>{formatDate(laporan.updated_at)}</div>

                                            <div className='font-bold mt-2'>Biaya Perbaikan :</div>
                                            <div className='ml-4'>{formatCurrency(laporan.biaya_perbaikan)}</div>
                                        </div>
                                    ): null}
                                    <div className='font-bold mt-2'>Status :</div>
                                    <div className='ml-4'>{laporan.status}</div>

                                    <div className='font-bold mt-2'>Keterangan :</div>
                                    <div className='ml-4'>{laporan.keterangan}</div>

                                    <div className='font-bold mt-2'>Catatan Petugas:</div>
                                    <div className='ml-4'>{laporan.catatan_petugas}</div>
                                </div>
                            </div>
                        </div>
                        {/* Modal Untuk Edit */}
                        <Modal show={isModalEditOpen} onClose={closeModal}>
                            <form onSubmit={submitEdit} encType="multipart/form-data">
                                <div>
                                <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                                    <span className='ml-2'>
                                    edit laporan
                                    </span>
                                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                                    close
                                    </Icon>
                                </div>
                                <div className='px-4 py-2 bg-gray-200'>
                                    <div>
                                        <InputLabel htmlFor="nama_barang" value="Nama Barang" />

                                        <TextInput
                                            id="nama_barang"
                                            type="text"
                                            name="nama_barang"
                                            value={data.nama_barang}
                                            className="mt-1 block w-full"
                                            autoComplete="current-nama_barang"
                                            onChange={(e) => setData('nama_barang', e.target.value)}
                                        />

                                        <InputError message={errors.nama_barang} className="mt-2" />
                                    </div>
                                    <div className='mt-4'>
                                    <InputLabel htmlFor="id_asset" value="Nomor Aset" />
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
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                    />

                                    <InputError message={errors.keterangan} className="mt-2" />
                                </div>
                                </div>
                                <div className='p-3 bg-gray-50'>
                                    <PrimaryButton className='ml-2' disabled={processing} >
                                    edit
                                    </PrimaryButton>
                                </div>
                                </div>
                            </form>
                        </Modal>
                        <Modal show={isModalUpload} onClose={closeModal}>
                            <form onSubmit={submitUpload} encType="multipart/form-data">
                                <div>
                                <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                                    <span className='ml-2'>
                                    upload bukti laporan
                                    </span>
                                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                                    close
                                    </Icon>
                                </div>
                                <div className='px-4 py-2 bg-gray-200'>
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
                                </div>
                                <div className='p-3 bg-gray-50'>
                                    <PrimaryButton className='ml-2' disabled={processing} >
                                    edit
                                    </PrimaryButton>
                                </div>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
