# Dashboard Maintenance Peralatan Produksi – PT Gardena Furniture

Versi digital Kartu Riwayat Maintenance (GRD-MTN). Aplikasi statis (HTML, CSS, JavaScript), tanpa build dan tanpa dependensi.

## Struktur file

| File | Isi |
|---|---|
| `index.html` | Kerangka halaman |
| `style.css` | Tampilan (mendukung mode terang dan gelap) |
| `data.js` | Data contoh peralatan dan riwayat kegiatan |
| `app.js` | Logika dashboard, form, dan penyimpanan |

## Menjalankan di komputer

Buka `index.html` di browser.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, lalu upload semua file di folder ini.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Alamat situs: `https://USERNAME.github.io/NAMA-REPO/`

## Mengganti data

Edit `EQ` (daftar peralatan) dan `SEED` (riwayat kegiatan) di `data.js`. Kegiatan yang diinput lewat form hanya tersimpan di browser (localStorage) perangkat itu. Untuk dipakai bersama tim, hubungkan ke database atau Google Sheets.
