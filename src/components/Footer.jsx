
export default function Footer({ igIcon, ttIcon, fbIcon }) {
  return (
    <footer className="bg-[#765640] text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* TENTANG COFFEE SHOP */}
          <div className="text-center">
            <h3 className="text-xl font-bold font-serif-custom mb-2">
              Kopi Ruang Kita
            </h3>

            <p className="text-sm text-white/85 leading-relaxed max-w-md mx-auto">
              Menyajikan secangkir kopi dengan seribu cerita.
              Tempat terbaik untuk menemukan inspirasi dan ketenangan.
            </p>
          </div>

          {/* MEDIA SOSIAL */}
          <div className="text-center">
            <h3 className="text-base font-bold mb-3">
              Media Sosial
            </h3>

            <div className="flex justify-center items-center gap-3">
              <a href="#" aria-label="Instagram">
                <img
                  src={igIcon}
                  alt="Instagram"
                  className="w-9 h-9 object-contain"
                />
              </a>

              <a href="#" aria-label="TikTok">
                <img
                  src={ttIcon}
                  alt="TikTok"
                  className="w-9 h-9 object-contain"
                />
              </a>

              <a href="#" aria-label="Facebook">
                <img
                  src={fbIcon}
                  alt="Facebook"
                  className="w-9 h-9 object-contain"
                />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center mt-6 pt-4 border-t border-white/20 text-xs text-white/80">
          &copy; 2026 Kopi Ruang Kita. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
