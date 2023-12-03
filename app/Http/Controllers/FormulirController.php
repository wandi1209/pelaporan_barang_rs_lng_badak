<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FotoLaporan;
use App\Models\Ruangan;
use App\Models\Laporan;
use App\Models\Asset;
use App\Models\Unit;
use Inertia;

class FormulirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Form',[
            'unit' => Unit::all(),
            'ruangan' => Ruangan::all(),
            'inventaris' => Asset::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_barang' => ['required', 'string', 'max:255'],
                'asset' => ['nullable', 'exists:asset,id'],
                'id_unit' => ['required', 'exists:unit,id'],
                'id_ruangan' => ['required', 'exists:ruangan,id'],
                'kategori' => ['required'],
                'keterangan' => ['required', 'string'],
                'gambar.*' => ['required', 'mimes:jpg,png,jpeg,pdf', 'max:4096'],
            ]);

            $rsb = 'RSB';
            $tahun = date('y');
            $bulan = date('m');
            $tgl = date('d');
            $tanggalSaatIni = now()->format('Y-m-d');
            $laporanHariIni = Laporan::whereDate('created_at', $tanggalSaatIni)->get();
            if ($laporanHariIni->isNotEmpty()) {
                $urutan = $laporanHariIni->count() + 1;
            } else {
                $urutan = 1;
            }
            $kode = $rsb . $tahun . $bulan . $tgl . sprintf("%02d", $urutan);
            while (Laporan::where('kode', $kode)->exists()) {
                $urutan++;
                $kode = $rsb . $tahun . $bulan . $tgl . sprintf("%02d", $urutan);
            }
            $statusAwal = 'Menunggu Respon Petugas';
            $laporan = Laporan::create([
                'id_unit' => $request->id_unit,
                'id_ruangan' => $request->id_ruangan,
                'id_asset' => $request->asset,
                'kode' => $kode,
                'id_user' => auth()->user()->id,
                'nama_barang' => $request->nama_barang,
                'status' => $statusAwal,
                'kategori' => $request->kategori,
                'biaya_perbaikan' => 0,
                'keterangan' => $request->keterangan,
                'catatan_petugas' => '-',
            ]);
            $gambarFiles = $request->file('gambar');

            if ($gambarFiles) {
                foreach ($gambarFiles as $gambarFile) {
                    $originalName = $gambarFile->getClientOriginalName();
                    $extension = $gambarFile->getClientOriginalExtension();
                    $destinationPath = 'foto_laporan/';
                    $fileName = $originalName;

                    // Jika file dengan nama yang sama sudah ada, tambahkan angka numbering
                    $counter = 1;
                    while (file_exists($destinationPath . $fileName)) {
                        $fileName = pathinfo($originalName, PATHINFO_FILENAME) . '_' . $counter . '.' . $extension;
                        $counter++;
                    }

                    // Pindahkan dan simpan file dengan nama yang sudah diubah
                    $gambarFile->move($destinationPath, $fileName);

                    $gambar = new FotoLaporan;
                    $gambar->foto = $fileName;
                    $gambar->id_laporan = $laporan->id;
                    $gambar->save();
                }
            }
            return redirect()->route('laporan.saya.index')->with('success', 'Laporan Berhasil');
        } catch (\Exception $e) {
            return redirect()->route('laporan.saya.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
