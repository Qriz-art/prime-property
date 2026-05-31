import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PublicNavbar from "@/components/PublicNavbar";
import PublicPropertySection from "@/components/PublicPropertySection";


export default async function Home() {
  const { data } = await supabase
  .from("properties")
  .select("*")
  .is("deleted_at", null)
  .eq("status", "in_stock")
  .order("created_at", { ascending: false })
  .limit(6);
  
  const properties = data || [];

  return (
    <main className="bg-[#F5F5F5] text-[#1A1A1A]">
      <PublicNavbar />

      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#C9A961] font-bold tracking-widest mb-4">
              PRIME PROPERTY
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Temukan Hunian Mewah dan Investasi Properti Terbaik
            </h1>

            <p className="text-gray-300 text-lg mt-6 max-w-xl">
              Prime Property membantu Anda menemukan villa, ruko, dan hunian
              premium dengan lokasi strategis, data jelas, dan pengelolaan
              profesional.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#properti"
                className="bg-[#C9A961] text-black px-6 py-3 rounded-xl font-bold"
              >
                Lihat Properti
              </a>

              <Link
                href="/contact"
                className="border border-white/30 px-6 py-3 rounded-xl font-bold"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div className="bg-white/5 border border-[#C9A961]/30 rounded-3xl p-8">
            <Image
              src="/prime-logo.png"
              alt="Prime Property Logo"
              width={420}
              height={160}
              className="bg-white rounded-2xl p-6 mx-auto"
              priority
            />

            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-3xl font-bold text-[#C9A961]">
                  {properties.length}
                </p>
                <p className="text-sm text-gray-300">Properti Aktif</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-3xl font-bold text-[#C9A961]">2</p>
                <p className="text-sm text-gray-300">Tipe Listing</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-3xl font-bold text-[#C9A961]">24/7</p>
                <p className="text-sm text-gray-300">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicPropertySection properties={properties} />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Mengapa Prime Property?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
  {
    title: "Legalitas Aman",
    icon: "📜",
    desc: "Data properti dikelola rapi dan transparan.",
  },
  {
    title: "Lokasi Strategis",
    icon: "📍",
    desc: "Listing berada di kawasan potensial.",
  },
  {
    title: "Harga Kompetitif",
    icon: "💰",
    desc: "Informasi harga jelas dalam rupiah.",
  },
  {
    title: "Tim Profesional",
    icon: "👨‍💼",
    desc: "Didukung sistem internal agent portal.",
  },
].map((item) => (
  <div
    key={item.title}
    className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition"
  >
    <div className="w-14 h-14 rounded-xl bg-[#C9A961]/15 mb-5 flex items-center justify-center text-3xl">
      {item.icon}
    </div>

    <h3 className="font-bold text-xl">
      {item.title}
    </h3>

    <p className="text-gray-600 mt-3 leading-7">
      {item.desc}
    </p>
  </div>
))}
          </div>
        </div>
      </section>

      <footer className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <Image
              src="/prime-logo.png"
              alt="Prime Property"
              width={170}
              height={60}
              className="bg-white rounded-xl p-3"
            />
            <p className="text-gray-400 mt-4">
              Prime Property © 2026. All Rights Reserved.
            </p>
          </div>

          <div className="text-gray-300">
  <p>WhatsApp: 08123456789</p>
  <p>Email: admin@primeproperty.id</p>
  <p>Alamat: Indonesia</p>

  <div className="mt-4 flex flex-col gap-2">
    <Link
      href="/about"
      className="hover:text-[#C9A961] transition"
    >
      About Us
    </Link>

    <Link
      href="/contact"
      className="hover:text-[#C9A961] transition"
    >
      Contact Us
    </Link>
  </div>
</div>
        </div>
      </footer>
    </main>
  );
}