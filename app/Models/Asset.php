<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $table = 'asset';

    protected $fillable = [
        'nomor',
        'nama_barang',
        'merk',
        'nomor_seri',
        'kondisi',
    ];
}