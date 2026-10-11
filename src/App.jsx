import React, { useState } from 'react';
import './index.css';
import logoImage from './assets/LogoKopiRuangKita.jpeg';

function App() {
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // State khusus untuk Modal Login
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State untuk Menu Hamburger (Mobile)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuData = [
    { id: 1, name: 'Kopi Susu Gula Aren', category: 'Coffee', price: 18000, img: 'https://i.pinimg.com/736x/f0/49/5b/f0495b2d4ee979ac4068f4c61a57397b.jpg', description: 'Perpaduan espresso, susu creamy, dan manis legit gula aren.' },
    { id: 2, name: 'Americano', category: 'Coffee', price: 15000, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', description: 'Kopi hitam dengan rasa bold dan aroma espresso yang khas.' },
    { id: 3, name: 'Cafe Latte', category: 'Coffee', price: 22000, img: 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', description: 'Espresso lembut berpadu dengan susu steamed yang creamy.' },
    { id: 4, name: 'Caramel Macchiato', category: 'Coffee', price: 25000, img: 'https://i.pinimg.com/736x/c3/0e/0e/c30e0ecc2b17ff4fa571f5963c70519b.jpg', description: 'Minuman kopi susu dengan sentuhan manis saus karamel.' },
    { id: 5, name: 'Matcha Latte', category: 'Non-Coffee', price: 22000, img: 'https://plus.unsplash.com/premium_photo-1695151556198-6b21eae6215d?q=80&w=783&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', description: 'Matcha dengan rasa khas yang berpadu dengan susu lembut.' },
    { id: 6, name: 'Taro Latte', category: 'Non-Coffee', price: 20000, img: 'https://i.pinimg.com/736x/ac/a2/0d/aca20d8451b60b70937f98d1c27e4e5f.jpg', description: 'Minuman taro creamy dengan rasa manis yang menenangkan.' },
    { id: 7, name: 'Red Velvet Latte', category: 'Non-Coffee', price: 22000, img: 'https://i.pinimg.com/736x/1c/b0/45/1cb0450d33404c6383a1d44003d42e77.jpg', description: 'Latte red velvet lembut dengan cita rasa manis yang unik.' },
    { id: 8, name: 'Lychee Tea', category: 'Non-Coffee', price: 18000, img: 'https://i.pinimg.com/736x/2c/58/8b/2c588b17c03c59becba4cc8baf7d0ba9.jpg', description: 'Teh segar dengan aroma dan rasa manis buah leci.' },
    { id: 9, name: 'French Fries', category: 'Snack', price: 15000, img: 'https://plus.unsplash.com/premium_photo-1683121324474-83460636b0ed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', description: 'Kentang goreng renyah yang cocok menemani waktu santai.' },
    { id: 10, name: 'Roti Bakar Coklat', category: 'Snack', price: 16000, img: 'https://i.pinimg.com/1200x/35/57/e2/3557e272e25b7180fd1e20ba4da79c8e.jpg', description: 'Roti bakar hangat dengan isian cokelat manis yang lumer.' },
    { id: 11, name: 'Pisang Goreng Keju', category: 'Snack', price: 15000, img: 'https://i.pinimg.com/1200x/2b/59/b6/2b59b672b0e83a51ea27e78e6cf2649b.jpg', description: 'Pisang goreng renyah dengan taburan keju gurih.' },
    { id: 12, name: 'Dimsum Ayam', category: 'Snack', price: 18000, img: 'https://images.unsplash.com/photo-1604632910793-c0601f361b34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', description: 'Dimsum ayam lembut dengan isian gurih di setiap gigitan.' }
  ];

  const updateCart = (itemId, change) => {
    setCart(prev => {
      const newCount = (prev[itemId] || 0) + change;
      return { ...prev, [itemId]: newCount < 0 ? 0 : newCount };
    });
  };

  const filteredMenu = menuData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Username dan Password wajib diisi!');
      return;
    }
    alert(`Login berhasil! Selamat datang, ${username}.`);
    setUsername('');
    setPassword('');
    setIsLoginOpen(false);
  };

  return (
    <div className="bg-white text-gray-700 relative pb-24">
    
      {/* NAVBAR UTAMA */}
      <header className="bg-white text-[#4A3728] sticky top-0 z-50 shadow-sm border-b border-[#E9DDCD]">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-serif-custom tracking-wide text-[#4A3728]">
              Kopi Ruang Kita
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-[#5F5146]">
            <a href="#home" className="hover:text-[#765640] transition">Home</a>
            <a href="#tentang" className="hover:text-[#765640] transition">Tentang Kami</a>
            <a href="#menu" className="hover:text-[#765640] transition">Menu</a>
            <a href="#promo" className="hover:text-[#765640] transition">Promo</a>
            <a href="#kontak" className="hover:text-[#765640] transition">Kontak</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-[#765640] hover:text-[#4A3728] font-medium text-sm transition flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E9DDCD] hover:bg-[#F8F1E7] bg-white shadow-xs"
            >
              🔒 <span>Login Staf</span>
            </button>
            <a href="#menu" className="bg-[#765640] hover:bg-[#60432F] text-white font-semibold px-5 py-2.5 rounded-full transition text-sm shadow-sm">
              Pesan Sekarang
            </a>
          </div>

          {/* Tombol Hamburger (Mobile) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-[#765640] focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Dropdown Menu untuk Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F8F1E7] border-b border-[#E9DDCD] px-6 py-4 space-y-4 shadow-md">
            <div className="flex flex-col space-y-3 font-medium text-[#5F5146]">
              <a 
                href="#home" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#765640] transition"
              >
                Home
              </a>
              <a 
                href="#tentang" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#765640] transition"
              >
                Tentang Kami
              </a>
              <a 
                href="#menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#765640] transition"
              >
                Menu
              </a>
              <a 
                href="#promo" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#765640] transition"
              >
                Promo
              </a>
              <a 
                href="#kontak" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#765640] transition"
              >
                Kontak
              </a>
            </div>
            
            <div className="pt-2 border-t border-[#E9DDCD] flex flex-col gap-3">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                className="w-full text-center text-[#765640] font-medium text-sm py-2 rounded-lg border border-[#E9DDCD] bg-white"
              >
                🔒 Login Staf
              </button>
              <a 
                href="#menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#765640] text-white font-semibold py-2.5 rounded-full text-sm shadow-sm"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MODAL POP-UP LOGIN */}
      
      {isLoginOpen && (
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
      )}

      <main>
        {/* HOME / HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center bg-[#F8F1E7]">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex justify-center">
                  <img 
                    src={logoImage} 
                    alt="Logo Kopi Ruang Kita" 
                    className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md" 
                  />
                </div>

                <span className="inline-block bg-[#E9DDCD] text-[#5F5146] text-xs font-bold tracking-widest px-4 py-2 rounded-full uppercase mb-5">
                  Selamat Datang di Kopi Ruang Kita
                </span>
                
                <h1 className="text-4xl md:text-6xl font-bold font-serif-custom text-[#4A3728] leading-tight mb-6">
                  Secangkir Kopi,
                  <span className="text-[#765640]"> Seribu Cerita.</span>
                </h1>
                
                <p className="text-[#5F5146] text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                  Nikmati kopi pilihan dengan suasana nyaman untuk berkumpul, bekerja, dan berbagi cerita bersama orang-orang tersayang.
                </p>
                
                <a href="#menu" className="inline-block bg-[#765640] hover:bg-[#60432F] text-white font-semibold px-8 py-3.5 rounded-full shadow-sm transition">
                  Lihat Menu
                </a>
              </div>

              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
                  alt="Secangkir kopi"
                  className="w-full max-w-lg h-[450px] object-cover rounded-3xl shadow-lg"
                />
              </div>

            </div>
          </div>
        </section>

        {/* TENTANG KAMI */}
        <section id="tentang" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80"
                  alt="Suasana Kopi Ruang Kita"
                  className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div>
                <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">
                  Tentang Kami
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-3 mb-5">
                  Tempat untuk Kopi dan Cerita
                </h2>
                <p className="text-[#5F5146] leading-relaxed mb-4">
                  Kopi Ruang Kita adalah tempat yang nyaman untuk menikmati kopi berkualitas sambil berbagi cerita bersama teman, keluarga, maupun orang-orang terdekat.
                </p>
                <p className="text-[#5F5146] leading-relaxed">
                  Kami percaya bahwa secangkir kopi bukan hanya tentang rasa, tetapi juga tentang menciptakan suasana dan kenangan yang menyenangkan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="py-20 bg-[#F8F1E7]">
          <div className="container mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">Pilihan Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-3 mb-4">Menu Kopi Ruang Kita</h2>
              <p className="text-[#5F5146] max-w-xl mx-auto">Temukan minuman dan camilan favoritmu untuk menemani setiap cerita.</p>
            </div>
            
            <div className="max-w-md mx-auto mb-12">
              <input 
                type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu favoritmu..." 
                className="w-full px-5 py-3 rounded-full bg-white border border-[#E9DDCD] text-[#4A3728] focus:outline-none focus:border-[#765640]" 
              />
            </div>

            <div className="space-y-14">
              {['Coffee', 'Non-Coffee', 'Snack'].map(category => {
                const categoryItems = filteredMenu.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <section key={category}>
                    <div className="flex items-center gap-4 mb-5">
                      <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728]">{category}</h3>
                      <div className="h-px flex-grow bg-[#D8C5B2]"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categoryItems.map(item => {
                        const count = cart[item.id] || 0;
                        return (
                          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-[#E9DDCD] flex flex-col h-full">
                            <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-xl mb-4" loading="lazy" />
                            <div className="flex-grow">
                              <h3 className="font-bold text-[#4A3728] text-lg mb-2">{item.name}</h3>
                              <p className="text-sm text-[#5F5146] leading-relaxed mb-3">{item.description}</p>
                              <p className="font-bold text-[#765640] text-base">Rp {item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-[#E9DDCD] pt-3">
                              <button onClick={() => updateCart(item.id, -1)} className="w-8 h-8 rounded-full bg-[#F8F1E7] text-[#765640] font-bold hover:bg-[#E9DDCD]">−</button>
                              <span className="font-bold text-[#4A3728] text-sm">{count}</span>
                              <button onClick={() => updateCart(item.id, 1)} className="w-8 h-8 rounded-full bg-[#765640] text-white font-bold hover:bg-[#60432F]">+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROMO SPESIAL */}
        <section id="promo" className="py-20 bg-white">
          <div className="container mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">Penawaran Menarik</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-3 mb-4">PROMO SPESIAL!</h2>
              <p className="text-[#5F5146] max-w-xl mx-auto">Ada lebih banyak alasan untuk mampir dan menikmati waktu di Kopi Ruang Kita.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <article className="bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase">Promo Bundling</span>
                  <span className="text-xl">☕</span>
                </div>
                <img src="https://i.pinimg.com/1200x/9b/a9/12/9ba912a184bba875c88ec7d33391ebf4.jpg" alt="Paket Nyore" className="w-full aspect-square object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">PAKET NYORE</span>
                  <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Teman Santai Sore</h3>
                  <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Nikmati Kopi Susu Gula Aren dan Roti Bakar Coklat dalam satu paket hemat.</p>
                  <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                    <p className="text-sm text-[#5F5146]">Harga normal <span className="line-through">Rp34.000</span></p>
                    <p className="text-2xl font-bold text-[#765640]">Rp29.000</p>
                  </div>
                </div>
              </article>

              <article className="bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase">Buy 1 Get 1</span>
                  <span className="text-xl">🎉</span>
                </div>
                <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80" alt="Promo BOGO" className="w-full aspect-square object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">HAPPY HOUR</span>
                  <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Beli 1, Gratis 1</h3>
                  <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Pesan satu minuman pilihan dan dapatkan satu minuman gratis selama Happy Hour.</p>
                  <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                    <p className="text-2xl font-bold text-[#765640]">13.00–15.00</p>
                  </div>
                </div>
              </article>

              <article className="bg-[#F8F1E7] rounded-2xl overflow-hidden border border-[#E9DDCD] shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-[#765640] text-white px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest uppercase">Promo Mingguan</span>
                  <span className="text-xl">✨</span>
                </div>
                <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80" alt="Promo Senin" className="w-full aspect-square object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block self-start bg-white text-[#765640] text-xs font-bold px-3 py-1 rounded-full mb-3">MONDAY DEAL</span>
                  <h3 className="text-xl font-bold font-serif-custom text-[#4A3728] mb-3">Senin Lebih Hemat</h3>
                  <p className="text-sm text-[#5F5146] leading-relaxed mb-4">Awali minggu dengan menikmati menu favoritmu dan dapatkan diskon 10%.</p>
                  <div className="mt-auto border-t border-[#E9DDCD] pt-4">
                    <p className="text-3xl font-bold text-[#765640]">DISKON 10%</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="kontak" className="bg-[#F8F1E7] text-[#5F5146] py-12 border-t border-[#E9DDCD]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-serif-custom mb-4 text-[#4A3728]">
              Kopi Ruang Kita
            </h3>
            <p className="text-sm text-[#5F5146] leading-relaxed">
              Menyajikan secangkir kopi dengan seribu cerita. Tempat terbaik untuk menemukan inspirasi dan ketenangan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#4A3728]">
              Informasi & Lokasi
            </h3>
            <ul className="space-y-2 text-sm text-[#5F5146]">
              <li>📍 Jl. Dr. Mansyur No. 12, Medan</li>
              <li>🕒 Buka Setiap Hari: 08.00 - 22.00 WIB</li>
              <li>📞 0812-3456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#4A3728]">
              Media Sosial
            </h3>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white text-[#765640] border border-[#E9DDCD] flex items-center justify-center hover:bg-[#E9DDCD] transition font-bold">IG</a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white text-[#765640] border border-[#E9DDCD] flex items-center justify-center hover:bg-[#E9DDCD] transition font-bold">TT</a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white text-[#765640] border border-[#E9DDCD] flex items-center justify-center hover:bg-[#E9DDCD] transition font-bold">FB</a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 text-center mt-12 pt-6 border-t border-[#E9DDCD] text-[#5F5146] text-xs">
          &copy; 2026 Kopi Ruang Kita. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;