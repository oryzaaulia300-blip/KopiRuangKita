import React, { useState } from 'react';
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
import AboutSection from './components/Aboutsection';
import MenuSection from './components/MenuSection';
import CartSection from './components/CartSection';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';

// Modals
import LoginModal from './components/LoginModal';
import PromoModal from './components/PromoModal';
import OrderModal from './components/OrderModal';
import ReceiptModal from './components/ReceiptModal';

function App() {
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

  // State order & receipt
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [receiptData, setReceiptData] = useState(null);

  // State form kontak
  const [contactForm, setContactForm] = useState({ nama: '', noHp: '', pesan: '' });
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');

  // Update qty keranjang
  const updateCart = (itemId, change) => {
    setCart(prev => {
      const newCount = (prev[itemId] || 0) + change;
      return { ...prev, [itemId]: newCount < 0 ? 0 : newCount };
    });
  };

  // Filter menu
  const filteredMenu = menuData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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

  const openPromoModal = (promo) => {
    setSelectedPromo(promo);
    setShowModal(true);
  };

  // Hitung keranjang & total
  const cartItems = menuData
    .filter(item => cart[item.id] > 0)
    .map(item => ({
      ...item,
      quantity: cart[item.id],
      subtotal: item.price * cart[item.id]
    }));

  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const taxPrice = subtotalPrice * 0.1;
  const grandTotalPrice = subtotalPrice + taxPrice;

  // Process order
  const handleProcessOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Pilih minimal satu menu untuk dipesan!');
      return;
    }
    if (!customerName.trim() || !tableNumber.trim()) {
      alert('Nama dan Nomor Meja wajib diisi!');
      return;
    }

    const orderData = {
      orderId: 'KRK-' + Math.floor(100000 + Math.random() * 900000),
      tanggal: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      nama: customerName,
      noMeja: tableNumber,
      metode: paymentMethod.toUpperCase(),
      items: [...cartItems],
      subtotal: subtotalPrice,
      pajak: taxPrice,
      total: grandTotalPrice
    };

    setReceiptData(orderData);
    setIsOrderModalOpen(false);
    setCart({});
    setCustomerName('');
    setTableNumber('');
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    setContactError('');
    setContactSuccess('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.nama.trim() || !contactForm.noHp.trim() || !contactForm.pesan.trim()) {
      setContactError('Semua kolom wajib diisi!');
      setContactSuccess('');
      return;
    }

    setContactSuccess(`Terima kasih ${contactForm.nama}, pesan Anda telah berhasil dikirim!`);
    setContactError('');
    setContactForm({ nama: '', noHp: '', pesan: '' });
  };

  return (
    <div className="bg-white text-gray-700 min-h-screen flex flex-col">
      <Navbar
        setIsLoginOpen={setIsLoginOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        menuData={menuData}
        cart={cart}
        updateCart={updateCart}
        customerName={customerName}
        setCustomerName={setCustomerName}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
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
        setIsLoginOpen={setIsLoginOpen}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLoginSubmit={handleLoginSubmit}
      />

      {/* flex-grow memastikan elemen ini mengambil sisa ruang kosong agar footer terdorong ke bawah */}
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