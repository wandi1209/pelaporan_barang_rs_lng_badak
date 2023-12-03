<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomorBadge extends Model
{
    use HasFactory;

    protected $table = 'nomor_badge';

    protected $fillable = [
        'nomor_pekerja',
        'nama_pekerja',
    ];
}
