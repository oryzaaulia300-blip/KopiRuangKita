import React from 'react';

export default function Footer({
  igIcon,
  ttIcon,
  fbIcon,
  contactError,
  contactSuccess,
  contactForm,
  handleContactChange,
  handleContactSubmit
}) {
  return (
    <footer id="kontak" className="bg-[#F8F1E7] text-[#5F5146] py-8 border-t border-[#E9DDCD] mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Tentang */}
        <div className="flex flex-col justify-start">
          <h3 className="text-xl font-bold font-serif-custom mb-2 text-[#4A3728]">
            Kopi Ruang Kita
          </h3>
          <p className="text-sm text-[#5F5146] leading-relaxed">
            Menyajikan secangkir kopi dengan seribu cerita. Tempat terbaik untuk menemukan inspirasi dan ketenangan.
          </p>
        </div>

        {/* Informasi */}
        <div className="flex flex-col justify-start">
          <h3 className="text-base font-bold mb-2 text-[#4A3728]">
            Informasi & Lokasi
          </h3>
          <ul className="space-y-1.5 text-sm text-[#5F5146]">
            <li>📍 Jl. Dr. Mansyur No. 12, Medan</li>
            <li>🕒 Buka Setiap Hari: 08.00 - 22.00 WIB</li>
            <li>📞 0812-3456-7890</li>
          </ul>
        </div>

        {/* Media Sosial */}
        <div className="flex flex-col justify-start">
          <h3 className="text-base font-bold mb-2 text-[#4A3728]">
            Media Sosial
          </h3>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-lg bg-white border border-[#E9DDCD] flex items-center justify-center hover:bg-[#F8F1E7] transition overflow-hidden">
              <img src={igIcon} alt="Instagram" className="w-8 h-8 object-contain rounded-md" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white border border-[#E9DDCD] flex items-center justify-center hover:bg-[#F8F1E7] transition overflow-hidden">
              <img src={ttIcon} alt="TikTok" className="w-8 h-8 object-contain rounded-md" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white border border-[#E9DDCD] flex items-center justify-center hover:bg-[#F8F1E7] transition overflow-hidden">
              <img src={fbIcon} alt="Facebook" className="w-8 h-12 object-contain rounded-md" />
            </a>
          </div>
        </div>

        {/* Hubungi Kami (Form) */}
        <div className="flex flex-col justify-start">
          <h3 className="text-base font-bold mb-2 text-[#4A3728]">
            Hubungi Kami
          </h3>

          {contactError && (
            <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl">
              ⚠️ {contactError}
            </div>
          )}

          {contactSuccess && (
            <div className="mb-2 p-2 bg-green-100 border border-green-300 text-green-700 text-xs rounded-xl">
              ✅ {contactSuccess}
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-2">
            <div>
              <input
                type="text"
                name="nama"
                value={contactForm.nama}
                onChange={handleContactChange}
                placeholder="Nama Lengkap"
                className="w-full px-3.5 py-1.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640]"
              />
            </div>
            <div>
              <input
                type="tel"
                name="noHp"
                value={contactForm.noHp}
                onChange={handleContactChange}
                placeholder="Nomor HP / WhatsApp"
                className="w-full px-3.5 py-1.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640]"
              />
            </div>
            <div>
              <textarea
                name="pesan"
                rows="2"
                value={contactForm.pesan}
                onChange={handleContactChange}
                placeholder="Tulis pesan Anda..."
                className="w-full px-3.5 py-1.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640] resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#765640] hover:bg-[#60432F] text-white font-medium py-2 rounded-xl text-xs transition shadow-sm cursor-pointer"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>

    
      <div className="container mx-auto px-6 text-center mt-6 pt-4 border-t border-[#E9DDCD] text-[#5F5146] text-xs">
        &copy; 2026 Kopi Ruang Kita. All rights reserved.
      </div>
    </footer>
  );
}