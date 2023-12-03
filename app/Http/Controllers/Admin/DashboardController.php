<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laporan;
use Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Status
        $menunggu = Laporan::where('status', 'Menunggu Respon Petugas')->count();
        $proses = Laporan::where('status', 'Sedang Diproses')->count();
        $selesai = Laporan::where('status', 'Selesai')->count();

        // Filter 
        $laporanAll = Laporan::count();
        $currentYearReports = Laporan::whereYear('created_at', now()->year)->count();
        $currentMonthReports = Laporan::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)->count();
        $currentDayReports = Laporan::whereDate('created_at', now())->count();

        $pieChartData = [
            'labels' => ['Menunggu Respon Petugas', 'Sedang Diproses', 'Selesai'],
            'values' => [$menunggu, $proses, $selesai],
        ];

        return Inertia::render('Admin/Dashboard', [
            'pieChartData' => $pieChartData,
            'menunggu' => $menunggu,
            'proses' => $proses,
            'selesai' => $selesai,
            'laporanAll' => $laporanAll,
            'currentYearReports' => $currentYearReports,
            'currentMonthReports' => $currentMonthReports,
            'currentDayReports' => $currentDayReports,
        ]);
    }
}
