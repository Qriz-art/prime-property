import Image from "next/image";
import PublicNavbar from "@/components/PublicNavbar";

export default function AboutPage() {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <PublicNavbar />
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Image
            src="/prime-logo.png"
            alt="Prime Property"
            width={220}
            height={80}
            className="mx-auto bg-white rounded-xl p-4"
          />

          <h1 className="text-5xl font-bold mt-8">
            Tentang Prime Property
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-lg">
            Prime Property adalah platform manajemen dan pemasaran properti
            yang berfokus pada hunian premium, villa, dan investasi properti
            dengan pengelolaan data yang profesional dan transparan.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Profil Perusahaan
            </h2>

            <p className="text-gray-700 leading-8">
              Prime Property hadir untuk membantu pelanggan menemukan
              properti terbaik melalui sistem informasi yang akurat,
              pengelolaan listing yang terstruktur, serta pelayanan yang
              mengutamakan kepercayaan dan profesionalisme.
            </p>

            <p className="text-gray-700 leading-8 mt-6">
              Dengan dukungan teknologi modern dan tim yang berpengalaman,
              Prime Property berkomitmen menghadirkan pengalaman pencarian
              dan pengelolaan properti yang lebih mudah, cepat, dan aman.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border">
            <blockquote className="text-2xl font-bold text-[#C9A961]">
              "Membantu setiap keluarga menemukan properti impiannya."
            </blockquote>

            <p className="text-gray-600 mt-6">
              Prime Property berkomitmen memberikan informasi yang jelas,
              transparan, dan dapat dipercaya untuk setiap listing properti.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-[#C9A961] mb-6">
                Visi
              </h3>

              <p className="text-gray-700 leading-8">
                Menjadi perusahaan properti terpercaya yang memberikan
                solusi terbaik bagi masyarakat dalam mencari, mengelola,
                dan berinvestasi pada properti.
              </p>
            </div>

            <div className="border rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-[#C9A961] mb-6">
                Misi
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li>✓ Menyediakan informasi properti yang akurat.</li>
                <li>✓ Memberikan pelayanan profesional.</li>
                <li>✓ Mendukung investasi properti yang aman.</li>
                <li>✓ Mengembangkan sistem yang modern dan efisien.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nilai Perusahaan
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Integritas",
            "Profesionalisme",
            "Inovasi",
            "Kepercayaan",
          ].map((item) => (
            <div
              key={item}
              className="bg-white border rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-[#C9A961] rounded-xl mx-auto mb-4"></div>

              <h3 className="font-bold text-xl">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}