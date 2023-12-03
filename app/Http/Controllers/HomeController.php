<?php

namespace App\Http\Controllers;

use Auth;
use Inertia;
use App\Models\Asset;
use App\Models\Laporan;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function redirect() 
    {
        if(auth()->check()) {
            $role = Auth::user()->role;
            if($role == 'user') {
                return redirect()->route('dashboard');
            } else {
                return redirect()->route('admin.dashboard');
            }
        }

        return redirect()->route('login');
    }

    public function index(){
        return Inertia::render('Dashboard');
    }

    public function sidebar() {
        $badgeCount = Laporan::where('status', 'Menunggu Respon Petugas')->count();
        return response()->json(['badgeCount' => $badgeCount]);
    }
}
