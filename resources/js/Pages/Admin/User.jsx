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

export default function User({ auth, user }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { data, setData, put, delete: deleteRecord, processing, errors, reset } = useForm({
      name: '',
      jabatan: '',
      nomor_badge: '',
      role: '',
      email: '',
      password: null,
  });

  const openModalEdit = (row) => {
    setData({
      ...data,
      name: row.row.original.name,
      jabatan: row.row.original.jabatan,
      nomor_badge: row.row.original.nomor_badge,
      role: row.row.original.role,
      email: row.row.original.email,
    });
    setSelectedRow(row);
    setIsModalEditOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await put(route('admin.user.update', { id: selectedRow.row.original.id }));
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalEditOpen(false);
  }

  const handleDelete = async (row) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Apa Anda Yakin?',
        text: 'User Akan Dihapus Secara Permanen',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus',
      });

      if (confirmed.isConfirmed) {
        await deleteRecord(route('admin.user.destroy', { id: row.row.original.id }));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const columns = [
    { Header: 'No', accessor: 'index', Cell: (row) => row.row.index + 1 },
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Jabatan', accessor: 'jabatan' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Email Verifikasi', accessor: 'email_verified_at',  
        Cell: ({ value }) => {
            return value ? 'Ya' : 'Tidak';
        }, 
    },
    { Header: 'Role', accessor: 'role', Cell: (row) => (<div className='capitalize'>{row.row.original.role}</div>) },
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
    return () => {
        reset();
    };
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">User</h2>}
    >
      <Head title="User" />

      <div>
        <div className="mx-auto">
          <div className="overflow-hidden sm:px-6 lg:px-8 py-12">
            {/* Render DataTable dengan data dan kolom yang telah didefinisikan */}
            <DataTables data={user} columns={columns} buttonCrud={
              <div className='flex'></div>
            }/>
            {/* Modal Untuk Edit */}
            <Modal show={isModalEditOpen} onClose={closeModal}>
              <form onSubmit={submitEdit}>
                <div>
                  <div className='flex items-center justify-between py-2 px-4 bg-cyan-900 text-white text-xl font-semibold uppercase tracking-widest'>
                    <span className='ml-2'>
                      edit user
                    </span>
                    <Icon onClick={closeModal} className='p-2 cursor-pointer hover:bg-cyan-950 transition duration-300 rounded-lg'>
                      close
                    </Icon>
                  </div>
                  <div className='px-4 py-2 bg-gray-200'>
                      <div>
                          <InputLabel htmlFor="name" value="Nama" />

                          <TextInput
                              id="name"
                              type="text"
                              name="name"
                              value={data.name}
                              className="mt-1 block w-full"
                              autoComplete="current-name"
                              onChange={(e) => setData('name', e.target.value)}
                          />

                          <InputError message={errors.name} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                          <InputLabel htmlFor="nomor_badge" value="Nomor Badge" />

                          <TextInput
                              id="nomor_badge"
                              type="text"
                              name="nomor_badge"
                              value={data.nomor_badge}
                              className="mt-1 block w-full"
                              autoComplete="current-nomor_badge"
                              onChange={(e) => setData('nomor_badge', e.target.value)}
                          />

                          <InputError message={errors.nomor_badge} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                          <InputLabel htmlFor="jabatan" value="Jabatan" />

                          <TextInput
                              id="jabatan"
                              type="text"
                              name="jabatan"
                              value={data.jabatan}
                              className="mt-1 block w-full"
                              autoComplete="current-jabatan"
                              onChange={(e) => setData('jabatan', e.target.value)}
                          />

                          <InputError message={errors.jabatan} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                          <InputLabel htmlFor="email" value="Email" />

                          <TextInput
                              id="email"
                              type="email"
                              name="email"
                              value={data.email}
                              className="mt-1 block w-full"
                              autoComplete="current-email"
                              onChange={(e) => setData('email', e.target.value)}
                          />

                          <InputError message={errors.email} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                          <InputLabel htmlFor="role" value="Role" />

                          <select 
                            className="select select-bordered w-full"
                            onChange={(e) => setData('unit', e.target.value)}
                          >
                            <option disabled selected value="" className='capitalize'>-- Pilih Role --</option>
                            <option value="admin">Admin</option>
                            <option value="petugas">Petugas</option>
                            <option value="user">User</option>
                          </select>

                          <InputError message={errors.role} className="mt-2" />
                      </div>
                      <div className='mt-2'>
                          <InputLabel htmlFor="password" value="Password" />

                          <TextInput
                              id="password"
                              type="password"
                              name="password"
                              className="mt-1 block w-full"
                              autoComplete="current-password"
                              onChange={(e) => setData('password', e.target.value)}
                          />

                          <InputError message={errors.password} className="mt-2" />
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
