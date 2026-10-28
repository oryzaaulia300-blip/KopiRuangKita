import React from 'react';

export default function Navbar({
  setIsLoginOpen,
  setIsOrderModalOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  return (
    <header className="bg-white text-[#4A3728] sticky top-0 z-40 shadow-sm border-b border-[#E9DDCD]">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-serif-custom tracking-wide text-[#4A3728]">
            Kopi Ruang Kita
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 font-medium text-[#5F5146]">
          <a href="#home" className="hover:text-[#765640] transition">Home</a>
          <a href="#tentang" className="hover:text-[#765640] transition">Tentang Kami</a>
          <a href="#menu" className="hover:text-[#765640] transition">Menu</a>
          <a href="#keranjang" className="hover:text-[#765640] transition">Pesanan Anda</a>
          <a href="#promo" className="hover:text-[#765640] transition">Promo</a>
          <a href="#kontak" className="hover:text-[#765640] transition">Kontak</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-[#765640] hover:text-[#4A3728] font-medium text-sm transition flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E9DDCD] hover:bg-[#F8F1E7] bg-white shadow-xs"
          >
            🔒 <span>Login Staf</span>
          </button>
          <button 
            onClick={() => setIsOrderModalOpen(true)} 
            className="bg-[#765640] hover:bg-[#60432F] text-white font-semibold px-5 py-2.5 rounded-full transition text-sm shadow-sm"
          >
            Pesan Sekarang
          </button>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl text-[#765640] focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F8F1E7] border-b border-[#E9DDCD] px-6 py-4 space-y-4 shadow-md">
          <div className="flex flex-col space-y-3 font-medium text-[#5F5146]">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Home</a>
            <a href="#tentang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Tentang Kami</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Menu</a>
            <a href="#keranjang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Pesanan Anda</a>
            <a href="#promo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Promo</a>
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#765640] transition">Kontak</a>
          </div>
          
          <div className="pt-2 border-t border-[#E9DDCD] flex flex-col gap-3">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
              className="w-full text-center text-[#765640] font-medium text-sm py-2 rounded-lg border border-[#E9DDCD] bg-white"
            >
              🔒 Login Staf
            </button>
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