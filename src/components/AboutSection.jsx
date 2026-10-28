import React from 'react';

export default function AboutSection() {
  return (
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
  );
}