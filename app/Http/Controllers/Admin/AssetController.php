<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Imports\AssetImport;
use App\Models\Laporan;
use App\Models\Asset;
use Inertia;
use Excel;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Asset',[
            'asset' => Asset::orderBy('nama_barang', 'asc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function import(Request $request)
    {
        try{
            $request->validate([
                'file' => ['required', 'mimes:csv,xls,xlsx'],
            ]);

            Excel::import(new AssetImport, $request->file('file')->store('temp'));

            return redirect()->route('admin.asset.index')->with('success', 'Import Nomor Aset Berhasil');
        } catch (\Exception $e) {
            return redirect()->route('admin.asset.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nomor' => ['required', 'max:255', 'unique:asset,nomor'],
                'nama_barang' => ['required', 'string', 'max:255'],
                'merk' => ['nullable', 'string', 'max:255'],
                'nomor_seri' => ['nullable', 'max:255'],
                'kondisi' => ['required'],
            ]);

            Asset::create([
                'nomor' => $request->nomor,
                'nama_barang' => $request->nama_barang,
                'merk' => $request->merk,
                'nomor_seri' => $request->nomor_seri,
                'kondisi' => $request->kondisi,
            ]);

            return redirect()->route('admin.asset.index')->with('success', 'Nomor Aset Berhasil Di Tambahkan');
        } catch (\Exception $e) {
            return redirect()->route('admin.asset.index')->with('error', $e->getMessage());
        }
    }

    public function download()
    {
        $file = 'ContohImportNomorAsset.xlsx';
        $filePath = public_path('file_import/' . $file);

        return response()->download($filePath);
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
        try {
            $asset = Asset::findOrFail($id);

            $request->validate([
                'nomor_edit' => ['required', 'max:255', 'unique:asset,nomor,' . $id],
                'nama_barang_edit' => ['required', 'string', 'max:255'],
                'merk_edit' => ['nullable', 'string', 'max:255'],
                'nomor_seri_edit' => ['nullable', 'max:255'],
                'kondisi_edit' => ['required'],
            ]);

            $asset->nomor = $request->nomor_edit;
            $asset->nama_barang = $request->nama_barang_edit;
            $asset->merk = $request->merk_edit;
            $asset->nomor_seri = $request->nomor_seri_edit;
            $asset->kondisi = $request->kondisi_edit;
            $asset->save();

            return redirect()->route('admin.asset.index')->with('success', 'Nomor Aset Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.asset.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $asset = Asset::findOrFail($id);
            $laporan = Laporan::where('id_asset', $asset->id)->first();

            if(!empty($laporan)){
                return redirect()->route('admin.asset.index')->with('error', 'Tidak Dapat Menghapus Nomor Aset Yang Terkait Dengan Laporan');
            }
            $asset->delete();

            return redirect()->route('admin.asset.index')->with('success', 'Nomor Aset Dihapus Secara Permanen');
        } catch (\Exception $e) {
            return redirect()->route('admin.asset.index')->with('error', $e->getMessage());
        }
    }
}
