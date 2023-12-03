<?php

namespace App\Imports;

use App\Models\Asset;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class AssetImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $skip = 1;

        // Memeriksa apakah berkas Excel tidak kosong
        if ($collection->count() <= $skip) {
            throw new \Exception("Tidak Dapat Mengupload Berkas Kosong.");
        }

        foreach ($collection->skip($skip) as $row) {
            // Memeriksa apakah data tidak kosong
            if (!empty($row[0]) && !empty($row[1])) {
                $existingData = Asset::where('nomor', $row[0])->first();

                if (!$existingData) {
                    Asset::create([
                        'nomor' => $row[0],
                        'nama_barang' => $row[1],
                        'merk' => $row[2] ?? null,
                        'nomor_seri' => $row[3] ?? null,
                        'kondisi' => $row[4],
                    ]);
                } else {
                    // Handle error ketika data sudah ada
                    throw new \Exception("Data dengan nomor asset '{$row[0]}' sudah ada.");
                }
            }
        }
    }
}
