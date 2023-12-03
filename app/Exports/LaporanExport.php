<?php

namespace App\Exports;

use App\Models\laporan;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class LaporanExport implements FromCollection, WithHeadings, WithTitle, WithStyles
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $laporan = session('cetak_excel');

        $data = $laporan->map(function ($laporan, $index) {
            
            $selesai = ($laporan->status == 'Selesai') ? $laporan->updated_at : '-';
            $nomor_asset = (!empty($laporan->asset->id)) ? $laporan->asset->nomor : '-';
            $nama_barang = (!empty($laporan->asset->id)) ? $laporan->asset->nama_barang : $laporan->nama_barang;
            $merk = (!empty($laporan->asset->id)) ? $laporan->asset->merk : '-';
            $nomor_seri = (!empty($laporan->asset->id)) ? $laporan->asset->nomor_seri : '-';
            $biaya = (!empty($laporan->biaya_perbaikan)) ? 'Rp ' . number_format($laporan->biaya_perbaikan, 0, ',', '.') : '-';


            return [
                'No' => $index + 1, // Gunakan $index untuk nomor urut
                'Kode Laporan' => $laporan->kode,
                'Nomor Aset' => $nomor_asset,
                'Merk' => $merk ? $merk : '-',
                'Nomor Seri' => $nomor_seri ? : '-',
                'Nama Barang' => $nama_barang,
                'Nama Unit' => $laporan->unit->nama,
                'Nama Ruangan' => $laporan->ruangan->nama,
                'Pelapor' => $laporan->user->name,
                'Kategori' => $laporan->kategori,
                'Biaya Perbaikan' => $biaya,
                'Waktu Pelapor' => $laporan->created_at,
                'Waktu Selesai Perbaikan' => $selesai,
                'Status' => $laporan->status,
            ];
        });

        return $data;
    }

    public function headings(): array
    {
        // Daftar judul kolom Excel
        return ['No','Kode Laporan', 'Nomor Aset','Merk', 'Nomor Seri', 'Nama Barang', 'Unit Lokasi Barang', 'Ruangan Barang Berada', 'Pelapor','Kategori','Biaya Perbaikan','Waktu Laporan','Waktu Selesai Perbaikan','Status'];
    }

    public function title(): string
    {
        // Judul sheet dalam Excel
        return 'Laporan Perbaikan';
    }

    public function styles(Worksheet $sheet)
    {

        // Styling for the headers (e.g., bold, green background color)
        $sheet->getStyle('A1:N1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '006600'], // Green color
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'borders' => [
                'outline' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'], // Black color for the borders
                ],
            ],
        ]);

        // Set auto-size for columns A to H
        foreach (range('A', 'N') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Center all the text in the whole range (A2 to Hx)
        $lastRow = $sheet->getHighestRow();
        $range = "A2:N{$lastRow}";
        $sheet->getStyle($range)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Add borders for the data range
        $sheet->getStyle("A2:N{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'], // Black color for the borders
                ],
            ],
        ]);

        // Add extra styling, e.g., alignment, etc., if needed
        // ...
    }
}