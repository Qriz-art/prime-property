export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <section className="bg-[#1A1A1A] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A961] uppercase tracking-[4px] mb-4">
            Tentang Kami
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Prime Property
          </h1>

          <p className="text-gray-300 max-w-2xl text-lg">
            Prime Property adalah platform properti modern yang membantu
            pelanggan menemukan hunian, ruko, villa, dan aset investasi terbaik.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Visi</h2>
            <p className="text-gray-600">
              Menjadi platform properti terpercaya yang menghadirkan informasi
              jelas, akurat, dan mudah dipahami.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Misi</h2>
            <p className="text-gray-600">
              Memberikan pengalaman pencarian properti yang profesional,
              transparan, dan efisien untuk setiap pelanggan.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}