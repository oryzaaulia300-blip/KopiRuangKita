import React from 'react';

export default function CartSection({
  cartItems,
  subtotalPrice,
  taxPrice,
  grandTotalPrice,
  setIsOrderModalOpen
}) {
  return (
    <section id="keranjang" className="py-20 bg-white border-t border-[#E9DDCD]">
      <div className="container mx-auto px-5 md:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">Kalkulator & Ringkasan</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-2 mb-3">
            Pesanan Anda
          </h2>
          <p className="text-[#5F5146]">
            Periksa item pesanan Anda dan kalkulasi total harganya secara otomatis.
          </p>
        </div>

        <div className="bg-[#F8F1E7] rounded-3xl p-6 md:p-8 border border-[#E9DDCD] shadow-sm">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-3">🛒</span>
              <p className="text-[#5F5146] font-medium text-lg mb-2">Keranjang Anda masih kosong.</p>
              <p className="text-sm text-gray-500 mb-6">Klik tombol 'Pesan Sekarang' untuk mulai memesan.</p>
              <button onClick={() => setIsOrderModalOpen(true)} className="inline-block bg-[#765640] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#60432F] transition">
                Pesan Sekarang
              </button>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E9DDCD] text-[#4A3728] text-sm uppercase font-semibold">
                      <th className="pb-3">Menu</th>
                      <th className="pb-3 text-center">Harga</th>
                      <th className="pb-3 text-center">Jumlah</th>
                      <th className="pb-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DDCD]">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="text-[#5F5146]">
                        <td className="py-4 font-semibold text-[#4A3728]">{item.name}</td>
                        <td className="py-4 text-center">Rp {item.price.toLocaleString('id-ID')}</td>
                        <td className="py-4 text-center font-bold text-[#4A3728]">{item.quantity}</td>
                        <td className="py-4 text-right font-bold text-[#4A3728]">
                          Rp {item.subtotal.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t-2 border-dashed border-[#E9DDCD] pt-4 space-y-3">
                <div className="flex justify-between text-[#5F5146] text-sm">
                  <span>Subtotal</span>
                  <span>Rp {subtotalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#5F5146] text-sm">
                  <span>Pajak (10%)</span>
                  <span>Rp {taxPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#4A3728] pt-2 border-t border-[#E9DDCD]">
                  <span>Grand Total</span>
                  <span className="text-[#765640]">Rp {grandTotalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="w-full bg-[#765640] hover:bg-[#60432F] text-white font-bold py-3.5 rounded-2xl transition shadow-sm text-center"
                >
                  Ubah / Lanjutkan Pemesanan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}