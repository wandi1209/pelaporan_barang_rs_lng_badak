import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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

export default function Ruangan({ auth, ruangan, unit }) {
  const [unitOptions, setUnitOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { data, setData, post , put, delete: deleteRecord, processing, errors, reset } = useForm({
      nama: '',
      nama_edit: '', 
      unit: '',
      unit_edit: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.ruangan.store'));
    window.location.reload();
  };

  const openModalEdit = (row) => {
    setData({
      ...data,
      nama_edit: row.row.original.nama,
      unit_edit: row.row.original.nama,
    });
    setSelectedRow(row);
    setIsModalEditOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await put(route('admin.ruangan.update', { id: selectedRow.row.original.id }));
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalEditOpen(false);
    setIsModalOpen(false);
  }

  const handleDelete = async (row) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Apa Anda Yakin?',
        text: 'Ruangan Akan Dihapus Secara Permanen',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus',
      });

      if (confirmed.isConfirmed) {
        await deleteRecord(route('admin.ruangan.destroy', { id: row.row.original.id }));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const columns = [
    { Header: 'No', accessor: 'index', Cell: (row) => row.row.index + 1 },
    { Header: 'Nama Ruangan', accessor: 'nama' },
    { Header: 'Unit', accessor: 'unit.nama' },
    { Header: 'Aksi', accessor: 'actions', disableGlobalFilter: true, disableSortBy: true, Cell: (row) => (
        <div className='text-white flex justify-center items-center'>
          {/* Tambahkan tombol aksi sesuai kebutuhan */}
          <ButtonEdit onClick={() => openModalEdit(row)}/>
          <ButtonDelete onClick={() => handleDelete(row)} />
        </div>
      )
    },
  ];

  useEffect(() => {
    setUnitOptions(unit.map(u => ({ value: u.id, label: u.nama })));
    return () => {
        reset();
    };
  }, [unit]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Unit</h2>}
    >
      <Head title="Ruangan" />

      <div>
        <div className="mx-auto">
          <div className="overflow-hidden sm:px-6 lg:px-8 py-12">
            {/* Render DataTable dengan data dan kolom yang telah didefinisikan */}
            <DataTables data={ruangan} columns={columns} buttonCrud={
              <div className='flex animate__animated animate__fadeInDown animate__slow'>
                <ButtonTambah onClick={openModal}>
                  <Icon>
                    playlist_add
                  </Icon>
                  <span className='ml-1 lg:block hidden'>
                    Tambah Ruangan
                  </span>
                </ButtonTambah>
              </div>
            }/>
            {/* Modal Tambah */}
            <Modal show={isModalOpen} onClose={closeModal}>
              <form onSubmit={submit}>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      tambah ruangan
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nama" value="Nama Ruangan" />

                          <TextInput
                              id="nama"
                              type="text"
                              name="nama"
                              className="mt-1 block w-full"
                              autoComplete="username"
                              isFocused={true}
                              onChange={(e) => setData('nama', e.target.value)}
                          />

                          <InputError message={errors.nama} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                        <InputLabel htmlFor="unit" value="Nama Unit" />

                        <select 
                          className="select select-bordered w-full"
                          onChange={(e) => setData('unit', e.target.value)}
                        >
                          <option disabled selected value="">-- Pilih Unit --</option>
                          {unitOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
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
                      edit ruangan
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="nama_edit" value="Nama Ruangan" />

                          <TextInput
                              id="nama_edit"
                              type="text"
                              name="nama_edit"
                              value={data.nama_edit}
                              className="mt-1 block w-full"
                              autoComplete="current-nama_edit"
                              onChange={(e) => setData('nama_edit', e.target.value)}
                          />

                          <InputError message={errors.nama_edit} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                        <InputLabel htmlFor="unit_edit" value="Nama Unit" />

                        <select 
                          className="select select-bordered w-full"
                          value={data.unit_edit}
                          onChange={(e) => setData('unit_edit', e.target.value)}
                        >
                          {unitOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
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
