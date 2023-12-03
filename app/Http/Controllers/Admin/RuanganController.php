<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ruangan;
use App\Models\Unit;
use Inertia;

class RuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Ruangan', [
            'ruangan' => Ruangan::orderBy('nama', 'asc')->with('unit')->get(),
            'unit' => Unit::orderBy('nama', 'asc')->get(),
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
        try{
            $request->validate([
                'nama' => ['required', 'string', 'unique:ruangan,nama'],
                'unit' => ['required'],
            ]);

            Ruangan::create([
                'nama' => $request->nama,
                'id_unit' => $request->unit,
            ]);

            return redirect()->route('admin.ruangan.index')->with('success', 'Ruangan Berhasil Di Tambahkan');
        } catch (\Exception $e) {
            return redirect()->route('admin.ruangan.index')->with('error', $e->getMessage());
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
        try{
            $request->validate([
                'nama_edit' => ['required', 'string', 'unique:ruangan,nama,' . $id],
                'unit_edit' => ['required'],
            ]);

            $ruangan = Ruangan::findOrFail($id);
            $ruangan->nama = $request->nama_edit;
            $ruangan->id_unit = $request->unit_edit;
            $ruangan->save();

            return redirect()->route('admin.ruangan.index')->with('success', 'Ruangan Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.ruangan.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            
            $ruangan = Ruangan::findOrFail($id);
            $ruangan->delete();

            return redirect()->route('admin.ruangan.index')->with('success', 'Ruangan Berhasil Di Delete');
        } catch (\Exception $e) {
            return redirect()->route('admin.ruangan.index')->with('error', $e->getMessage());
        }
    }
}
