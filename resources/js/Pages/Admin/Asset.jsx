import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import DataTables from '@/Components/DataTables';
import Icon from '@/Components/Icon';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';
import ButtonEdit from '@/Components/ButtonEdit';
import ButtonDelete from '@/Components/ButtonDelete';
import ButtonTambah from '@/Components/ButtonTambah';
import ButtonImport from '@/Components/ButtonImport';
import { Inertia } from '@inertiajs/inertia';

export default function Asset({ auth, asset }) {
  const { csrf_token } = usePage().props;
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const { data, setData, post , put, get, delete: deleteRecord, processing, errors, reset } = useForm({
      nomor: '',
      nama_barang: '',
      merk: '',
      nomor_seri: '',
      kondisi: '',
      nomor_edit: '',
      nama_barang_edit: '',
      merk_edit: '',
      nomor_seri_edit: '',
      kondisi_edit: '',
      file: null,
  });

  const openModal = () => {
    setIsModalOpen(true);
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.asset.store'));
    window.location.reload();
  };

  const openModalEdit = (row) => {
    setData({
      ...data,
      nomor_edit: row.row.original.nomor,
      nama_barang_edit: row.row.original.nama_barang,
      merk_edit: row.row.original.merk,
      nomor_seri_edit: row.row.original.nomor_seri,
      kondisi_edit: row.row.original.kondisi,
    });
    setSelectedRow(row);
    setIsModalEditOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await put(route('admin.asset.update', { id: selectedRow.row.original.id }));
    window.location.reload();
  };

  const openImportModal = () => {
    setIsModalImportOpen(true);
  }

  const submitImport = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', data.file);

    await post(route('admin.asset.import'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': csrf_token,
      },
    });
    window.location.reload();
  }

  const closeModal = () => {
    setIsModalImportOpen(false);
    setIsModalEditOpen(false);
    setIsModalOpen(false);
  }

  const handleDelete = async (row) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Apa Anda Yakin?',
        text: 'Nomor Asset Akan Dihapus Secara Permanen',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
      });

      if (confirmed.isConfirmed) {
        await deleteRecord(route('admin.asset.destroy', { id: row.row.original.id }));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const columns = [
    { Header: 'No', accessor: 'index', Cell: (row) => row.row.index + 1 },
    { Header: 'Nomor', accessor: 'nomor' },
    { Header: 'Nama Barang', accessor: 'nama_barang' },
    { Header: 'Merk', accessor: 'merk', Cell: (row) => row.row.original.merk ? row.row.original.merk : '-' },
    { Header: 'Nomor Seri', accessor: 'nomor_seri', Cell: (row) => row.row.original.nomor_seri ? row.row.original.nomor_seri : '-' },
    { Header: 'Kondisi', accessor: 'kondisi', Cell: (row) => (<div className='capitalize'>{row.row.original.kondisi}</div>) },
    { Header: 'Aksi', accessor: 'actions', disableGlobalFilter: true, disableSortBy: true, Cell: (row) => (
        <div className='text-white flex justify-center items-center'>
          {/* Tambahkan tombol aksi sesuai kebutuhan */}
          <ButtonEdit onClick={() => openModalEdit(row)}/>
          <ButtonDelete onClick={() => handleDelete(row)} />
        </div>
      )
    },
  ];

  const downloadFile = () => {
    Inertia.visit(route('admin.asset.download'));
  };

  useEffect(() => {
    return () => {
        reset();
    };
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Nomor Aset</h2>}
    >
      <Head title="Nomor Aset" />

      <div>
        <div className="mx-auto">
          <div className="overflow-hidden sm:px-6 lg:px-8 py-12">
            {/* Render DataTable dengan data dan kolom yang telah didefinisikan */}
            <DataTables data={asset} columns={columns} buttonCrud={
              <div className='flex animate__animated animate__fadeInDown animate__slow'>
                <ButtonTambah onClick={openModal}>
                  <Icon>
                    playlist_add
                  </Icon>
                  <span className='ml-1 lg:block hidden'>
                    Tambah Nomor Aset
                  </span>
                </ButtonTambah>
                <ButtonImport onClick={openImportModal}>
                  <Icon>
                    PUBLISH
                  </Icon>
                  <span className='ml-1 lg:block hidden'>
                    Import Nomor Aset
                  </span>
                </ButtonImport>
              </div>
            }/>
            <Modal show={isModalOpen} onClose={closeModal}>
              <form onSubmit={submit}>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      tambah nomor Aset
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nomor" value="Nomor Aset" />

                          <TextInput
                              id="nomor"
                              type="text"
                              name="nomor"
                              className="mt-1 block w-full"
                              autoComplete="username"
                              isFocused={true}
                              onChange={(e) => setData('nomor', e.target.value)}
                          />

                          <InputError message={errors.nomor} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="nama_barang" value="Nama Barang" />

                          <TextInput
                              id="nama_barang"
                              type="text"
                              name="nama_barang"
                              className="mt-1 block w-full"
                              autoComplete="current-nama_barang"
                              onChange={(e) => setData('nama_barang', e.target.value)}
                          />

                          <InputError message={errors.nama_barang} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="merk" value="Merk Barang" />

                          <TextInput
                              id="merk"
                              type="text"
                              name="merk"
                              className="mt-1 block w-full"
                              autoComplete="current-merk"
                              onChange={(e) => setData('merk', e.target.value)}
                          />

                          <InputError message={errors.merk} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="nomor_seri" value="Nomor Seri" />

                          <TextInput
                              id="nomor_seri"
                              type="text"
                              name="nomor_seri"
                              className="mt-1 block w-full"
                              autoComplete="current-nomor_seri"
                              onChange={(e) => setData('nomor_seri', e.target.value)}
                          />

                          <InputError message={errors.nomor_seri} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="kondisi" value="Nomor Seri" />

                          <select 
                            className="select select-bordered w-full"
                            onChange={(e) => setData('kondisi', e.target.value)}
                          >
                            <option disabled selected value="">-- Kondisi --</option>
                            <option value="bagus">Bagus</option>
                            <option value="sedang">Sedang</option>
                            <option value="jelek">Jelek</option>
                            <option value="rusak">Rusak</option>
                            <option value="tunggu pasang">Tunggu Pasang</option>
                            <option value="lebih">Lebih</option>
                            <option value="cadangan">Cadangan</option>
                            <option value="tidak ditemukan">Tidak Ditemukan</option>
                            <option value="proses FUPP">Proses FUPP</option>
                          </select>

                          <InputError message={errors.kondisi} className="mt-2" />
                      </div>
                  </div>
                  <div className='p-3 bg-gray-50'>
                    <PrimaryButton className='ml-2' disabled={processing}>
                      Tambah
                    </PrimaryButton>
                  </div>
                </div>
              </form>
            </Modal>
            {/* Modal Untuk Edit */}
            <Modal show={isModalEditOpen} onClose={closeModal}>
              <form onSubmit={submitEdit}>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      edit nomor Aset
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nomor_edit" value="Nomor Aset" />

                          <TextInput
                              id="nomor_edit"
                              type="text"
                              name="nomor_edit"
                              className="mt-1 block w-full"
                              value={data.nomor_edit}
                              autoComplete="username"
                              isFocused={true}
                              onChange={(e) => setData('nomor_edit', e.target.value)}
                          />

                          <InputError message={errors.nomor_edit} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="nama_barang_edit" value="Nama Barang" />

                          <TextInput
                              id="nama_barang_edit"
                              type="text"
                              name="nama_barang_edit"
                              className="mt-1 block w-full"
                              value={data.nama_barang_edit}
                              autoComplete="current-nama_barang_edit"
                              onChange={(e) => setData('nama_barang_edit', e.target.value)}
                          />

                          <InputError message={errors.nama_barang_edit} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="merk_edit" value="Merk Barang" />

                          <TextInput
                              id="merk_edit"
                              type="text"
                              name="merk_edit"
                              className="mt-1 block w-full"
                              value={data.merk_edit}
                              autoComplete="current-merk_edit"
                              onChange={(e) => setData('merk_edit', e.target.value)}
                          />

                          <InputError message={errors.merk_edit} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="nomor_seri_edit" value="Nomor Seri" />

                          <TextInput
                              id="nomor_seri_edit"
                              type="text"
                              name="nomor_seri_edit"
                              className="mt-1 block w-full"
                              value={data.nomor_seri_edit}
                              autoComplete="current-nomor_seri_edit"
                              onChange={(e) => setData('nomor_seri_edit', e.target.value)}
                          />

                          <InputError message={errors.nomor_seri_edit} className="mt-2" />
                      </div>
                      <div className="my-2">
                          <InputLabel htmlFor="kondisi_edit" value="Nomor Seri" />

                          <select 
                            className="select select-bordered w-full"
                            onChange={(e) => setData('kondisi_edit', e.target.value)}
                          >
                            <option value="bagus">Bagus</option>
                            <option value="sedang">Sedang</option>
                            <option value="jelek">Jelek</option>
                            <option value="rusak">Rusak</option>
                            <option value="tunggu pasang">Tunggu Pasang</option>
                            <option value="lebih">Lebih</option>
                            <option value="cadangan">Cadangan</option>
                            <option value="tidak ditemukan">Tidak Ditemukan</option>
                            <option value="proses FUPP">Proses FUPP</option>
                          </select>

                          <InputError message={errors.kondisi_edit} className="mt-2" />
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
            {/* Modal Import */}
            <Modal show={isModalImportOpen} onClose={closeModal}>
              <form onSubmit={submitImport} encType='multipart/form-data'>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      import nomor Aset
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                    <div className='mb-2'>
                        <button type='button' className='bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700' onClick={downloadFile}>Download Template</button>
                    </div>
                    <div>
                        <InputLabel htmlFor="file" value="Upload File" />

                        <input
                          id="file"
                          type="file"
                          name="file"
                          className="mt-1 block w-full bg-white file-input file-input-bordered w-full"
                          onChange={(e) => setData('file', e.target.files[0])}
                        />


                        <InputError message={errors.file} className="mt-2" />
                    </div>
                  </div>
                  <div className='p-3 bg-gray-50'>
                    <PrimaryButton className='ml-2' disabled={processing} >
                      import
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
