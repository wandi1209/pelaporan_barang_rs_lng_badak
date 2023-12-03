<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Models\FotoLaporan;
use App\Models\Ruangan;
use App\Models\Laporan;
use App\Models\Asset;
use App\Models\Unit;
use Carbon\Carbon;
use Inertia;

class LaporanSayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        // Set default values if not provided
        $startDate = $startDate ?: Carbon::now()->firstOfMonth()->toDateString();
        $endDate = $endDate ?: Carbon::now()->toDateString();

        // Use whereBetween to filter data based on the date range
        $laporan = Laporan::orderBy('nama_barang', 'asc')
            ->where('id_user', auth()->user()->id)
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->with(['unit', 'ruangan', 'asset'])
            ->get();

        return Inertia::render('LaporanSaya', [
            'laporan' => $laporan,
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
        return Inertia::render('DetailLaporan', [
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
            return redirect()->route('laporan.saya.show', $laporan->id)->with('success', 'Laporan Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('laporan.saya.show', $laporan->id)->with('error', $e->getMessage());
        }
    }

    public function upload(Request $request, $id) {
        $laporan = Laporan::findOrFail($id);
        $gambarFiles = $request->file('gambar');
        try{
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
            return redirect()->route('laporan.saya.show', $laporan->id)->with('success', 'Bukti Laporan Berhasil Di Upload');
        } catch (\Exception $e) {
            return redirect()->route('laporan.saya.show', $laporan->id)->with('error', $e->getMessage());
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
            return redirect()->route('laporan.saya.index')->with('success', 'Laporan Dihapus Permanen');
        } catch (\Exception $e) {
            return redirect()->route('laporan.saya.index')->with('error', $e->getMessage());
        }
    }

    public function hapus($id){
        try {
            $foto = FotoLaporan::find($id);
            $foto->delete();

            return redirect()->route('laporan.saya.show', $id)->with('success', 'Foto Dihapus');
        } catch (\Exception $e) {
            return redirect()->route('laporan.saya.show', $id)->with('error', $e->getMessage());
        }
    }
}
