import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const CATEGORIES = ['Coffee', 'Non-Coffee', 'Snack', 'Food', 'Dessert'];

const INITIAL_FORM = {
  name: '',
  category: 'Coffee',
  price: '',
  img: '',
  description: '',
  is_available: true,
};

export default function ManageMenuModal({
  isOpen,
  onClose,
  menus = [],
  onMenusUpdated,
  showToast,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEditingId(null);
      setForm(INITIAL_FORM);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectEdit = (item) => {
    setEditingId(item.id);
    setErrorMsg('');
    setForm({
      name: item.name || '',
      category: item.category || 'Coffee',
      price: item.price !== undefined ? String(item.price) : '',
      img: item.img || '',
      description: item.description || '',
      is_available: item.is_available !== undefined ? Boolean(item.is_available) : true,
    });
  };

  const handleResetForm = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const numericPrice = Number(form.price);
    if (!form.name.trim()) {
      setErrorMsg('Nama menu wajib diisi.');
      return;
    }
    if (form.price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
      setErrorMsg('Harga harus berupa angka 0 atau lebih.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: numericPrice,
      img: form.img.trim() || null,
      description: form.description.trim() || null,
      is_available: Boolean(form.is_available),
    };

    setIsSubmitting(true);
    try {
      if (editingId) {
        await api.updateMenu(editingId, payload);
        showToast?.(`Menu "${payload.name}" berhasil diperbarui.`);
      } else {
        await api.createMenu(payload);
        showToast?.(`Menu "${payload.name}" berhasil ditambahkan.`);
      }

      handleResetForm();
      await onMenusUpdated?.();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan data menu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Hapus menu "${item.name}"?`);
    if (!confirmed) return;

    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await api.deleteMenu(item.id);
      if (editingId === item.id) {
        handleResetForm();
      }
      showToast?.(`Menu "${item.name}" berhasil dihapus.`);
      await onMenusUpdated?.();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menghapus menu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] text-[#4A3728] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#E9DDCD]">
        <div className="flex items-center justify-between border-b border-[#E9DDCD] pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif-custom">Kelola Menu</h2>
            <p className="text-sm text-[#5F5146]">
              Tambah menu baru, ubah harga/status ketersediaan, atau hapus menu.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#E9DDCD] text-[#4A3728] font-semibold hover:bg-[#D8C5B2]"
          >
            Tutup
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Tambah / Edit Menu */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-2xl border border-[#E9DDCD] space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {editingId ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs font-semibold text-[#765640] underline"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nama Menu</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: Kopi Susu Gula Aren"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E9DDCD] bg-white focus:outline-none focus:border-[#765640]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="18000"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">URL Gambar (Opsional)</label>
              <input
                type="text"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                placeholder="/gambar 1.jpeg atau https://..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Deskripsi (Opsional)</label>
              <textarea
                rows="2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Deskripsi singkat rasa menu..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640]"
              />
            </div>

            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                className="rounded border-[#765640]"
              />
              <span>Status Tersedia (centang jika ready, lepas jika habis)</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#765640] text-white font-semibold hover:bg-[#5F5146] disabled:opacity-60 transition"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : editingId
                  ? 'Simpan Perubahan'
                  : 'Tambah Menu'}
            </button>
          </form>

          {/* Daftar Menu */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9DDCD]">
            <h3 className="font-bold text-lg mb-4">Daftar Menu ({menus.length})</h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {menus.length === 0 ? (
                <p className="text-sm text-[#5F5146]">Belum ada data menu.</p>
              ) : (
                menus.map((item) => {
                  const isAvailable = item.is_available !== false;
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-[#E9DDCD] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm truncate">{item.name}</p>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {isAvailable ? 'Tersedia' : 'Habis'}
                          </span>
                        </div>
                        <p className="text-xs text-[#5F5146]">
                          {item.category} • Rp {Number(item.price || 0).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSelectEdit(item)}
                          disabled={isSubmitting}
                          className="px-2.5 py-1 rounded-lg bg-[#F8F1E7] text-[#4A3728] border border-[#E9DDCD] text-xs font-semibold hover:bg-[#E9DDCD]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={isSubmitting}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}