import React from 'react';

export default function PromoModal({
  showModal,
  selectedPromo,
  setShowModal
}) {
  if (!showModal || !selectedPromo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-[fadeIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="rounded-full bg-[#F8F1E7] px-3 py-1 text-xs font-bold text-[#765640]">
            {selectedPromo.label}
          </span>
          <button
            onClick={() => setShowModal(false)}
            className="text-xl font-bold text-gray-500 hover:text-[#4A3728]"
          >
            ✕
          </button>
        </div>

        <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728] mb-3">
          {selectedPromo.title}
        </h3>

        <p className="text-sm leading-relaxed text-[#5F5146] mb-5">
          {selectedPromo.description}
        </p>

        {selectedPromo.normalPrice && (
          <p className="text-sm text-gray-500 line-through">
            Harga normal {selectedPromo.normalPrice}
          </p>
        )}

        <p className="text-2xl font-bold text-[#765640] mb-6">
          {selectedPromo.price}
        </p>

        <button
          onClick={() => setShowModal(false)}
          className="w-full rounded-xl bg-[#765640] py-3 font-semibold text-white transition hover:bg-[#60432F]"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}