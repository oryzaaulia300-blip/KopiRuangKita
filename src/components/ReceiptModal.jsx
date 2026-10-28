import React, { useRef, useState } from 'react';

export default function ReceiptModal({ receiptData, onClose }) {
  const receiptRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Mencegah error jika data kosong
  if (!receiptData) return null;

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    if (!element) return;

    // Cek apakah script dari index.html sudah terbaca oleh browser
    if (typeof window.html2pdf === 'undefined') {
      alert('Sistem PDF belum siap. Pastikan internet terhubung agar script CDN berjalan.');
      return;
    }

    // Mengaktifkan status loading agar tombol tidak ditekan double
    setIsDownloading(true);

    const options = {
      margin: 5,
      filename: `Struk-${receiptData.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Proses konversi dan download langsung
    window.html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        // Matikan loading saat selesai download
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error("Gagal unduh PDF:", err);
        setIsDownloading(false); // Kembalikan tombol jika error
        alert('Terjadi kesalahan saat mengunduh PDF.');
      });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000]/70 backdrop-blur-sm p-4">
      <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl p-6 shadow-2xl border border-[#E9DDCD] font-mono text-xs text-[#1F2937] relative">
        
        {/* Tombol Silang */}
        <button 
          type="button"
          onClick={onClose}
          disabled={isDownloading}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#000000] font-sans font-bold text-lg cursor-pointer z-50 disabled:opacity-50"
        >
          ✕
        </button>

        {/* --- Area Konten Struk (Bebas warna oklch) --- */}
        <div ref={receiptRef} className="p-2 bg-[#FFFFFF]">
          <div className="text-center border-b-2 border-dashed border-[#D1D5DB] pb-4 mb-4">
            <h3 className="text-lg font-bold font-serif-custom text-[#4A3728]">KOPI RUANG KITA</h3>
            <p className="text-[11px] text-[#6B7280] font-sans">Jl. Dr. Mansyur No. 12, Medan</p>
            <p className="text-[10px] text-[#9CA3AF] font-sans">Telp: 0812-3456-7890</p>
          </div>

          <div className="space-y-1 mb-4 border-b border-[#E5E7EB] pb-3">
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

          <div className="space-y-2 mb-4 border-b-2 border-dashed border-[#D1D5DB] pb-4">
            {receiptData.items?.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{item.quantity} x Rp {item.price?.toLocaleString('id-ID')}</p>
                </div>
                <span className="font-bold">Rp {item.subtotal?.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 mb-6">
            <div className="flex justify-between text-[#4B5563]">
              <span>Subtotal:</span>
              <span>Rp {receiptData.subtotal?.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-[#4B5563]">
              <span>Pajak (10%):</span>
              <span>Rp {receiptData.pajak?.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#000000] border-t border-[#D1D5DB] pt-2">
              <span>GRAND TOTAL:</span>
              <span>Rp {receiptData.total?.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="text-center font-sans">
            <p className="text-xs font-semibold text-[#4A3728] mb-1">~ Terima Kasih Atas Kunjungan Anda ~</p>
            <p className="text-[10px] text-[#9CA3AF]">Secangkir Kopi, Seribu Cerita.</p>
          </div>
        </div>

        {/* --- Tombol Aksi --- */}
        <div className="flex gap-2 mt-5 font-sans">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-1/2 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] py-2.5 rounded-xl text-xs font-bold transition cursor-pointer relative z-50 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDownloading ? '⏳ Memproses...' : '📥 Download Struk'}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            disabled={isDownloading}
            className="w-1/2 bg-[#765640] hover:bg-[#60432F] text-[#FFFFFF] py-2.5 rounded-xl text-xs font-bold transition cursor-pointer relative z-50 disabled:opacity-50"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
}