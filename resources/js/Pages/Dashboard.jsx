import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { url } = usePage();
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="lg:py-16 py-4">
                <div className="lg:px-12">
                    <div className="text-gray-800 overflow-hidden p-2 text-xl">
                        <p><strong>Panduan :</strong></p>
                        <div>
                            1. Buka Halaman <a href={route('formulir.index')}>Form.</a>
                        </div>
                        <div>
                            2. Masukkan Nama Barang, Lokasi Barang.
                        </div>
                        <div>
                            3. Masukkan Keterangan Tentang Barang, Misalnya : Tidak Bekerja, Pecah, DLL.
                        </div>
                        <div>
                            4. Upload Foto Barang Yang Rusak.
                        </div>
                        <div>
                            5. Lalu Klik "Laporkan".
                        </div>
                        <div>
                            6. Tunggu Respon Dari Petugas.
                        </div>
                        <div>
                            7. Setelah Direspon, Petugas Akan Datang Ke Lokasi Barang Yang Rusak & Memperbaikinya.
                        </div>
                        <div>
                            8. Setelah Selesai Lihat Catatan Dari Petugas.
                        </div>
                        <div>
                            9. Rawat Asset Kita Bersama.
                        </div>
                        <div>
                            <strong>Terima Kasih.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
