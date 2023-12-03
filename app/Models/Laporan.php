<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $table = 'laporan';

    protected $fillable = [
        'id_user',
        'id_unit',
        'id_ruangan',
        'id_asset',
        'kode',
        'pelapor',
        'nama_barang',
        'status',
        'kategori',
        'biaya_perbaikan',
        'keterangan',
        'catatan_petugas',
    ];
    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    
    
    }public function unit() {
        return $this->belongsTo(Unit::class, 'id_unit');
    }

    public function ruangan() {
        return $this->belongsTo(Ruangan::class, 'id_ruangan');
    }

    public function asset() {
        return $this->belongsTo(Asset::class, 'id_asset');
    }

    public function foto_laporan(){
        return $this->hasMany(FotoLaporan::class);
    }
}
