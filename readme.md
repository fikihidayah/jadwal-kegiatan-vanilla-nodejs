# Aplikasi Jadwal Kegiatan dengan REST API Berbasis NodeJS Murni

## By: Syafiki Hidayah

Aplikasi ini menggunakan _NodeJS_ Murni atau menggunakan core module saja, tanpa ada framework atau **node_modules**

_Pastikan sudah menginstal **NodeJS** di Komputer!_ saya menggunakan di versi 14

<br>
Cara menjalankan server pada terminal atau command prompt ketikan :

```
node app.mjs
```

Lalu buka REST API _Client_ seperti [Postman](https://www.postman.com/downloads/) atau sejenisnya atau langung di website dengan menggunakan **CURL**, **ajax** atau sejenis agar bisa mengakses fitur ubah(**PUT**) dan hapus(**DELETE**)

Struktur data :

1. Orang

    | Nama | Tipe Data      |
    |------|----------------|
    | id   | String(unique) |
    | nama | String         |

2. Jadwal
   
    | Nama          | Tipe Data     |
    |---------------|---------------|
    | jam           | String(unique)|
    | nama_kegiatan | String        |
    | orang         | Object Orang  |


Base Endpoint: default port: 3001
``` 
port: 3001
http://localhost:{port}
```

Endpoint orang:

Mendapatkan seluruh data(GET)
```
/orang
```
Sample response :
```json
[
    {
        "jam": "13:00-14:00",
        "nama_kegiatan": "Solat dan istirahat",
        "orang": {
            "id": "mantap",
            "nama": "Syafiki Hidayah"
        }
    },
    {
        "jam": "14:00-15:00",
        "nama_kegiatan": "Membuat konten youtube bersama rafatar",
        "orang": {
            "id": "rafa",
            "nama": "Rafi Ahmada"
        }
    }
]
```

Mendapatkan satu data bedasarkan id(GET)
```
/orang?id=mantap
```
Sample response :
```json
{
    "id": "mantap",
    "nama": "Syafiki Hidayah"
}
```

Menambah satu data (POST)
```
/orang
```

Sampel data untuk mengirimkan data lewat **body** :

```json
// Header set | Content-Type:application-json
// /orang
{
   "id": "rafa",
   "nama": "Rafi Ahmad" // tidak wajib diisi saat menghapus data
}

// Jadwal
{
    "jam": "14:00-15:00",
    "nama_kegiatan": "Membuat konten youtube bersama rafatar", // tidak wajib diisi saat menghapus data
    "id_orang": "rafa" // tidak wajib diisi saat edit dan hapus data
}

```

Sample response :
```json
{
    "status": 200,
    "added": {
        "id": "rafa",
        "nama": "Rafi Ahmad"
    },
    "data": [
        {
            "id": "mantap",
            "nama": "Syafiki Hidayah"
        },
        {
            "id": "rafa",
            "nama": "Rafi Ahmada"
        }
    ]
}
```

Mengubah satu data (PUT)
```
/orang
```
Sample response :
```json
{
    "status": 200,
    "updated": {
        "id": "rafa"
    },
    "data": [
        {
            "id": "mantap",
            "nama": "Syafiki Hidayah"
        },
        {
            "id": "rafa",
            "nama": "Rafi Ahmada"
        }
    ]
}
```

Mengubah satu data (DELETE)
```
/orang
```
Sample response :
```json
{
    "status": 200,
    "message": "Data orang dengan id mantap berhasil dihapus"
}
```


Untuk endpoint dan mekanisme penggunaan Jadwal sama seperti orang 
<br>
<br>

Aplikasi ini sudah ada fitur validasi unique(tidak boleh ada data yang sama)

_Perlu diingat data pada aplikasi ini berjalan di memori sehingga jika servernya di restart data akan kembali seperti semula_

Aplikasi ini dishare untuk digunakan proses pembelajaran saya atau teman-teman yang ingin mencari referensi.