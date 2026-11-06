# 🚂 Panduan Deployment Lengkap ke Railway (Railway.app)
**Penanggung Jawab**: Orang 1 - Database Architect & Full DevOps Lead  
**Platform**: [Railway.app](https://railway.app)  
**Keunggulan Railway**: Database PostgreSQL dan Backend Express berada dalam **satu project**, otomatis terhubung variabelnya, dan prosesnya jauh lebih ringkas!

---

## 📋 Alur Deployment di Railway

```mermaid
flowchart LR
    A["GitHub Repo (KopiRuangKita)"] -->|Deploy Service 1| B["Railway Backend (Express.js)"]
    C["Railway PostgreSQL (Database)"] -->|Auto Inject DATABASE_URL| B
    B -->|URL: *.up.railway.app| D["Vercel Frontend (React Vite)"]
```

---

## Tahap 1: Buat Project & Database PostgreSQL di Railway

1. Buka [https://railway.app](https://railway.app) dan **Login** menggunakan akun GitHub Anda.
2. Di Dashboard Railway, klik tombol **"New Project"**.
3. Pilih opsi **"Provision PostgreSQL"**.
4. Railway akan membuatkan service database PostgreSQL dalam hitungan detik.
5. Klik pada kotak service **Postgres**:
   - Buka tab **"Variables"**: Di sini Anda dapat melihat `DATABASE_URL` (format: `postgresql://postgres:...@...`).
   - Buka tab **"Data"**: Ini adalah SQL GUI bawaan Railway untuk melihat tabel.

---

## Tahap 2: Eksekusi Skema Tabel & Data Awal (schema.sql & seed.sql)

Ada 2 cara mudah:

### Cara A: Melalui Menu "Query" / "Data" di Railway
1. Di halaman service **Postgres** di Railway, klik tab **"Data"** atau **"Query"**.
2. Salin isi file [backend/database/schema.sql](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/backend/database/schema.sql), tempelkan ke query editor, lalu klik **Execute / Run**.
3. Salin isi file [backend/database/seed.sql](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/backend/database/seed.sql), tempelkan ke query editor, lalu klik **Execute / Run**.
4. 6 tabel (`users`, `menus`, `orders`, `order_items`, `promos`, `contacts`) dan seluruh data 12 menu langsung aktif!

### Cara B: Dari Laptop via CLI Migration
1. Di service **Postgres** -> tab **Connect** -> salin **Public Networking Connection URL** (misal: `postgresql://postgres:...@junction.proxy.rlwy.net:.../railway`).
2. Masukkan ke file `backend/.env`:
   ```env
   DATABASE_URL=postgresql://postgres:...@junction.proxy.rlwy.net:.../railway
   ```
3. Di terminal, jalankan:
   ```bash
   cd backend
   npm run db:setup
   ```

---

## Tahap 3: Deploy Backend Express ke Railway

1. Di dalam project Railway yang sama, klik tombol **"+ New"** (di pojok kanan atas canvas) -> pilih **"GitHub Repo"**.
2. Pilih repositori Anda: `oryzaaulia300-blip/KopiRuangKita`.
3. Klik pada service yang baru dibuat tersebut, lalu buka tab **"Settings"**:
   - **Service Name**: Ubah menjadi `kopi-ruang-kita-api` (opsional).
   - **Root Directory**: Ubah menjadi `/backend` *(⚠️ PENTING: wajib diisi `/backend`)*.
4. Buka tab **"Variables"**, tambahkan variabel berikut:
   - `DATABASE_URL`: Klik **"Add Reference"** lalu pilih `Postgres` -> `DATABASE_URL` *(Railway otomatis menghubungkan database!)*
   - `JWT_SECRET`: `kopi_ruang_kita_super_secret_jwt_2026`
   - `NODE_ENV`: `production`
   - `CLIENT_ORIGIN`: `http://localhost:5173,https://*.vercel.app`
5. Buka tab **"Networking"**:
   - Klik tombol **"Generate Domain"** di bagian *Public Networking*.
   - Railway akan memberikan domain publik gratis, contoh:  
     `https://kopi-ruang-kita-api-production.up.railway.app`
6. Buka tab **"Deployments"** -> tunggu status menjadi **Active**.
7. Uji di browser: buka `https://<domain-railway-anda>/api/health`.  
   Respon yang diharapkan:
   ```json
   {
     "status": "OK",
     "database": {
       "status": "CONNECTED"
     }
   }
   ```

---

## Tahap 4: Hubungkan Frontend di Vercel ke Railway

1. Buka [https://vercel.com](https://vercel.com) -> Masuk ke project frontend Anda (atau Import repo jika belum).
2. Buka menu **Settings** -> **Environment Variables**.
3. Tambahkan / Update variabel:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<domain-railway-anda>/api`  
     *(Contoh: `https://kopi-ruang-kita-api-production.up.railway.app/api`)*
4. Klik **Save** lalu lakukan **Redeploy** di Vercel agar environment variable baru aktif.
5. Kembali ke Railway -> service backend -> tab **Variables** -> perbarui `CLIENT_ORIGIN` dengan menyertakan domain Vercel Anda:
   ```text
   http://localhost:5173,https://kopi-ruang-kita.vercel.app
   ```

---

## 🎯 Selamat! Seluruh Sistem Kini Berjalan di Railway & Vercel
- **Database**: Railway PostgreSQL
- **Backend**: Railway Express Container
- **Frontend**: Vercel SPA (React Vite)
