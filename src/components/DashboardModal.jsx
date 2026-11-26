import React from 'react';

export default function DashboardModal({
  isOpen,
  onClose,
  user,
  onLogout,
  onOpenOrderQueue,
  onOpenManageMenu,
  onOpenReport,
}) {
  if (!isOpen || !user) return null;

  const role = (user.role || 'staff').toLowerCase();

  // Aturan hak akses tampilan berdasarkan role
const canManageMenu = role === 'owner' || role === 'admin' || role === 'staff';  const canViewReport = role === 'owner';

  // Warna badge & label deskripsi per role
  const roleConfig = {
    owner: {
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      subtitle: 'Akses Penuh Pemilik & Laporan Keuangan',
    },
    admin: {
      badge: 'bg-stone-200 text-stone-800 border-stone-300',
      subtitle: 'Akses Manajemen Menu & Operasional Kasir',
    },
    staff: {
      badge: 'bg-[#EFE7DC] text-[#765640] border-[#E9DDCD]',
      subtitle: 'Akses Operasional Kasir & Antrean Pesanan',
    },
  };

  const currentRoleStyle = roleConfig[role] || roleConfig.staff;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#FDFBF7] rounded-3xl p-7 max-w-lg w-full shadow-2xl border border-[#E9DDCD] relative">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dashboard"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[#8C7A6B] hover:bg-[#EFE7DC] hover:text-[#4A3728] transition font-bold"
        >
          ✕
        </button>

        {/* Header & Info Sesi Staf */}
        <div className="border-b border-[#E9DDCD] pb-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-block px-3 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wider ${currentRoleStyle.badge}`}
            >
              {role}
            </span>
            <span className="text-xs text-[#8C7A6B]">• {currentRoleStyle.subtitle}</span>
          </div>
          <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728]">
            Dashboard Operasional
          </h3>
          <p className="text-sm text-[#6E5D4F] mt-0.5">
            Selamat bertugas,{' '}
            <span className="font-semibold text-[#4A3728]">
              {user.full_name || user.username}
            </span>
          </p>
        </div>

        {/* Menu Navigasi Operasional (Dinamis sesuai Role) */}
        <div className="space-y-3 mb-6">
          {/* 1. Semua Role (Owner, Admin, Staff) bisa akses Antrean Pesanan */}
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenOrderQueue) onOpenOrderQueue();
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E9DDCD] hover:border-[#765640] hover:bg-[#F8F3EB] transition text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#765640] flex items-center justify-center font-bold text-lg">
                🧾
              </div>
              <div>
                <h4 className="font-semibold text-[#4A3728] group-hover:text-[#765640] transition">
                  Antrean Pesanan & Kasir
                </h4>
                <p className="text-xs text-[#6E5D4F]">
                  Cek pesanan masuk, verifikasi bukti transfer & ubah status
                </p>
              </div>
            </div>
            <span className="text-[#8C7A6B] group-hover:translate-x-1 transition">→</span>
          </button>

          {/* 2. Hanya Owner & Admin yang bisa Kelola Menu */}
          {canManageMenu && (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenManageMenu) onOpenManageMenu();
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E9DDCD] hover:border-[#765640] hover:bg-[#F8F3EB] transition text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#765640] flex items-center justify-center font-bold text-lg">
                  ☕
                </div>
                <div>
                  <h4 className="font-semibold text-[#4A3728] group-hover:text-[#765640] transition">
                    Kelola Menu & Ketersediaan
                  </h4>
                  <p className="text-xs text-[#6E5D4F]">
                    Tambah menu baru, perbarui harga, atau atur stok habis
                  </p>
                </div>
              </div>
              <span className="text-[#8C7A6B] group-hover:translate-x-1 transition">→</span>
            </button>
          )}

          {/* 3. Khusus Owner yang bisa melihat Laporan Omset */}
          {canViewReport && (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenReport) onOpenReport();
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E9DDCD] hover:border-[#765640] hover:bg-[#F8F3EB] transition text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#765640] flex items-center justify-center font-bold text-lg">
                  📊
                </div>
                <div>
                  <h4 className="font-semibold text-[#4A3728] group-hover:text-[#765640] transition">
                    Laporan Omset Penjualan
                  </h4>
                  <p className="text-xs text-[#6E5D4F]">
                    Ringkasan pendapatan harian dan menu terlaris
                  </p>
                </div>
              </div>
              <span className="text-[#8C7A6B] group-hover:translate-x-1 transition">→</span>
            </button>
          )}
        </div>

        {/* Footer Tombol Logout & Tutup */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E9DDCD]">
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold transition flex items-center gap-2"
          >
            <span>Keluar / Logout</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#EFE7DC] hover:bg-[#E2D5C3] text-[#4A3728] text-sm font-medium transition"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
}