# 🚀 Panduan Deployment Penuh (Full DevOps Lead Guide)
**Penanggung Jawab**: Orang 1: Database Architect & Full DevOps Lead  
**Proyek**: Kopi Ruang Kita (Fullstack Web Application)  
**Target Arsitektur**:
- **Database**: PostgreSQL di **Neon.tech** (atau Supabase)
- **Backend API**: Node.js Express di **Render.com**
- **Frontend SPA**: React Vite di **Vercel**

---

## 📋 Daftar Isi
1. [Tahap 1: Deploy Database PostgreSQL (Neon.tech / Supabase)](#tahap-1-deploy-database-postgresql)
2. [Tahap 2: Eksekusi Skema & Seed Data Database](#tahap-2-eksekusi-skema--seed-data-database)
3. [Tahap 3: Deploy Backend Server ke Render.com](#tahap-3-deploy-backend-server-ke-rendercom)
4. [Tahap 4: Deploy Frontend React ke Vercel](#tahap-4-deploy-frontend-react-ke-vercel)
5. [Tahap 5: Sinkronisasi CORS & Environment Variables](#tahap-5-sinkronisasi-cors--environment-variables)
6. [Tahap 6: Smoke Testing & Verifikasi Live](#tahap-6-smoke-testing--verifikasi-live)

---

## Tahap 1: Deploy Database PostgreSQL

### Opsi Rekomendasi: Neon.tech (Gratis, Cepat, Serverless Postgres)
1. Buka [https://neon.tech](https://neon.tech) dan login menggunakan akun GitHub.
2. Klik tombol **"Create Project"**.
3. Isi detail proyek:
   - **Project Name**: `kopi-ruang-kita-db`
   - **Postgres Version**: `16` (atau 15)
   - **Region**: Pilih yang terdekat (misal `Singapore (ap-southeast-1)` atau `US East`).
4. Klik **"Create Project"**.
5. Di Dashboard Neon, pada tab **"Dashboard"** / **"Connection Details"**:
   - Pilih mode: **"Pooled connection"** (atau Direct).
   - Salin **Connection String** yang tertera. Bentuknya seperti:
     ```text
     postgresql://neondb_owner:npg_xxxxxxxxx@ep-proud-voice-xxxxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
     ```
   - ⚠️ Simpan string ini karena akan digunakan sebagai `DATABASE_URL`.

---

## Tahap 2: Eksekusi Skema & Seed Data Database

Terdapat 2 metode mudah untuk mengeksekusi DDL skema:

### Cara A (Otomatis via Script Migration - Sangat Praktis):
1. Buka file `backend/.env` di komputer Anda.
2. Masukkan URL koneksi Neon yang disalin tadi pada variabel `DATABASE_URL`:
   ```env
   DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxxx.neon.tech/neondb?sslmode=require
   ```
3. Buka terminal di folder proyek dan jalankan:
   ```bash
   npm run db:setup
   ```
   *(Atau masuk ke folder backend: `cd backend && npm run db:setup`)*
4. Script akan otomatis:
   - Menghubungkan ke cloud database dengan enkripsi SSL
   - Mengeksekusi tabel: `users`, `menus`, `orders`, `order_items`, `promos`, `contacts`
   - Memasang trigger `updated_at` dan indexing
   - Memasukkan data awal menu, promo, dan user admin (`admin` / `admin123`)

### Cara B (Manual via SQL Editor di Neon / Supabase):
1. Buka tab **"SQL Editor"** di dashboard Neon.tech atau Supabase.
2. Buka file `backend/database/schema.sql`, salin seluruh kodenya, tempel di SQL Editor, lalu klik **Run**.
3. Buka file `backend/database/seed.sql`, salin isinya, tempel di SQL Editor, lalu klik **Run**.

---

## Tahap 3: Deploy Backend Server ke Render.com

1. Buka [https://render.com](https://render.com) dan login dengan akun GitHub.
2. Di Dashboard, klik **"New +"** lalu pilih **"Web Service"**.
3. Pilih opsi **"Build and deploy from a Git repository"** dan hubungkan repositori:
   `https://github.com/oryzaaulia300-blip/KopiRuangKita`
4. Konfigurasikan pengaturan Web Service:
   - **Name**: `kopi-ruang-kita-api`
   - **Region**: Singapore (atau Oregon / Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend`  *(⚠️ PENTING: arahkan ke subfolder backend)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Tambahkan **Environment Variables** di bagian bawah:
   | Key | Value | Catatan |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Mode produksi |
   | `PORT` | `10000` | Port default Render |
   | `DATABASE_URL` | *(Paste Connection String Neon dari Tahap 1)* | Wajib diisi |
   | `JWT_SECRET` | `krk_super_secret_jwt_prod_2026_xyz` | String acak pengaman token |
   | `JWT_EXPIRES_IN` | `24h` | Durasi masa aktif login |
   | `CLIENT_ORIGIN` | `http://localhost:5173,https://*.vercel.app` | Izin CORS frontend |
6. Klik **"Create Web Service"**.
7. Tunggu hingga build selesai dan status menjadi **"Live"**.
8. Salin URL publik backend Anda, misalnya:  
   `https://kopi-ruang-kita-api.onrender.com`
9. Uji di browser: buka `https://kopi-ruang-kita-api.onrender.com/api/health`. Jika muncul status `"database": { "status": "CONNECTED" }`, backend telah 100% aktif!

---

## Tahap 4: Deploy Frontend React ke Vercel

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub.
2. Di Dashboard Vercel, klik **"Add New..."** -> **"Project"**.
3. Cari repositori `KopiRuangKita` dan klik **"Import"**.
4. Konfigurasi Project:
   - **Framework Preset**: `Vite` (terdeteksi otomatis)
   - **Root Directory**: `./` (tetap di root proyek)
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
5. Pada bagian **"Environment Variables"**, tambahkan:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://kopi-ruang-kita-api.onrender.com/api` *(Gunakan URL Render Anda dari Tahap 3 diikuti `/api`)*
6. Klik **"Deploy"**.
7. Tunggu sekitar 1-2 menit hingga proses build selesai.
8. Salin domain Vercel yang diberikan, misalnya:  
   `https://kopi-ruang-kita.vercel.app`

---

## Tahap 5: Sinkronisasi CORS & Environment Variables

Agar backend di Render mengizinkan permintaan transaksi dari domain Vercel publik:
1. Kembali ke Dashboard **Render.com** -> Buka web service `kopi-ruang-kita-api`.
2. Klik menu **"Environment"**.
3. Update nilai variabel `CLIENT_ORIGIN`:
   ```text
   http://localhost:5173,https://kopi-ruang-kita.vercel.app
   ```
4. Klik **"Save Changes"**. Render akan otomatis merestart service dalam beberapa detik.

---

## Tahap 6: Smoke Testing & Verifikasi Live

Jalankan pengujian end-to-end untuk memastikan aplikasi berjalan sempurna di internet:

### 1. Cek Server & Database Health:
- Kunjungi: `https://kopi-ruang-kita-api.onrender.com/api/health`
- Pastikan respon JSON:
  ```json
  {
    "status": "OK",
    "database": {
      "status": "CONNECTED"
    }
  }
  ```

### 2. Cek Pengambilan Katalog Menu:
- Kunjungi: `https://kopi-ruang-kita-api.onrender.com/api/menus`
- Pastikan 12 menu kopi, non-coffee, dan snack tampil lengkap.

### 3. Cek Login Dashboard (Owner / Admin):
- Endpoint: `POST https://kopi-ruang-kita-api.onrender.com/api/auth/login`
- Body:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- Respon harus menghasilkan `token` JWT dan info role `admin`.

### 4. Uji Alur Checkout Pesanan:
- Buka website Vercel di browser smartphone / laptop.
- Tambahkan menu ke keranjang -> Masukkan Nama Meja & Nomor WA -> Pilih QRIS/Transfer -> Konfirmasi.
- Pastikan struk pesanan (`KRK-XXXXXX`) berhasil keluar dan tersimpan ke PostgreSQL!
