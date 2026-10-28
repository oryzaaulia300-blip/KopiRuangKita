import React from 'react';

export default function Hero({ logoImage, setIsOrderModalOpen }) {
  return (
    <section id="home" className="min-h-screen flex items-center bg-[#F8F1E7]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src={logoImage} 
                alt="Logo Kopi Ruang Kita" 
                className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md" 
              />
            </div>

            <span className="inline-block bg-[#E9DDCD] text-[#5F5146] text-xs font-bold tracking-widest px-4 py-2 rounded-full uppercase mb-5">
              Selamat Datang di Kopi Ruang Kita
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold font-serif-custom text-[#4A3728] leading-tight mb-6">
              Secangkir Kopi,
              <span className="text-[#765640]"> Seribu Cerita.</span>
            </h1>
            
            <p className="text-[#5F5146] text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Nikmati kopi pilihan dengan suasana nyaman untuk berkumpul, bekerja, dan berbagi cerita bersama orang-orang tersayang.
            </p>
            
            <div className="flex gap-4 justify-center">
              <a href="#menu" className="inline-block bg-white text-[#765640] border border-[#E9DDCD] font-semibold px-8 py-3.5 rounded-full shadow-sm hover:bg-[#F8F1E7] transition">
                Lihat Katalog Menu
              </a>
              <button onClick={() => setIsOrderModalOpen(true)} className="inline-block bg-[#765640] hover:bg-[#60432F] text-white font-semibold px-8 py-3.5 rounded-full shadow-sm transition">
                Pesan Sekarang
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
              alt="Secangkir kopi"
              className="w-full max-w-lg h-[450px] object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}