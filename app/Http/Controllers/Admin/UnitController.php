<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ruangan;
use App\Models\Unit;
use Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Unit', [
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
                'nama' => ['required', 'string', 'unique:unit,nama'],
            ]);

            Unit::create([
                'nama' => $request->nama,
            ]);

            return redirect()->route('admin.unit.index')->with('success', 'Unit Berhasil Di Tambahkan');
        } catch (\Exception $e) {
            return redirect()->route('admin.unit.index')->with('error', $e->getMessage());
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
                'nama_edit' => ['required', 'string', 'unique:unit,nama,' . $id],
            ]);

            $unit = Unit::findOrFail($id);
            $unit->nama = $request->nama_edit;
            $unit->save();

            return redirect()->route('admin.unit.index')->with('success', 'Unit Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.unit.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $unit = Unit::findOrFail($id);
            $ruangan = Ruangan::where('id_unit', $id)->get();
            $unit->delete();
            if(!empty($unit)){
                return redirect()->route('admin.unit.index')->with('success', 'Unit dan Ruangan Terkait Dihapus Secara Permanen');
            } else{
                return redirect()->route('admin.unit.index')->with('success', 'Unit Dihapus Secara Permanen');
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.unit.index')->with('error', $e->getMessage());
        }
    }
}
