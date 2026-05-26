export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <section className="bg-[#1A1A1A] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A961] uppercase tracking-[4px] mb-4">
            Kontak Kami
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Hubungi Prime Property
          </h1>

          <p className="text-gray-300 max-w-2xl text-lg">
            Kirim pesan kepada tim kami untuk informasi properti, konsultasi,
            atau kerja sama.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>

            <div className="space-y-4 text-gray-600">
              <p>Alamat: Medan, Indonesia</p>
              <p>Telepon/WA: 0812-0000-0000</p>
              <p>Email: admin@primeproperty.id</p>
              <p>WhatsApp: https://wa.me/6281200000000</p>
            </div>
          </div>

          <form className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Form Kontak</h2>

            <div className="space-y-4">
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Nama"
              />

              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Email"
              />

              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Nomor HP"
              />

              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32"
                placeholder="Pesan"
              />

              <button
                type="button"
                className="bg-[#C9A961] text-black px-6 py-3 rounded-lg font-semibold"
              >
                Kirim Pesan
              </button>
            </div>
          </form>

        </div>
      </section>
    </main>
  );
}