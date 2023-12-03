<?php

namespace App\Imports;

use App\Models\NomorBadge;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class NomorBadgeImport implements ToCollection
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
                $existingData = NomorBadge::where('nomor_pekerja', $row[0])->first();

                if (!$existingData) {
                    NomorBadge::create([
                        'nomor_pekerja' => $row[0],
                        'nama_pekerja' => $row[1],
                    ]);
                } else {
                    // Handle error ketika data sudah ada
                    throw new \Exception("Data dengan nomor pekerja '{$row[0]}' sudah ada.");
                }
            }
        }
    }
}
