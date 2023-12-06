<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laporan;
use App\Models\User;
use Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/User', [
            'user' => User::orderBy('name', 'asc')->get(),
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
            $user = User::findOrFail($id);

            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'jabatan' => ['required', 'string', 'max:255'],
                'nomor_badge' => ['required', 'max:7', 'exists:nomor_badge,nomor_pekerja', 'unique:users,nomor_badge,' . $id],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,' . $id ],
                'role' => ['required'],
            ]);

            $user->name = $request->name;
            $user->jabatan = $request->jabatan;
            $user->nomor_badge = $request->nomor_badge;
            $user->role = $request->role;
            if ($request->email !== $user->email) {
                $user->email_verified_at = null;
            }
            $user->email = $request->email;
            if($request->password !== null){
                $user->password=Hash::make($request->password);
            }
            if($request->role !== ''){
                $user->role = $request->role;
            }
            $user->save();

            return redirect()->route('admin.user.index')->with('success', 'User Berhasil Di Update');
        } catch (\Exception $e) {
            return redirect()->route('admin.user.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $user = User::findOrFail($id);
            if(Auth()->user()->id === $user->id) {
                return redirect()->route('admin.user.index')->with('error', 'Tidak Dapat Menghapus User Sendiri');
            }
            $laporan = Laporan::where('id_user', $user->id)->get();
            if($laporan){
                return redirect()->route('admin.user.index')->with('error', 'Tidak Dapat Menghapus User Yang Memiliki Laporan');
            } else {
                $user->delete();
            }
            return redirect()->route('admin.user.index')->with('success', 'User Dihapus Secara Permanen');
        } catch (\Exception $e) {
            return redirect()->route('admin.user.index')->with('error', $e->getMessage());
        }
    }
}
