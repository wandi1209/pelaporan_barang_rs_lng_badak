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

export default function NomorBadge({ auth, nomor_badge }) {
  const { csrf_token } = usePage().props;
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const { data, setData, post , put, delete: deleteRecord, processing, errors, reset } = useForm({
      nomor_pekerja: '',
      nama_pekerja: '',
      nomor_pekerja_edit: '',
      nama_pekerja_edit: '',
      file: null,
  });

  const openModal = () => {
    setIsModalOpen(true);
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.badge.store'));
    window.location.reload();
  };

  const openModalEdit = (row) => {
    setData({
      ...data,
      nomor_pekerja_edit: row.row.original.nomor_pekerja,
      nama_pekerja_edit: row.row.original.nama_pekerja,
    });
    setSelectedRow(row);
    setIsModalEditOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await put(route('admin.badge.update', { id: selectedRow.row.original.id }));
    window.location.reload();
  };

  const openImportModal = () => {
    setIsModalImportOpen(true);
  }

  const submitImport = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', data.file);

    await post(route('admin.badge.import'), formData, {
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
        text: 'Nomor Badge dan User Yang Terkait Akan Dihapus Secara Permanen',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
      });

      if (confirmed.isConfirmed) {
        await deleteRecord(route('admin.badge.destroy', { id: row.row.original.id }));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const columns = [
    { Header: 'No', accessor: 'index', Cell: (row) => row.row.index + 1 },
    { Header: 'Nomor Badge', accessor: 'nomor_pekerja' },
    { Header: 'Nama Pekerja', accessor: 'nama_pekerja' },
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
    Inertia.visit(route('admin.badge.download'));
  };


  useEffect(() => {
    return () => {
        reset();
    };
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Nomor Badge</h2>}
    >
      <Head title="Nomor Badge" />

      <div>
        <div className="mx-auto">
          <div className="overflow-hidden sm:px-6 lg:px-8 py-12">
            {/* Render DataTable dengan data dan kolom yang telah didefinisikan */}
            <DataTables data={nomor_badge} columns={columns} buttonCrud={
              <div className='flex animate__animated animate__fadeInDown animate__slow'>
                <ButtonTambah onClick={openModal}>
                  <Icon>
                    playlist_add
                  </Icon>
                  <span className='ml-1 lg:block hidden'>
                    Tambah Nomor Badge
                  </span>
                </ButtonTambah>
                <ButtonImport onClick={openImportModal}>
                  <Icon>
                    PUBLISH
                  </Icon>
                  <span className='ml-1 lg:block hidden'>
                    Import Nomor Badge
                  </span>
                </ButtonImport>
              </div>
            }/>
            <Modal show={isModalOpen} onClose={closeModal}>
              <form onSubmit={submit}>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      tambah nomor badge
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nomor_pekerja" value="Nomor Badge" />

                          <TextInput
                              id="nomor_pekerja"
                              type="text"
                              name="nomor_pekerja"
                              className="mt-1 block w-full"
                              autoComplete="username"
                              isFocused={true}
                              onChange={(e) => setData('nomor_pekerja', e.target.value)}
                          />

                          <InputError message={errors.nomor_pekerja} className="mt-2" />
                      </div>

                      <div className="my-2">
                          <InputLabel htmlFor="nama_pekerja" value="Nama Pekerja" />

                          <TextInput
                              id="nama_pekerja"
                              type="text"
                              name="nama_pekerja"
                              className="mt-1 block w-full"
                              autoComplete="current-nama_pekerja"
                              onChange={(e) => setData('nama_pekerja', e.target.value)}
                          />

                          <InputError message={errors.nama_pekerja} className="mt-2" />
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
                      edit nomor badge
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nomor_pekerja_edit" value="Nomor Badge" />

                          <TextInput
                              id="nomor_pekerja_edit"
                              type="text"
                              name="nomor_pekerja_edit"
                              value={data.nomor_pekerja_edit}
                              className="mt-1 block w-full"
                              autoComplete="current-nomor_pekerja_edit"
                              onChange={(e) => setData('nomor_pekerja_edit', e.target.value)}
                          />

                          <InputError message={errors.nomor_pekerja_edit} className="mt-2" />
                      </div>

                      <div className="my-2">
                          <InputLabel htmlFor="nama_pekerja_edit" value="Nama Pekerja" />

                          <TextInput
                              id="nama_pekerja_edit"
                              type="text"
                              name="nama_pekerja_edit"
                              value={data.nama_pekerja_edit}
                              className="mt-1 block w-full"
                              autoComplete="current-nama_pekerja_edit"
                              onChange={(e) => setData('nama_pekerja_edit', e.target.value)}
                          />

                          <InputError message={errors.nama_pekerja_edit} className="mt-2" />
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
                      import nomor badge
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
