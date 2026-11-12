# 🚀 Panduan Deployment Penuh (Full DevOps Lead Guide)
**Penanggung Jawab**: Orang 1: Database Architect & Full DevOps Lead  
**Proyek**: Kopi Ruang Kita (Fullstack Web Application)  
**Target Arsitektur**:
- **Database**: PostgreSQL di **Supabase** (Region Singapore)
- **Backend API**: Node.js Express (Serverless on Vercel)
- **Frontend SPA**: React Vite di **Vercel**
- **Testing & QA**: **Postman Collection** (`KopiRuangKita.postman_collection.json`)

---

## 📋 Daftar Isi
1. [Tahap 1: Deploy Database PostgreSQL di Supabase (Singapore)](#tahap-1-deploy-database-postgresql-di-supabase)
2. [Tahap 2: Eksekusi Skema & Seed Data Database](#tahap-2-eksekusi-skema--seed-data-database)
3. [Tahap 3: Konfigurasi Connection Pooler (IPv4) & Vercel](#tahap-3-konfigurasi-connection-pooler-ipv4--vercel)
4. [Tahap 4: Pengujian Route Menggunakan Postman Collection](#tahap-4-pengujian-route-menggunakan-postman-collection)

---

## Tahap 1: Deploy Database PostgreSQL di Supabase

1. Buka [https://supabase.com](https://supabase.com) dan login menggunakan akun GitHub.
2. Klik tombol **"+ New Project"**.
3. Isi konfigurasi:
   - **Name**: `kopi-ruang-kita`
   - **Database Password**: Buat password aman (simpan password ini).
   - **Region**: `Southeast Asia (Singapore)`
   - **Pricing Plan**: `Free`
4. Klik **"Create new project"** dan tunggu hingga inisialisasi selesai.

---

## Tahap 2: Eksekusi Skema & Seed Data Database

1. Di dashboard Supabase, buka tab **SQL Editor** (ikon `>_`).
2. Klik **"New query"**, salin seluruh kode dari file `backend/database/schema.sql`, tempel, lalu klik **Run** (pilih *Run without RLS*).
3. Klik **"New query"** lagi, salin seluruh isi file `backend/database/seed.sql`, tempel, lalu klik **Run**.
4. 6 tabel (`users`, `menus`, `orders`, `order_items`, `promos`, `contacts`) dan 12 data menu resmi Kopi Ruang Kita kini telah aktif!

---

## Tahap 3: Konfigurasi Connection Pooler (IPv4) & Vercel

> ⚠️ **Catatan Penting IPv4:**  
> Tautan direct Supabase (`db.xxx.supabase.co`) hanya menggunakan IPv6. Untuk serverless host seperti Vercel, wajib menggunakan **Connection Pooler (IPv4)** pada port `6543`.

1. Format URL Connection Pooler:
   ```text
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```
2. Buka dashboard Vercel: **Settings -> Environment Variables**.
3. Atur variabel:
   - `DATABASE_URL`: *(URL Connection Pooler di atas)*
   - `JWT_SECRET`: `super_secret_jwt_key_kopi_ruang_kita_2026_devops_lead`
   - `NODE_ENV`: `production`
4. Buka tab **Deployments** di Vercel ➔ klik titik tiga `...` pada deployment teratas ➔ klik **Redeploy**.

---

## Tahap 4: Pengujian Route Menggunakan Postman Collection

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** ➔ pilih file `KopiRuangKita.postman_collection.json`.
3. Seluruh 17 endpoint sudah terstruktur rapi:
   - `0. System Health`
   - `1. Auth & Security (Orang 2)`
   - `2. Menus & Promo (Orang 3)`
   - `3. Orders & Transactions (Orang 4)`
   - `4. Contacts & QA (Orang 5)`
4. Klik tombol **Send** pada rute pengujian untuk memverifikasi alur API secara langsung.
