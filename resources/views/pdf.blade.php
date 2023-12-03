<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Perbaikan Barang</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <style type="text/css">
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8pt;
        }
        th, td {
            border: 1px solid black;
            padding: 5px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2 !important;
        }
        .judul {
            font-size: 12pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }
        .tanggal-filter {
            font-size: 10pt;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="judul">Laporan Perbaikan Barang</div>
    <table>
        <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Kode Laporan</th>
                <th scope="col">Nomor Aset</th>
                <th scope="col">Merk</th>
                <th scope="col">Nomor Seri</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Unit Lokasi Barang</th>
                <th scope="col">Ruangan Barang Berada</th>
                <th scope="col">Pelapor</th>
                <th scope="col">Kategori</th>
                <th scope="col">Biaya Perbaikan</th>
                <th scope="col">Waktu Laporan</th>
                <th scope="col">Waktu Selesai Perbaikan</th>
                <th scope="col">Status</th>
                <th scope="col">keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($laporan as $laporanItem)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $laporanItem->kode }}</td>
                @if( empty($laporanItem->asset) )
                <td>-</td>
                <td>-</td>
                <td>-</td>
                @else
                <td>{{ $laporanItem->asset->nomor }}</td>
                <td>{{ $laporanItem->asset->merk ? $laporanItem->asset->merk : '-' }}</td>
                <td>{{ $laporanItem->asset->nomor_seri ? $laporanItem->asset->nomor_seri : '-' }}</td>
                @endif
                <td>{{ $laporanItem->id_asset ? $laporanItem->asset->nama_barang : $laporanItem->nama_barang }}</td>
                <td>{{ $laporanItem->unit->nama }}</td>
                <td>{{ $laporanItem->ruangan->nama }}</td>
                <td>{{ $laporanItem->user->name }}</td>
                <td>{{ $laporanItem->kategori }}</td>
                @if (empty($laporanItem->biaya_perbaikan))
                <td> - </td>
                @else
                <td>{{ 'Rp. ' . number_format(floatval(str_replace(['Rp. ', ',', '.'], '', $laporanItem->biaya_perbaikan)), 0, ',', '.') }}</td>
                @endif
                <td>{{ $laporanItem->created_at }}</td>
                @if($laporanItem->status == "Selesai")
                <td>{{ $laporanItem->updated_at }}</td>
                @else
                <td>-</td>
                @endif
                <td>{{ $laporanItem->status }}</td>
                <td>{{ $laporanItem->keterangan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div style="position: absolute; bottom: 40px; right: 20px; text-align: right; margin-bottom: 100px;">
        Mengetahui, 
    </div>
    <div style="position: absolute; bottom: 40px; right: 20px; text-align: right; margin-bottom: 15px;">
        Giyanto Sucipto, 
    </div>
    <div style="position: absolute; bottom: 40px; right: 20px; text-align: right;">
        Ka. Fasum 
    </div>
</body>
</html>