<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Exports\LaporanExport;
use Illuminate\Http\Request;
use App\Models\Laporan;
use App\Models\Ruangan;
use App\Models\Asset;
use App\Models\Unit;
use Carbon\Carbon;
use Inertia;
use Excel;
use PDF;

class CetakLaporanController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Admin/CetakLaporan', [
            'asset' => Asset::all(),
            'unit' => Unit::all(),
            'ruangan' => Ruangan::all(),
        ]);
    }

    public function pdf(Request $request){
        $kode = $request->input('kode');
        $startDate = $request->input('tanggal_awal');
        $endDate = $request->input('tanggal_akhir');
        $unitId = $request->input('id_unit');
        $assetId = $request->input('id_asset');
        $ruanganId = $request->input('id_ruangan');
        $kategori = $request->input('kategori');

        $query = Laporan::with('asset','unit','ruangan');

        if ($kode) {
            $query->where('kode', 'LIKE', '%' . $kode . '%');
        }

        if ($request->filled('tanggal_awal') && $request->filled('tanggal_akhir')) {
            // Gunakan whereBetween untuk memfilter laporan berdasarkan tanggal

            $endOfDay = Carbon::createFromFormat('Y-m-d', $request->input('tanggal_akhir'))->endOfDay();

            $query->whereBetween('created_at', [
                $request->input('tanggal_awal'),
                $endOfDay,
            ]);
        }

        if ($unitId) {
            $query->where('id_unit', $unitId);
        }

        if ($assetId) {
            $query->where('id_asset', $assetId);
        }

        if ($ruanganId) {
            $query->where('id_ruangan', $ruanganId);
        }

        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $laporan = $query->get();
        $pdf = PDF::loadView('pdf', compact('laporan'));
        $pdf->setPaper('A4','landscape');
        return $pdf->download('LaporanPerbaikanBarang.pdf');
    }

    public function excel(Request $request) {
        $kode = $request->input('kode');
        $startDate = $request->input('tanggal_awal');
        $endDate = $request->input('tanggal_akhir');
        $unitId = $request->input('id_unit');
        $assetId = $request->input('id_asset');
        $ruanganId = $request->input('id_ruangan');
        $kategori = $request->input('kategori');

        $query = Laporan::with('asset','unit','ruangan');

        if ($kode) {
            $query->where('kode', 'LIKE', '%' . $kode . '%');
        }

        if ($request->filled('tanggal_awal') && $request->filled('tanggal_akhir')) {
            // Gunakan whereBetween untuk memfilter laporan berdasarkan tanggal

            $endOfDay = Carbon::createFromFormat('Y-m-d', $request->input('tanggal_akhir'))->endOfDay();

            $query->whereBetween('created_at', [
                $request->input('tanggal_awal'),
                $endOfDay,
            ]);
        }

        if ($unitId) {
            $query->where('id_unit', $unitId);
        }

        if ($assetId) {
            $query->where('id_asset', $assetId);
        }

        if ($ruanganId) {
            $query->where('id_ruangan', $ruanganId);
        }

        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $laporan = $query->get();
        session(['cetak_excel' => $laporan]);
        return Excel::download(new LaporanExport, 'LaporanPerbaikan.xlsx');
    }
}
