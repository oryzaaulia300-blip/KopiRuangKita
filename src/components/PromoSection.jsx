import React from 'react';

export default function PromoSection({ openPromoModal }) {
  return (
    <section id="promo" className="py-20 bg-white">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-12">
          <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">Penawaran Menarik</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-3 mb-4">PROMO SPESIAL!</h2>
          <p className="text-[#5F5146] max-w-xl mx-auto">Ada lebih banyak alasan untuk mampir dan menikmati waktu di Kopi Ruang Kita.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <article
            onClick={() => openPromoModal({
              title: 'Teman Santai Sore',
              label: 'PAKET NYORE',
              description: 'Nikmati Kopi Susu Gula Aren dan Roti Bakar Coklat dalam satu paket hemat.',
              price: 'Rp29.000',
              normalPrice: 'Rp34.000'
            })}
            className="cursor-pointer bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase">Promo Bundling</span>
              <span className="text-xl">☕</span>
            </div>
            <img
              src="/gambarr 1.png"
              alt="Paket Nyore"
              className="w-full h-[420px] object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">PAKET NYORE</span>
              <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Teman Santai Sore</h3>
              <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Nikmati Kopi Susu Gula Aren dan Roti Bakar Coklat dalam satu paket hemat.</p>
              <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                <p className="text-sm text-[#5F5146]">Harga normal <span className="line-through">Rp34.000</span></p>
                <p className="text-2xl font-bold text-[#765640]">Rp29.000</p>
              </div>
            </div>
          </article>

          <article
            onClick={() => openPromoModal({
              title: 'Beli 1, Gratis 1',
              label: 'HAPPY HOUR',
              description: 'Pesan satu minuman pilihan dan dapatkan satu minuman gratis selama Happy Hour.',
              price: '13.00–15.00'
            })}
            className="cursor-pointer bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase">Buy 1 Get 1</span>
              <span className="text-xl">🎉</span>
            </div>
            <img
              src="/gambarr 2.png"
              alt="Promo BOGO"
              className="w-full h-[420px] object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">HAPPY HOUR</span>
              <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Beli 1, Gratis 1</h3>
              <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Pesan satu minuman pilihan dan dapatkan satu minuman gratis selama Happy Hour.</p>
              <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                <p className="text-2xl font-bold text-[#765640]">13.00–15.00</p>
              </div>
            </div>
          </article>

          <article
            onClick={() => openPromoModal({
              title: 'Senin Lebih Hemat',
              label: 'MONDAY DEAL',
              description: 'Nikmati menu favoritmu dan dapatkan diskon 10%.',
              price: 'DISKON 10%'
            })}
            className="cursor-pointer bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase">Promo Mingguan</span>
              <span className="text-xl">✨</span>
            </div>
            <img
              src="/gambarr 3.png"
              alt="Promo Senin"
              className="w-full h-[420px] object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">MONDAY DEAL</span>
              <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Senin Lebih Hemat</h3>
              <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Awali minggu dengan menikmati menu favoritmu dan dapatkan diskon 10%.</p>
              <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                <p className="text-3xl font-bold text-[#765640]">DISKON 10%</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}