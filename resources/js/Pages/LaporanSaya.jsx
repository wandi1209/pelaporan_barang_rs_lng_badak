import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
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
import { Inertia } from '@inertiajs/inertia';

export default function LaporanSaya({ auth, laporan }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filterSubmit = async (e) => {
    e.preventDefault();
    await Inertia.visit(route('laporan.saya.index', {
      startDate,
      endDate,
  }));
  }

  const columns = [
    { Header: 'No', accessor: 'index', Cell: (row) => row.row.index + 1 },
    { Header: 'Kode Laporan', accessor: 'kode' },
    { Header: 'Nama Barang', accessor: 'nama_barang' },
    { Header: 'Nomor Asset', accessor: 'asset.nomor',
        Cell: ({ value }) => value ? value : '-'
    },
    { Header: 'Kategori', accessor: 'kategori', Cell:(row) => <div className='capitalize'>{row.row.original.kategori}</div>},
    { Header: 'Ruangan', accessor: 'ruangan.nama' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Tanggal Lapor', accessor: 'created_at', Cell: ({ value }) =>
      {
        const formattedDate = new Date(value).toLocaleString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Asia/Makassar', // Set the desired timezone
        });

        return formattedDate;
      }
    },
    { Header: 'Aksi', accessor: 'actions', disableGlobalFilter: true, disableSortBy: true, Cell: (row) => (
        <div className='text-white flex justify-center items-center'>
          {/* Tambahkan tombol aksi sesuai kebutuhan */}
          <Link href={route('laporan.saya.show', row.row.original.id)}>
            <button className='rounded-full p-2 flex items-center bg-blue-600 mx-1 hover:bg-blue-800 hover:scale-110 transition-transform duration-300'>
              <Icon>
                info_i
              </Icon>
            </button>
          </Link>
        </div>
      )
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Laporan Saya</h2>}
    >
      <Head title="Laporan Saya" />
      <div>
        <div className="mx-auto">
          <div className="overflow-hidden sm:px-6 lg:px-8 py-12">
            {/* Render DataTable dengan data dan kolom yang telah didefinisikan */}
            <DataTables data={laporan} columns={columns} buttonCrud={
                <form onSubmit={filterSubmit} className='flex items-center animate__animated animate__fadeInDown animate__slow'>
                <div className='flex items-center mx-6'>
                  <InputLabel htmlFor="startDate" value="Tanggal Awal :" className='mr-2'/>
                  <TextInput
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className='flex items-center mx-6'>
                  <InputLabel htmlFor="endDate" value="Tanggal Akhir :" className='mr-2' />
                  <TextInput
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <PrimaryButton type='submit' className='mr-2'>Filter</PrimaryButton>
              </form>
            } />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
