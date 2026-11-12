# Kopi Ruang Kita

Aplikasi web pemesanan dan katalog online untuk Kopi Ruang Kita. Proyek ini dibangun menggunakan React untuk frontend, Express.js untuk backend API, dan PostgreSQL (Supabase) sebagai basis data.

Demo Website: https://kopi-ruang-kita-lime.vercel.app

## Fitur

- Katalog menu kopi, non-kopi, dan makanan ringan
- Pemesanan meja dan kalkulasi total belanja
- Pilihan metode pembayaran (QRIS, Transfer Bank, Tunai)
- Tampilan struk pesanan digital
- Formulir kritik dan saran pelanggan
- Halaman login manajemen staf/admin

## Teknologi

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel

## Struktur Direktori

- `src/` : Komponen antarmuka dan halaman React
- `backend/` : Server Express.js, controller, route, dan konfigurasi database
- `backend/database/` : File DDL `schema.sql` dan data awal `seed.sql`
- `api/` : Serverless function handler untuk Vercel

## Menjalankan di Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/oryzaaulia300-blip/KopiRuangKita.git
cd KopiRuangKita
```

### 2. Jalankan Frontend
```bash
npm install
npm run dev
```
Buka browser di `http://localhost:5173`.

### 3. Jalankan Backend (Opsional untuk Pengembangan Lokal)
```bash
cd backend
npm install
npm run dev
```
Server backend berjalan di `http://localhost:5000`.

## Pengujian API

File koleksi pengujian endpoint dapat diimpor langsung ke Postman:
- `KopiRuangKita.postman_collection.json`
