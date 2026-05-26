export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#1A1A1A] text-white border-b border-[#C9A961]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A961]"></div>

            <div>
              <h1 className="font-bold text-lg tracking-wide">
                PRIME PROPERTY
              </h1>

              <p className="text-xs text-gray-400">
                Luxury Real Estate
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-[#C9A961] transition">
  Beranda
</a>

<a href="/about" className="hover:text-[#C9A961] transition">
  Tentang
</a>

<a href="/contact" className="hover:text-[#C9A961] transition">
  Kontak
</a>
          </nav>

          <a
  href="/agent/login"
  className="border border-[#C9A961] text-[#C9A961] px-5 py-2 rounded-lg hover:bg-[#C9A961] hover:text-black transition"
>
  Login Agent
</a>

        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#1A1A1A] text-white min-h-[90vh] flex items-center">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>

            <p className="text-[#C9A961] mb-4 tracking-[4px] uppercase">
              Prime Property
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Temukan
              <span className="text-[#C9A961]"> Properti </span>
              Impian Anda
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Platform properti modern untuk hunian premium,
              villa, ruko, dan investasi terbaik.
            </p>

            <div className="flex gap-4 flex-wrap">

              <button className="bg-[#C9A961] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition">
                Lihat Properti
              </button>

              <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition">
                Hubungi Kami
              </button>

            </div>
          </div>

          {/* BOX KANAN */}
          <div className="flex justify-center">

            <div className="w-full max-w-md h-[400px] rounded-3xl bg-gradient-to-br from-[#C9A961] to-[#1A1A1A] border border-[#C9A961]/30 shadow-2xl flex items-center justify-center">

              <h2 className="text-3xl font-bold text-center">
                PRIME <br /> PROPERTY
              </h2>

            </div>

          </div>

        </div>
            </section>

      {/* PROPERTI UNGGULAN */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-[#C9A961] font-semibold uppercase tracking-[3px] mb-3">
              Highlight
            </p>

            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              Properti Unggulan
            </h2>

            <p className="text-gray-600 mt-3">
              Pilihan properti terbaik dari Prime Property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Aston Villas",
              "Banyan Tree Blok A",
              "Mentari Residence",
              "Project Ville",
              "Ruko Cemara Asri",
              "Villa Krakatau",
            ].map((nama, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="h-40 rounded-xl bg-[#1A1A1A] mb-5 flex items-center justify-center text-[#C9A961] font-bold">
                  PRIME PROPERTY
                </div>

                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  {nama}
                </h3>

                <p className="text-gray-600 mb-4">
                  Properti premium dengan lokasi strategis dan nilai investasi tinggi.
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#B33A3A]">
                    Rp 1.350.000.000
                  </span>

                  <span className="text-sm bg-[#C9A961]/20 text-[#745b1b] px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
            </section>

      {/* MENGAPA PRIME PROPERTY */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#C9A961] font-semibold uppercase tracking-[3px] mb-3">
              Keunggulan
            </p>

            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
              Mengapa Prime Property?
            </h2>

            <p className="text-gray-600">
              Kami membantu Anda menemukan properti terbaik dengan data yang jelas,
              proses yang rapi, dan layanan profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["Lokasi Strategis", "Properti berada di area yang potensial dan mudah dijangkau."],
              ["Data Jelas", "Informasi ukuran, harga, status, dan kawasan disajikan ringkas."],
              ["Pilihan Premium", "Listing dikurasi untuk kebutuhan hunian maupun investasi."],
              ["Layanan Cepat", "Tim kami siap membantu proses pencarian properti Anda."],
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-200 hover:border-[#C9A961] transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] text-[#C9A961] flex items-center justify-center font-bold mb-5">
                  {index + 1}
                </div>

                <h3 className="font-bold text-xl mb-3 text-[#1A1A1A]">
                  {item[0]}
                </h3>

                <p className="text-gray-600">
                  {item[1]}
                </p>
              </div>
            ))}
          </div>

        </div>
            </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-[#C9A961]">
              PRIME PROPERTY
            </h2>
            <p className="text-gray-400 mt-3">
              Luxury real estate platform untuk hunian dan investasi properti.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Navigasi</h3>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-[#C9A961]">Beranda</a>
              <a href="#" className="hover:text-[#C9A961]">Tentang Kami</a>
              <a href="#" className="hover:text-[#C9A961]">Kontak</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Kontak</h3>
            <div className="text-gray-400 space-y-2">
              <p>WA: 0812-0000-0000</p>
              <p>Email: admin@primeproperty.id</p>
              <p>Alamat: Medan, Indonesia</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-white/10 text-gray-500 text-sm">
          © 2026 Prime Property. All rights reserved.
        </div>
      </footer>

    </main>
  );
}