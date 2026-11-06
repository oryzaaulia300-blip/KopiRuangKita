# ☕ Kopi Ruang Kita - Backend API Server
**Arsitek & DevOps**: Orang 1 (Database Architect & Full DevOps Lead)  
**Teknologi**: Node.js, Express.js (ES Module), PostgreSQL (`pg` Pool), JWT, Bcrypt, Helmet, CORS.

---

## 📁 Struktur Direktori Backend

```text
backend/
├── database/
│   ├── schema.sql           # DDL Skema 6 Tabel PostgreSQL & Triggers
│   ├── seed.sql             # Data awal menu, akun admin, promo & kontak
│   └── migrate.js           # CLI migration otomatis ke cloud DB
├── src/
│   ├── config/
│   │   └── db.js            # Koneksi PostgreSQL Pool dengan dukungan SSL
│   ├── controllers/
│   │   ├── authController.js    # Login, register staf, profile check
│   │   ├── menuController.js    # CRUD katalog menu kopi & snack
│   │   ├── orderController.js   # Checkout order transaksi + items
│   │   ├── promoController.js   # Manajemen promo & bundling
│   │   └── contactController.js # Formulir pesan & kontak
│   ├── middleware/
│   │   ├── authMiddleware.js    # Validasi JWT & Role authorization
│   │   └── errorHandler.js      # Error handler & 404 handler
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── promoRoutes.js
│   │   └── contactRoutes.js
│   ├── app.js               # Konfigurasi Express, CORS, Helmet, Parsers
│   └── server.js            # Server entrypoint & graceful shutdown
├── .env.example             # Contoh template variabel lingkungan
├── package.json
└── render.yaml              # Blueprint deployment Render.com
```

---

## ⚡ Perintah Cepat (Scripts)

```bash
# Masuk ke direktori backend
cd backend

# Install dependensi
npm install

# Setup skema & data awal ke PostgreSQL (Neon / Supabase / Local)
npm run db:setup

# Reset database & migrasi ulang dari awal
npm run db:reset

# Jalankan server dalam mode development (live reload)
npm run dev

# Jalankan server untuk mode production
npm start
```

---

## 🔐 Akun Default untuk Login Staf / Admin

| Username | Password | Role | Akses |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | `admin` | Akses penuh manajemen menu, promo, kontak & laporan |
| `owner` | `admin123` | `owner` | Akses monitoring laporan & penambahan user staf |
| `staff` | `admin123` | `staff` | Akses pemrosesan antrean pesanan kasir/barista |

---

## 🌐 Ringkasan Endpoint REST API

| Method | Endpoint | Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Publik | Health check status server & PostgreSQL |
| `POST` | `/api/auth/login` | Publik | Autentikasi user & penerbitan token JWT |
| `GET` | `/api/auth/me` | Protected | Data user aktif dari token |
| `POST` | `/api/auth/register` | Admin/Owner | Registrasi akun kasir/admin baru |
| `GET` | `/api/menus` | Publik | Mengambil katalog seluruh menu |
| `GET` | `/api/menus/:id` | Publik | Mengambil detail menu berdasarkan ID |
| `POST` | `/api/menus` | Admin/Owner | Menambahkan menu baru |
| `PUT` | `/api/menus/:id` | Admin/Owner | Memperbarui informasi atau harga menu |
| `DELETE` | `/api/menus/:id` | Admin/Owner | Menghapus menu |
| `POST` | `/api/orders` | Publik | Membuat pesanan baru meja pelanggan |
| `GET` | `/api/orders/:orderCode` | Publik | Cek struk pesanan pelanggan (kode `KRK-xxx`) |
| `GET` | `/api/orders` | Protected | Daftar seluruh antrean pesanan |
| `PATCH`| `/api/orders/:id/status`| Protected | Update status pesanan (PAID, COMPLETED, dll) |
| `GET` | `/api/promos` | Publik | Mengambil daftar promo aktif |
| `POST` | `/api/promos` | Admin/Owner | Menambahkan promo baru |
| `POST` | `/api/contacts` | Publik | Mengirim pesan dari formulir kontak |
| `GET` | `/api/contacts` | Protected | Melihat daftar pesan masuk dari pelanggan |
