<?php

use App\Http\Controllers\Admin\CetakLaporanController;
use App\Http\Controllers\Admin\NomorBadgeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RuanganController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\LaporanSayaController;
use App\Http\Controllers\Admin\AssetController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\FormulirController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

// Route Sesuai Role
Route::get('/redirect', [HomeController::class, 'redirect']);
Route::get('/sidebar/count', [HomeController::class, 'sidebar'])->name('sidebar.get');
Route::get('/developer', function(){
    return Inertia::render('Developer');
})->name('developer');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route Khusus User
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');

    // Formulir
    Route::get('/formulir', [FormulirController::class, 'index'])->name('formulir.index');
    Route::post('/formulir/store', [FormulirController::class, 'store'])->name('formulir.store');

    // Laporan Saya
    Route::get('/laporan-saya', [LaporanSayaController::class, 'index'])->name('laporan.saya.index');
    Route::get('/laporan-saya/{id}', [LaporanSayaController::class, 'show'])->name('laporan.saya.show');
    Route::put('/laporan-saya/update/{id}', [LaporanSayaController::class, 'update'])->name('laporan.saya.update');
    Route::post('/laporan-saya/upload/{id}', [LaporanSayaController::class, 'upload'])->name('laporan.saya.upload');
    Route::delete('/laporan-saya/delete/{id}', [LaporanSayaController::class, 'destroy'])->name('laporan.saya.destroy');
    Route::delete('/laporan-saya/foto/{id}', [LaporanSayaController::class, 'hapus'])->name('laporan.foto.destroy');

    // Foto
    Route::delete('/foto/delete/{id}', [LaporanSayaController::class, 'hapus'])->name('foto.hapus');


});

// Route Khusus Admin dan Petugas
Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('role:admin,petugas')->name('dashboard');

    // User
    Route::get('/user', [UserController::class, 'index'])->middleware('role:admin')->name('user.index');
    Route::put('/user/update/{id}', [UserController::class, 'update'])->middleware('role:admin')->name('user.update');
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->middleware('role:admin')->name('user.destroy');

    // Nomor Badge
    Route::get('/nomor-badge', [NomorBadgeController::class, 'index'])->middleware('role:admin')->name('badge.index');
    Route::post('/nomor-badge/import', [NomorBadgeController::class, 'import'])->middleware('role:admin')->name('badge.import');
    Route::post('/nomor-badge/store', [NomorBadgeController::class, 'store'])->middleware('role:admin')->name('badge.store');
    Route::put('/nomor-badge/update/{id}', [NomorBadgeController::class, 'update'])->middleware('role:admin')->name('badge.update');
    Route::delete('/nomor-badge/delete/{id}', [NomorBadgeController::class, 'destroy'])->middleware('role:admin')->name('badge.destroy');
    Route::get('/nomor-badge/download', [NomorBadgeController::class, 'download'])->name('badge.download');

    // Asset
    Route::get('/asset', [AssetController::class, 'index'])->middleware('role:admin,petugas')->name('asset.index');
    Route::post('/asset/import', [AssetController::class, 'import'])->middleware('role:admin,petugas')->name('asset.import');
    Route::post('/asset/store', [AssetController::class, 'store'])->middleware('role:admin,petugas')->name('asset.store');
    Route::put('/asset/update/{id}', [AssetController::class, 'update'])->middleware('role:admin,petugas')->name('asset.update');
    Route::delete('/asset/delete/{id}', [AssetController::class, 'destroy'])->middleware('role:admin,petugas')->name('asset.destroy');
    Route::get('/asset/download', [AssetController::class, 'download'])->name('asset.download');

    // Unit
    Route::get('/unit', [UnitController::class, 'index'])->middleware('role:admin,petugas')->name('unit.index');
    Route::post('/unit/store', [UnitController::class, 'store'])->middleware('role:admin,petugas')->name('unit.store');
    Route::put('/unit/update/{id}', [UnitController::class, 'update'])->middleware('role:admin,petugas')->name('unit.update');
    Route::delete('/unit/delete/{id}', [UnitController::class, 'destroy'])->middleware('role:admin,petugas')->name('unit.destroy');

    // Ruangan
    Route::get('/ruangan', [RuanganController::class, 'index'])->middleware('role:admin,petugas')->name('ruangan.index');
    Route::post('/ruangan/store', [RuanganController::class, 'store'])->middleware('role:admin,petugas')->name('ruangan.store');
    Route::put('/ruangan/update/{id}', [RuanganController::class, 'update'])->middleware('role:admin,petugas')->name('ruangan.update');
    Route::delete('/ruangan/delete/{id}', [RuanganController::class, 'destroy'])->middleware('role:admin,petugas')->name('ruangan.destroy');

    // Laporan
    Route::get('/laporan', [LaporanController::class, 'index'])->middleware('role:admin,petugas')->name('laporan.index');
    Route::get('/laporan/{id}', [LaporanController::class, 'show'])->middleware('role:admin,petugas')->name('laporan.show');
    Route::put('/laporan/update/{id}', [LaporanController::class, 'update'])->middleware('role:admin,petugas')->name('laporan.update');
    Route::put('/laporan/update/status/{id}', [LaporanController::class, 'updateStatus'])->middleware('role:admin,petugas')->name('laporan.update.status');
    Route::delete('/laporan/delete/{id}', [LaporanController::class, 'destroy'])->middleware('role:admin,petugas')->name('laporan.destroy');
    Route::post('/laporan/upload/{id}', [LaporanController::class, 'upload'])->name('laporan.upload');
    Route::delete('/laporan/delete/{id}', [LaporanController::class, 'destroy'])->name('laporan.destroy');
    Route::delete('/laporan/foto/{id}', [LaporanController::class, 'hapus'])->name('laporan.foto.destroy');
    
    // Cetak Laporan
    Route::get('/cetak', [CetakLaporanController::class, 'index'])->middleware('role:admin,petugas')->name('cetak.laporan.index');
    Route::get('/cetak/pdf', [CetakLaporanController::class, 'pdf'])->middleware('role:admin,petugas')->name('cetak.laporan.pdf');
    Route::get('/cetak/excel', [CetakLaporanController::class, 'excel'])->middleware('role:admin,petugas')->name('cetak.laporan.excel');

});

require __DIR__.'/auth.php';
