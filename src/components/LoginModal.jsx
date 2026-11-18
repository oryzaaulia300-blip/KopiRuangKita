import React, { useState } from 'react'; 

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  username,
  setUsername,
  password,
  setPassword,
  handleLoginSubmit,
  loginError = '',      
  isLoading = false    
}) {
  const [showPassword, setShowPassword] = useState(false); 

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#FDFBF7] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#E9DDCD] relative">
        
        <button
          type="button"
          onClick={() => setIsLoginOpen(false)}
          aria-label="Tutup modal"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[#8C7A6B] hover:bg-[#EFE7DC] hover:text-[#4A3728] transition font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F3ECE2] text-[#765640] mb-3 border border-[#E9DDCD]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728]">
            Login Tim Kopi Ruang Kita
          </h3>
          <p className="text-sm text-[#6E5D4F] mt-1">
            Masuk untuk mengelola operasional Kopi Ruang Kita
          </p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5146] mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-[#9A8878]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: kasir01"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#E9DDCD] focus:outline-none focus:ring-2 focus:ring-[#765640]/20 focus:border-[#765640] text-[#4A3728] text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5F5146] mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-[#9A8878]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </span>
 
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-16 py-2.5 bg-white rounded-xl border border-[#E9DDCD] focus:outline-none focus:ring-2 focus:ring-[#765640]/20 focus:border-[#765640] text-[#4A3728] text-sm transition"
              />
             
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-[#8C7A6B] hover:text-[#4A3728]"
              >
                {showPassword ? 'Sembunyi' : 'Lihat'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#765640] hover:bg-[#5E4331] active:scale-[0.99] text-white font-semibold py-3 rounded-xl transition shadow-md shadow-[#765640]/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              'Masuk ke Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}