<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Imports\NomorBadgeImport;
use Illuminate\Http\Request;
use App\Models\NomorBadge;
use App\Models\User;
use Inertia;
use Excel;

class NomorBadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/NomorBadge', [
            'nomor_badge' => NomorBadge::orderBy('nama_pekerja', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'nomor_pekerja' => ['required', 'max:7', 'unique:nomor_badge,nomor_pekerja'],
                'nama_pekerja' => ['required', 'max:255'],
            ]);

            NomorBadge::create([
                'nomor_pekerja' => $request->nomor_pekerja,
                'nama_pekerja' => $request->nama_pekerja,
            ]);
            return redirect()->route('admin.badge.index')->with('success', 'Nomor Badge Telah Di Simpan.');
        } catch (\Exception $e) {
            return redirect()->route('admin.badge.index')->with('error', $e->getMessage());
        }
    } 
    /**
     * Display the specified resource.
     */

    public function download()
    {
        $file = 'ContohImportNomorBadge.xlsx';
        $filePath = public_path('file_import/' . $file);

        return response()->download($filePath);
    }

    public function import(Request $request)
    {
        try{
            $request->validate([
                'file' => ['required', 'mimes:csv,xls,xlsx'],
            ]);

            Excel::import(new NomorBadgeImport, $request->file('file')->store('temp'));

            return redirect()->route('admin.badge.index')->with('success', 'Import Nomor Badge Berhasil');
        } catch (\Exception $e) {
            return redirect()->route('admin.badge.index')->with('error', $e->getMessage());
        }
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
        try{
            $request->validate([
                'nomor_pekerja_edit' => ['required', 'unique:nomor_badge,nomor_pekerja,' . $id, 'max:7'],
                'nama_pekerja_edit' => ['required','string'],
            ]);
            $nobad = NomorBadge::findOrFail($id);
            $nobad->nomor_pekerja = $request->nomor_pekerja_edit;
            $nobad->nama_pekerja = $request->nama_pekerja_edit;
            $nobad->save();

            return redirect()->route('admin.badge.index')->with('success', 'Nomor Badge Berhasil Di Update.');
        } catch (\Exception $e) {
            return redirect()->route('admin.badge.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $nobad = NomorBadge::findOrFail($id);

            $loggedInUser = Auth::user();
            if ($loggedInUser && $loggedInUser->nomor_badge === $nobad->nomor_pekerja) {
                return redirect()->route('admin.badge.index')->with('error', 'Anda tidak diizinkan menghapus nomor badge Anda sendiri.');
            }

            $user = User::where('nomor_badge', $nobad->nomor_pekerja)->first();

            if ($user) {
                return redirect()->route('admin.badge.index')->with('error', 'Tidak Dapat Menghapus Nomor Badge Yang Terkait Dengan User');
            } else {
                $nobad->delete();
                return redirect()->route('admin.badge.index')->with('success', 'Nomor Badge Berhasil Di Hapus.');
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.badge.index')->with('error', $e->getMessage());
        }
    }
}
