import React from 'react';

export default function Navbar({
  setIsLoginOpen,
  setIsOrderModalOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  staffUser,
  setIsDashboardOpen,
  handleLogout
}) {
  return (
    <header className="bg-white text-[#4A3728] sticky top-0 z-40 shadow-sm border-b border-[#E9DDCD]">
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex justify-between items-center gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center shrink-0">
          <a
            href="#home"
            className="text-xl lg:text-2xl font-bold font-serif-custom tracking-wide text-[#4A3728] whitespace-nowrap"
          >
            Kopi Ruang Kita
          </a>
        </div>

        {/* Menu Navigasi Desktop */}
        <div className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-medium text-sm text-[#5F5146]">
          <a href="#home" className="hover:text-[#765640] transition whitespace-nowrap">Home</a>
          <a href="#tentang" className="hover:text-[#765640] transition whitespace-nowrap">Tentang Kami</a>
          <a href="#menu" className="hover:text-[#765640] transition whitespace-nowrap">Menu</a>
          <a href="#keranjang" className="hover:text-[#765640] transition whitespace-nowrap">Pesanan Anda</a>
          <a href="#promo" className="hover:text-[#765640] transition whitespace-nowrap">Promo</a>
          <a href="#kontak" className="hover:text-[#765640] transition whitespace-nowrap">Kontak</a>
        </div>

        {/* Tombol Aksi Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {staffUser ? (
            <>
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="text-[#4A3728] font-semibold text-sm transition flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E9DDCD] bg-[#F8F1E7] hover:bg-[#EFE4D4] shadow-xs whitespace-nowrap"
              >
                <span>Dashboard ({staffUser.username})</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-red-700 hover:bg-red-50 font-medium text-sm transition px-3 py-2 rounded-lg border border-red-200 bg-white whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-[#765640] hover:text-[#4A3728] font-medium text-sm transition flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E9DDCD] hover:bg-[#F8F1E7] bg-white shadow-xs whitespace-nowrap"
            >
              <span>🔒</span>
              <span>Login Staf</span>
            </button>
          )}
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="bg-[#765640] hover:bg-[#60432F] text-white font-semibold px-4 py-2.5 rounded-full transition text-sm shadow-sm whitespace-nowrap"
          >
            Pesan Sekarang
          </button>
        </div>

        {/* Tombol Hamburger Mobile & Tablet */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-2xl text-[#765640] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Dropdown Menu Mobile & Tablet */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F1E7] border-b border-[#E9DDCD] px-6 py-4 space-y-4 shadow-md">
          <div className="flex flex-col space-y-3 font-medium text-[#5F5146]">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Home</a>
            <a href="#tentang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Tentang Kami</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Menu</a>
            <a href="#keranjang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Pesanan Anda</a>
            <a href="#promo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Promo</a>
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Kontak</a>
          </div>

          <div className="pt-2 border-t border-[#E9DDCD] flex flex-col gap-3">
            {staffUser ? (
              <>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsDashboardOpen(true); }}
                  className="w-full text-center text-[#4A3728] font-semibold text-sm py-2 rounded-lg border border-[#E9DDCD] bg-white"
                >
                  Dashboard ({staffUser.username})
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                  className="w-full text-center text-red-700 font-medium text-sm py-2 rounded-lg border border-red-200 bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                className="w-full text-center text-[#765640] font-medium text-sm py-2 rounded-lg border border-[#E9DDCD] bg-white"
              >
                🔒 Login Staf
              </button>
            )}
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsOrderModalOpen(true); }}
              className="w-full text-center bg-[#765640] text-white font-semibold py-2.5 rounded-full text-sm shadow-sm"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}