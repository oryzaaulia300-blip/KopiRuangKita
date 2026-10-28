import React from 'react';

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  username,
  setUsername,
  password,
  setPassword,
  handleLoginSubmit
}) {
  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-[#E9DDCD] relative">
        <button 
          onClick={() => setIsLoginOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#4A3728] text-xl font-bold"
        >
          ✕
        </button>
        
        <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728] mb-2 text-center">Login Karyawan / Owner</h3>
        <p className="text-sm text-[#5F5146] text-center mb-6">Silakan masukkan akun manajemen Anda.</p>
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A3728] mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640] text-[#4A3728]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A3728] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E9DDCD] focus:outline-none focus:border-[#765640] text-[#4A3728]"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#765640] hover:bg-[#60432F] text-white font-semibold py-3 rounded-xl transition shadow-sm mt-2"
          >
            Masuk Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}