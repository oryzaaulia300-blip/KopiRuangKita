import React from 'react';

export default function MenuSection({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  filteredMenu
}) {
  return (
    <section id="menu" className="py-20 bg-[#F8F1E7]">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-12">
          <span className="text-[#765640] font-semibold tracking-widest uppercase text-sm">Katalog</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif-custom text-[#4A3728] mt-3 mb-4">Menu Kopi Ruang Kita</h2>
          <p className="text-[#5F5146] max-w-xl mx-auto">Temukan minuman dan camilan favoritmu untuk menemani setiap cerita. Untuk memesan, silakan klik tombol Pesan Sekarang.</p>
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

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['All', 'Coffee', 'Non-Coffee', 'Snack'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeCategory === category
                  ? 'bg-[#765640] text-white'
                  : 'bg-white text-[#765640] border border-[#E9DDCD] hover:bg-[#E9DDCD]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-14">
          {['Coffee', 'Non-Coffee', 'Snack'].map(category => {
            const categoryItems = filteredMenu.filter(
              item => item.category === category
            );

            if (categoryItems.length === 0) return null;

            return (
              <section key={category}>
                <div className="flex items-center gap-4 mb-5">
                  <h3 className="text-2xl font-bold font-serif-custom text-[#4A3728]">
                    {category}
                  </h3>
                  <div className="h-px flex-grow bg-[#D8C5B2]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-[#E9DDCD] flex flex-col h-full"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                        loading="lazy"
                      />

                      <div className="flex-grow flex flex-col">
                        <h3 className="font-bold text-[#4A3728] text-lg mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#5F5146] leading-relaxed mb-4 flex-grow">
                          {item.description}
                        </p>
                        <div className="mt-auto border-t border-[#E9DDCD] pt-3">
                          <p className="font-bold text-[#765640] text-base">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}