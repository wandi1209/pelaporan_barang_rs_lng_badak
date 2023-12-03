<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoLaporan extends Model
{
    use HasFactory;

    protected $table = 'foto_laporan';

    protected $fillable = [
        'foto',
        'id_laporan',
    ];

    public function laporan(){
        return $this->belongsTo(Laporan::class, 'id_laporan');
    }
}
