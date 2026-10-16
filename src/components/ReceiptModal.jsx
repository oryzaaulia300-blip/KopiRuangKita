import React from 'react';

export default function ReceiptModal({ receiptData, onClose }) {
  if (!receiptData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-[#E9DDCD] font-mono text-xs text-gray-800 relative animate-[fadeIn_0.3s_ease-out]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black font-sans font-bold text-lg"
        >
          ✕
        </button>

        <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
          <h3 className="text-lg font-bold font-serif-custom text-[#4A3728]">KOPI RUANG KITA</h3>
          <p className="text-[11px] text-gray-500 font-sans">Jl. Dr. Mansyur No. 12, Medan</p>
          <p className="text-[10px] text-gray-400 font-sans">Telp: 0812-3456-7890</p>
        </div>

        <div className="space-y-1 mb-4 border-b border-gray-200 pb-3">
          <div className="flex justify-between">
            <span>No. Order:</span>
            <span className="font-bold">{receiptData.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal:</span>
            <span>{receiptData.tanggal}</span>
          </div>
          <div className="flex justify-between">
            <span>Pelanggan:</span>
            <span className="font-bold">{receiptData.nama}</span>
          </div>
          <div className="flex justify-between">
            <span>No. Meja:</span>
            <span className="font-bold">{receiptData.noMeja}</span>
          </div>
          <div className="flex justify-between">
            <span>Metode Bayar:</span>
            <span className="font-bold text-[#765640]">{receiptData.metode}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 border-b-2 border-dashed border-gray-300 pb-4">
          {receiptData.items.map(item => (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-[10px] text-gray-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <span className="font-bold">Rp {item.subtotal.toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>Rp {receiptData.subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Pajak (10%):</span>
            <span>Rp {receiptData.pajak.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-black border-t border-gray-300 pt-2">
            <span>GRAND TOTAL:</span>
            <span>Rp {receiptData.total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="text-center font-sans">
          <p className="text-xs font-semibold text-[#4A3728] mb-1">~ Terima Kasih Atas Kunjungan Anda ~</p>
          <p className="text-[10px] text-gray-400 mb-5">Secangkir Kopi, Seribu Cerita.</p>
          
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-bold transition"
            >
              🖨️ Cetak Struk
            </button>
            <button
              onClick={onClose}
              className="w-1/2 bg-[#765640] hover:bg-[#60432F] text-white py-2.5 rounded-xl text-xs font-bold transition"
            >
              Selesai
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}