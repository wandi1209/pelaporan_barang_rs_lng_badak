<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    use HasFactory;

    protected $table = 'ruangan';

    protected $fillable = [
        'nama',
        'id_unit',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'id_unit');
    }
}
