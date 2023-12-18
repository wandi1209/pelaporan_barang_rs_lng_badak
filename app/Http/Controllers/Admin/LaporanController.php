<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\FotoLaporan;
use App\Models\Laporan;
use App\Models\Ruangan;
use App\Models\Asset;
use App\Models\Unit;
use Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $laporan = Laporan::orderBy('id', 'desc')
                ->with(['unit', 'ruangan', 'asset', 'user']);
        // Set created_at awal dan created_at akhir dengan nilai default
        $tanggalAwal = $request->input('startDate', Carbon::now()->subMonth()->format('Y-m-d'));
        $tanggalAkhir = $request->input('endDate', Carbon::now()->format('Y-m-d'));

        // Periksa apakah permintaan GET berisi tanggal awal dan akhir
        if ($request->filled('startDate') && $request->filled('endDate')) {
            // Gunakan whereBetween untuk memfilter laporan berdasarkan tanggal

            $endOfDay = Carbon::createFromFormat('Y-m-d', $request->input('endDate'))->endOfDay();

            $laporan->whereBetween('created_at', [
                $request->input('startDate'),
                $endOfDay,
            ]);
        }

        // Dapatkan laporan yang sudah difilter
        $laporan = $laporan->get();

        return Inertia::render('Admin/Laporan', [
            'laporan' => $laporan,
            'laporanMenunggu' => Laporan::where('status', 'Menunggu Respon Petugas')->count(),
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $laporan = Laporan::with(['asset', 'unit', 'ruangan'])->findOrFail($id);
        return Inertia::render('Admin/DetailLaporanAdmin', [
            'laporan' => $laporan,
            'foto_laporan' => FotoLaporan::where('id_laporan', $laporan->id)->get(),
            'unit' => Unit::all(),
            'ruangan' => Ruangan::all(),
            'asset' => Asset::all(),
        ]);
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
        try {
            $request->validate([
                'nama_barang' => ['required', 'string', 'max:255'],
                'id_asset' => ['nullable', 'exists:asset,id'],
                'id_unit' => ['required', 'exists:unit,id'],
                'id_ruangan' => ['required', 'exists:ruangan,id'],
                'kategori' => ['required'],
                'keterangan' => ['required', 'string'],
            ]);

            $laporan = Laporan::findOrFail($id);
            $laporan->nama_barang = $request->nama_barang;
            $laporan->id_asset = $request->id_asset;
            $laporan->id_unit = $request->id_unit;
            $laporan->id_ruangan = $request->id_ruangan;
            $laporan->kategori = $request->kategori;
            $laporan->keterangan = $request->keterangan;
            $laporan->save();

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
            return redirect()->route('admin.laporan.show', $laporan->id)->with('success', 'Laporan Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.laporan.show', $laporan->id)->with('error', $e->getMessage());
        }
    }

    public function updateStatus(Request $request, string $id)
    {
        try {
            $laporan = Laporan::findOrFail($id);
            $laporan->status = $request->status;
            $laporan->biaya_perbaikan = $request->biaya_perbaikan;
            if($request->catatan_petugas != null) {
                $laporan->catatan_petugas = $request->catatan_petugas;
            } else {
                $laporan->catatan_petugas = '-';
            }
            $laporan->save();

            return redirect()->route('admin.laporan.show', $laporan->id)->with('success', 'Laporan Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.laporan.show', $laporan->id)->with('error', $e->getMessage());
        }
    }

    public function upload(Request $request, $id) {
        $laporan = Laporan::findOrFail($id);
        $gambarFiles = $request->file('gambar');
        try{
            foreach ($gambarFiles as $gambarFile) {
                $originalName = 'Petugas__' . $gambarFile->getClientOriginalName();
                $extension = $gambarFile->getClientOriginalExtension();
                $destinationPath = 'foto_laporan';
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
            return redirect()->route('admin.laporan.show', $laporan->id)->with('success', 'Bukti Laporan Berhasil Di Upload');
        } catch (\Exception $e) {
            return redirect()->route('admin.laporan.show', $laporan->id)->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $laporan = Laporan::find($id);

            if ($laporan) {
                // Mengambil laporan dengan ID yang sesuai
                $laporanId = $laporan->id;

                $fotos = FotoLaporan::where('id_laporan', $laporanId)->get();

                foreach ($fotos as $foto) {
                    $filePath = public_path('foto_laporan/' . $foto->foto);
                    if (File::exists($filePath)) {
                        File::delete($filePath);
                    }
                }
                // Menghapus foto yang terkait dengan laporan
                FotoLaporan::where('id_laporan', $laporanId)->delete();
            }
            Laporan::where('id', $id)->delete();
            return redirect()->route('admin.laporan.index')->with('success', 'Laporan Dihapus Permanen');
        } catch (\Exception $e) {
            return redirect()->route('admin.laporan.index')->with('error', $e->getMessage());
        }
    }

    public function hapus($id){
        try {
            $foto = FotoLaporan::find($id);
            $laporan = Laporan::find($foto->id_laporan);
            $foto->delete();

            return redirect()->route('admin.laporan.show', $laporan->id)->with('success', 'Foto Dihapus');
        } catch (\Exception $e) {
            return redirect()->route('admin.laporan.show', $laporan->id)->with('error', $e->getMessage());
        }
    }
}
