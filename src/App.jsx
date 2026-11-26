import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

// Assets
import logoImage from './assets/LogoKopiRuangKita.jpeg';
import igIcon from './assets/ig.jpg';
import ttIcon from './assets/tt.png';
import fbIcon from './assets/fb.png';

// Data & Components
import { menuData } from './data/menuData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import CartSection from './components/CartSection';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';

// Modals
import LoginModal from './components/LoginModal';
import PromoModal from './components/PromoModal';
import OrderModal from './components/OrderModal';
import ReceiptModal from './components/ReceiptModal';
import DashboardModal from './components/DashboardModal';
import ManageMenuModal from './components/ManageMenuModal';

// Backend API Service
import { api } from './services/api';

const normalizeMenuItem = (item) => ({
  ...item,
  price: Number(item.price) || 0,
  description: item.description || '',
  is_available: item.is_available !== undefined ? Boolean(item.is_available) : true,
});

function App() {
  // State menu dinamis dari database (fallback ke menuData jika API gagal)
  const [menus, setMenus] = useState(() => menuData.map(normalizeMenuItem));
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  // State keranjang & filter
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // State modal & nav
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State auth & sesi staf
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [staffUser, setStaffUser] = useState(() => {
    const saved = localStorage.getItem('krk_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Mengambil data menu dari backend / database Neon
  const fetchMenus = useCallback(async () => {
    setIsMenuLoading(true);
    try {
      const data = await api.getMenus();
      if (Array.isArray(data)) {
        setMenus(data.map(normalizeMenuItem));
      }
    } catch (err) {
      console.warn('[MENU NOTICE] Gagal memuat menu dari backend, pakai data awal:', err.message);
      setMenus(menuData.map(normalizeMenuItem));
    } finally {
      setIsMenuLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  // State order & receipt
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [paymentProof, setPaymentProof] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // State form kontak
  const [contactForm, setContactForm] = useState({ nama: '', noHp: '', pesan: '' });
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');

  // Update qty keranjang (cegah tambah jika menu sedang habis)
  const updateCart = (itemId, change) => {
    const targetMenu = menus.find((m) => m.id === itemId);
    if (change > 0 && targetMenu && targetMenu.is_available === false) {
      showToast(`${targetMenu.name} sedang habis.`);
      return;
    }

    setCart((prev) => {
      const newCount = (prev[itemId] || 0) + change;
      return { ...prev, [itemId]: newCount < 0 ? 0 : newCount };
    });
  };

  // Filter menu dari state dinamis `menus`
  const filteredMenu = menus.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!username || !password) {
      setLoginError('Username dan Password wajib diisi!');
      return;
    }

    setIsLoginLoading(true);
    try {
      const res = await api.login(username, password);
      if (res.token) {
        localStorage.setItem('krk_token', res.token);
      }
      const userData = res.user || { username, full_name: username, role: 'staff' };
      localStorage.setItem('krk_user', JSON.stringify(userData));
      setStaffUser(userData);

      setUsername('');
      setPassword('');
      setIsLoginOpen(false);
      setIsDashboardOpen(true);
    } catch (err) {
      console.warn('Login API Notice:', err.message);
      setLoginError(err.message || 'Username atau password salah.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('krk_token');
    localStorage.removeItem('krk_user');
    setStaffUser(null);
    setIsDashboardOpen(false);
    setIsManageMenuOpen(false);
  };

  const openPromoModal = (promo) => {
    setSelectedPromo(promo);
    setShowModal(true);
  };

  // Hitung keranjang & total dari state dinamis `menus`
  const cartItems = menus
    .filter((item) => cart[item.id] > 0)
    .map((item) => ({
      ...item,
      quantity: cart[item.id],
      subtotal: item.price * cart[item.id],
    }));

  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const taxPrice = subtotalPrice * 0.1;
  const grandTotalPrice = subtotalPrice + taxPrice;

  // Process order
  const handleProcessOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Pilih minimal satu menu untuk dipesan!');
      return;
    }
    if (!customerName.trim() || !tableNumber.trim()) {
      alert('Nama dan Nomor Meja wajib diisi!');
      return;
    }
    if (!phoneNumber.trim()) {
      alert('Nomor WhatsApp wajib diisi!');
      return;
    }
    if (paymentMethod === 'transfer' && !paymentProof) {
      alert('Silakan upload bukti pembayaran terlebih dahulu!');
      return;
    }

    const generatedCode = 'KRK-' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderId: generatedCode,
      tanggal: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      nama: customerName,
      noMeja: tableNumber,
      noHp: phoneNumber,
      metode: paymentMethod.toUpperCase(),
      paymentProof: paymentProof,
      items: [...cartItems],
      subtotal: subtotalPrice,
      pajak: taxPrice,
      total: grandTotalPrice,
    };

    try {
      const response = await api.createOrder({
        orderId: generatedCode,
        customerName,
        tableNumber,
        phoneNumber,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentProof,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        subtotal: subtotalPrice,
        tax: taxPrice,
        total: grandTotalPrice,
      });

      if (response?.order?.order_code) {
        orderData.orderId = response.order.order_code;
      }
    } catch (apiError) {
      console.warn('[BACKEND NOTICE] Gagal menyimpan ke server backend, menggunakan struk lokal:', apiError.message);
    }

    setReceiptData(orderData);
    setIsOrderModalOpen(false);
    setCart({});
    setCustomerName('');
    setTableNumber('');
    setPhoneNumber('');
    setPaymentProof(null);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
    setContactError('');
    setContactSuccess('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.nama.trim() || !contactForm.noHp.trim() || !contactForm.pesan.trim()) {
      setContactError('Semua kolom wajib diisi!');
      setContactSuccess('');
      return;
    }

    try {
      await api.sendContactMessage(contactForm);
      setContactSuccess(`Terima kasih ${contactForm.nama}, pesan Anda telah berhasil dikirim ke sistem!`);
      setContactError('');
      setContactForm({ nama: '', noHp: '', pesan: '' });
    } catch (err) {
      console.warn('[CONTACT NOTICE] Server backend notice:', err.message);
      setContactSuccess(`Terima kasih ${contactForm.nama}, pesan Anda telah diterima!`);
      setContactError('');
      setContactForm({ nama: '', noHp: '', pesan: '' });
    }
  };

  return (
    <div className="bg-white text-gray-700 min-h-screen flex flex-col">
      <Navbar
        setIsLoginOpen={setIsLoginOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        staffUser={staffUser}
        setIsDashboardOpen={setIsDashboardOpen}
        handleLogout={handleLogout}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        menuData={menus}
        cart={cart}
        updateCart={updateCart}
        customerName={customerName}
        setCustomerName={setCustomerName}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        paymentProof={paymentProof}
        setPaymentProof={setPaymentProof}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleProcessOrder={handleProcessOrder}
        cartItems={cartItems}
        subtotalPrice={subtotalPrice}
        taxPrice={taxPrice}
        grandTotalPrice={grandTotalPrice}
      />

      <ReceiptModal
        receiptData={receiptData}
        onClose={() => setReceiptData(null)}
      />

      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={(val) => {
          setIsLoginOpen(val);
          setLoginError('');
        }}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLoginSubmit={handleLoginSubmit}
        loginError={loginError}
        isLoading={isLoginLoading}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={staffUser}
        onLogout={handleLogout}
        onOpenOrderQueue={() => showToast('Membuka modul Antrean Pesanan & Kasir...')}
        onOpenManageMenu={() => {
          setIsDashboardOpen(false);
          setIsManageMenuOpen(true);
        }}
        onOpenReport={() => showToast('Membuka modul Laporan Omset Penjualan...')}
      />

      <ManageMenuModal
        isOpen={isManageMenuOpen}
        onClose={() => setIsManageMenuOpen(false)}
        menus={menus}
        onMenusUpdated={fetchMenus}
        showToast={showToast}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A3728] text-[#FDFBF7] px-5 py-3 rounded-2xl shadow-xl border border-[#765640] text-sm font-medium flex items-center gap-2.5">
          <span>☕</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-grow">
        <PromoModal
          showModal={showModal}
          selectedPromo={selectedPromo}
          setShowModal={setShowModal}
        />

        <Hero
          logoImage={logoImage}
          setIsOrderModalOpen={setIsOrderModalOpen}
        />

        <AboutSection />

        <MenuSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredMenu={filteredMenu}
          isLoading={isMenuLoading}
          updateCart={updateCart}
          cart={cart}
        />

        <CartSection
          cartItems={cartItems}
          subtotalPrice={subtotalPrice}
          taxPrice={taxPrice}
          grandTotalPrice={grandTotalPrice}
          setIsOrderModalOpen={setIsOrderModalOpen}
        />

        <PromoSection
          openPromoModal={openPromoModal}
        />
      </main>

      <Footer
        igIcon={igIcon}
        ttIcon={ttIcon}
        fbIcon={fbIcon}
        contactError={contactError}
        contactSuccess={contactSuccess}
        contactForm={contactForm}
        handleContactChange={handleContactChange}
        handleContactSubmit={handleContactSubmit}
      />
    </div>
  );
}

export default App;