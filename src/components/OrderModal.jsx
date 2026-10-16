import React from 'react';

export default function OrderModal({
  isOpen,
  onClose,
  menuData,
  cart,
  updateCart,
  customerName,
  setCustomerName,
  tableNumber,
  setTableNumber,
  paymentMethod,
  setPaymentMethod,
  handleProcessOrder,
  cartItems,
  subtotalPrice,
  taxPrice,
  grandTotalPrice
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#F8F1E7] w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden relative">
        
        {/* Modal */}
        <div className="p-5 bg-white border-b border-[#E9DDCD] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-serif-custom text-[#4A3728]">Form Pemesanan & Pembayaran</h2>
            <p className="text-sm text-[#5F5146]">Pilih menu, masukkan data meja, dan selesaikan pembayaran.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-[#F8F1E7] flex items-center justify-center text-gray-500 hover:text-[#4A3728] hover:bg-[#E9DDCD] text-xl font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Isi Modal */}
        <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F8F1E7]">
          
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-[#4A3728] text-lg border-b border-[#E9DDCD] pb-2">1. Pilih Menu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
              {menuData.map(item => (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-[#E9DDCD] flex gap-3 items-center shadow-xs">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-[#4A3728] text-sm leading-tight">{item.name}</h4>
                    <p className="text-[#765640] font-semibold text-xs mb-2">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCart(item.id, -1)}
                        className="w-6 h-6 rounded-full bg-[#F8F1E7] text-[#765640] font-bold border border-[#E9DDCD] flex items-center justify-center text-xs"
                      >
                        −
                      </button>
                      <span className="font-bold text-[#4A3728] text-xs">
                        {cart[item.id] || 0}
                      </span>
                      <button
                        onClick={() => updateCart(item.id, 1)}
                        className="w-6 h-6 rounded-full bg-[#765640] text-white font-bold flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*Form Data & Pembayaran */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E9DDCD] shadow-sm flex flex-col justify-between">
            <form onSubmit={handleProcessOrder} className="space-y-4">
              <h3 className="font-bold text-[#4A3728] text-lg border-b border-[#E9DDCD] pb-2">2. Data & Metode Pembayaran</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3728] mb-1">Nama Pemesan</label>
                  <input 
                    type="text"
                    required
                    placeholder="Contoh: Budi"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3728] mb-1">Nomor Meja</label>
                  <input 
                    type="text"
                    required
                    placeholder="Contoh: 05"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3728] mb-1.5">Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      paymentMethod === 'qris'
                        ? 'bg-[#765640] text-white border-[#765640]'
                        : 'bg-white text-[#5F5146] border-[#E9DDCD]'
                    }`}
                  >
                    📱 QRIS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      paymentMethod === 'cash'
                        ? 'bg-[#765640] text-white border-[#765640]'
                        : 'bg-white text-[#5F5146] border-[#E9DDCD]'
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      paymentMethod === 'transfer'
                        ? 'bg-[#765640] text-white border-[#765640]'
                        : 'bg-white text-[#5F5146] border-[#E9DDCD]'
                    }`}
                  >
                    🏦 Transfer
                  </button>
                </div>
              </div>

              {paymentMethod === 'qris' && (
                <div className="bg-[#F8F1E7] p-3 rounded-xl border border-[#E9DDCD] text-center space-y-2">
                  <p className="text-xs font-bold text-[#4A3728]">Scan QRIS Kopi Ruang Kita</p>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=KopiRuangKitaQRIS" 
                    alt="QRIS Code" 
                    className="w-28 h-28 mx-auto border-2 border-white rounded-lg shadow-xs"
                  />
                  <p className="text-[10px] text-gray-500">Mendukung BCA, Mandiri, GoPay, OVO, Dana, dll.</p>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="bg-[#F8F1E7] p-3 rounded-xl border border-[#E9DDCD] text-xs text-[#5F5146] space-y-1">
                  <p className="font-bold text-[#4A3728]">Rekening Bank Mandiri:</p>
                  <p className="font-mono text-sm font-bold text-[#765640]">106-00-1234567-8</p>
                  <p className="text-[11px]">a.n. Kopi Ruang Kita</p>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="bg-[#F8F1E7] p-3 rounded-xl border border-[#E9DDCD] text-xs text-[#5F5146]">
                  💡 Lakukan pembayaran tunai langsung di kasir dengan menyebutkan <strong>Nama & Nomor Meja</strong>.
                </div>
              )}

              <div className="border-t border-[#E9DDCD] pt-3 space-y-1 text-xs">
                <div className="flex justify-between text-[#5F5146]">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} item)</span>
                  <span>Rp {subtotalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#5F5146]">
                  <span>Pajak (10%)</span>
                  <span>Rp {taxPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#4A3728] pt-1 border-t border-dashed border-[#E9DDCD]">
                  <span>Total Bayar</span>
                  <span className="text-[#765640]">Rp {grandTotalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#765640] hover:bg-[#60432F] text-white font-bold py-3 rounded-xl transition shadow-sm"
              >
                Konfirmasi & Bayar
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}