# Kopi Ruang Kita — Web & Order Management System

Aplikasi web pemesanan kopi dan manajemen operasional kafe berbasis **Fullstack Web Application** dengan arsitektur serverless, database relasional PostgreSQL, dan keamanan berbasis JWT.

🔗 **Live Production URL:** [https://kopi-ruang-kita-lime.vercel.app](https://kopi-ruang-kita-lime.vercel.app)  
📊 **Database:** PostgreSQL di **Supabase (Region Singapore)** via IPv4 Session/Transaction Pooler.

## 🚀 Arsitektur & Tech Stack

| Layer | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | UI responsif untuk katalog menu, keranjang, checkout meja, struk digital, dan modal login staf. |
| **Backend** | Express.js, Node.js (ESM), `pg` (node-postgres) | RESTful API serverless yang terintegrasi di Vercel (`/api/*`). |
| **Database** | PostgreSQL 15+ (Supabase Singapore) | 6 tabel relasional dengan integritas Foreign Key, CHECK constraints, dan auto-update trigger. |
| **Keamanan** | BcryptJS & JSON Web Token (JWT) | Password terenkripsi satu arah dan proteksi role-based endpoint staf/owner. |
| **DevOps** | Vercel CI/CD & Supabase Pooler IPv4 | Deployment otomatis via GitHub branch `main`. |

---

## 🗄️ Desain Database (6 Tabel Relasional)

Skema database dirancang lengkap di [DATABASE_DESIGN.md](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/DATABASE_DESIGN.md) dan [schema.sql](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/backend/database/schema.sql):

1. **`users`**: Akun staf, admin, dan owner dengan role-based access control.
2. **`menus`**: Katalog menu kopi, non-coffee, snack, dan makanan dengan status ketersediaan.
3. **`orders`**: Header pesanan pelanggan (kode `KRK-XXXXXX`, nama, nomor meja, metode bayar, total).
4. **`order_items`**: Detail item pesanan yang berelasi ke `orders` (Cascade Delete) dan `menus`.
5. **`promos`**: Daftar penawaran bundling dan diskon aktif di halaman utama.
6. **`contacts`**: Formulir pesan/feedback pengunjung yang tersimpan ke database.



## 👥 Pembagian Peran Tim (5 Orang)

* **👑 Orang 1 — Database Architect & Full DevOps Lead:**
  * Merancang ERD, DDL PostgreSQL (`schema.sql`), koneksi connection pool, setup CORS & serverless Vercel.
  * Deployment penuh database Supabase (Singapore) dan hosting Vercel Production.
* **🔐 Orang 2 — Auth & Security Developer:**
  * Endpoint `POST /api/auth/login`, validasi Bcrypt, penerbitan JWT token, dan middleware autentikasi staf.
* **📋 Orang 3 — Menu & Promo API Developer:**
  * REST API CRUD Menu (`/api/menus`) dan promo (`/api/promos`), integrasi data dinamis di UI frontend.
* **💳 Orang 4 — Transaction & Order Engine Developer:**
  * Logika pemesanan (`POST /api/orders`) dengan transaksi ACID relasional, generate struk pesanan, dan antrean kasir.
* **📊 Orang 5 — Contact API, Analytics & QA Lead:**
  * Formulir kontak (`POST /api/contacts`), analitik omset (`GET /api/reports/summary`), dan pengujian Postman.


## 🧪 Dokumentasi & Pengujian API (Postman)

Proyek ini telah dilengkapi 2 koleksi Postman siap pakai:
1. **[KopiRuangKita.postman_collection.json](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/KopiRuangKita.postman_collection.json)**: Koleksi lengkap 18 endpoint untuk Orang 2 s/d Orang 5 (QA Lead).
2. **[KopiRuangKita_Orang1_DevOps.postman_collection.json](file:///c:/Users/rumah/Documents/GitHub/KopiRuangKita/KopiRuangKita_Orang1_DevOps.postman_collection.json)**: Koleksi khusus verifikasi infrastruktur, health check, dan integritas skema database oleh Orang 1.



## 💻 Panduan Menjalankan Secara Lokal (Local Development)

### 1. Clone Repositori
```bash
git clone https://github.com/oryzaaulia300-blip/KopiRuangKita.git
cd KopiRuangKita
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Isi DATABASE_URL di file .env dengan connection string Supabase Anda
npm run dev
```

### 3. Setup Frontend
```bash
# Di root folder proyek
npm install
npm run dev
```
Akses frontend di browser: `http://localhost:5173`.
Akses backend lokal di: `http://localhost:5000/api/health`.

---

## 📄 Lisensi & Hak Cipta
Dibuat untuk tugas kolaboratif pengembangan web fullstack **Kopi Ruang Kita**.
