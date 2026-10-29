export default function Contact({
  contactError,
  contactSuccess,
  contactForm,
  handleContactChange,
  handleContactSubmit
}) {
  return (
    <section
      id="kontak"
      className="bg-[#F8F1E7] text-[#5F5146] pt-10 pb-10 mb-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 lg:gap-16">

          {/* INFORMASI DAN LOKASI */}
          <div className="w-full max-w-[420px]">
            <h2 className="text-xl font-bold font-serif-custom mb-4 text-[#4A3728]">
              Informasi &amp; Lokasi
            </h2>

            <div className="w-full h-36 rounded-2xl overflow-hidden border border-[#E9DDCD] mb-3">
              <iframe
                title="Lokasi Kopi Ruang Kita"
                src="https://maps.google.com/maps?q=Jl.%20Dr.%20Mansyur%20No.%2012%2C%20Medan&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <ul className="space-y-1.5 text-sm">
              <li>📍 Jl. Dr. Mansyur No. 12, Medan</li>
              <li>🕒 Buka Setiap Hari: 08.00 - 22.00 WIB</li>
              <li>📞 0812-3456-7890</li>
            </ul>
          </div>

          {/* HUBUNGI KAMI */}
          <div className="w-full max-w-[420px]">
            <h2 className="text-xl font-bold font-serif-custom mb-4 text-[#4A3728]">
              Hubungi Kami
            </h2>

            {contactError && (
              <div className="mb-2 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl">
                ⚠️ {contactError}
              </div>
            )}

            {contactSuccess && (
              <div className="mb-2 p-3 bg-green-100 border border-green-300 text-green-700 text-sm rounded-xl">
                ✅ {contactSuccess}
              </div>
            )}

            <form
              onSubmit={handleContactSubmit}
              className="w-full space-y-2.5"
            >
              <input
                type="text"
                name="nama"
                value={contactForm.nama}
                onChange={handleContactChange}
                placeholder="Nama Lengkap"
                required
                className="block w-full box-border px-4 py-2.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640]"
              />

              <input
                type="tel"
                name="noHp"
                value={contactForm.noHp}
                onChange={handleContactChange}
                placeholder="Nomor HP / WhatsApp"
                required
                className="block w-full box-border px-4 py-2.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640]"
              />

              <textarea
                name="pesan"
                rows={2}
                value={contactForm.pesan}
                onChange={handleContactChange}
                placeholder="Tulis pesan Anda..."
                required
                className="block w-full box-border px-4 py-2.5 text-sm rounded-xl bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640] resize-none"
              />

              <button
                type="submit"
                className="block w-full bg-[#765640] hover:bg-[#60432F] text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}