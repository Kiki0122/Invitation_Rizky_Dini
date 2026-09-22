# Website Undangan Pernikahan

Template undangan statis yang dibuat dengan HTML, CSS, dan JavaScript murni.

## Cara mengubah data

1. Buka `script.js`.
2. Edit nilai pada objek `WEDDING_DATA` di bagian paling atas.
3. Ganti foto di folder `assets` bila diperlukan. Pertahankan nama file, atau ubah alamat file pada `index.html` dan `style.css`.

## Nama tamu dinamis

Tambahkan `?to=` pada URL. Contoh:

```text
index.html?to=Bapak%20Budi%20dan%20Keluarga
```

## Menjalankan di komputer

Buka terminal di folder proyek, lalu jalankan:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000` di browser.

## Deploy singkat

Folder ini dapat langsung diunggah ke Netlify Drop, GitHub Pages, atau layanan hosting statis lain. Tidak ada proses build dan tidak memerlukan database.
