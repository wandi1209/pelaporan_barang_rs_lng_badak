<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_unit');
            $table->unsignedBigInteger('id_asset');
            $table->string('kode')->unique();
            $table->string('pelapor');
            $table->string('nama_barang');
            $table->string('status');
            $table->enum('kategori', ['medis', 'non medis']);
            $table->float('biaya_perbaikan');
            $table->text('keterangan');
            $table->text('catatan_petugas');
            $table->timestamps();

            $table->foreign('id_unit')->references('id')->on('unit')->constrained()->onDelete('cascade');
            $table->foreign('id_asset')->references('id')->on('asset')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan');
    }
};
