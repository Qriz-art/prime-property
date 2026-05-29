"use client";

import { useState } from "react";
import PublicNavbar from "@/components/PublicNavbar";

export default function ContactPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    hp: "",
    pesan: "",
  });

  const [toast, setToast] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nama || !form.email || !form.hp || !form.pesan) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Email tidak valid.");
      return;
    }

    if (form.hp.length < 10) {
      alert("Nomor HP minimum 10 digit.");
      return;
    }

    setToast("Pesan terkirim, tim kami akan menghubungi Anda.");

    setForm({
      nama: "",
      email: "",
      hp: "",
      pesan: "",
    });

    setTimeout(() => {
      setToast("");
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <PublicNavbar />

      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#C9A961] text-black px-5 py-3 rounded-xl font-semibold shadow-lg">
          {toast}
        </div>
      )}

      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A961] font-bold tracking-widest mb-4">
            KONTAK KAMI
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            Hubungi Prime Property
          </h1>

          <p className="text-gray-300 max-w-2xl mt-6 text-lg">
            Tim kami siap membantu Anda mendapatkan informasi properti,
            konsultasi listing, dan layanan agent Prime Property.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6">Informasi Kontak</h2>

          <div className="space-y-5 text-gray-700">
            <p>
              <b>Alamat:</b> Indonesia
            </p>

            <p>
              <b>Telepon/WA:</b> 08xxxxxxxxxx
            </p>

            <p>
              <b>Email:</b> admin@primeproperty.id
            </p>

            <a
              href="https://wa.me/6280000000000"
              target="_blank"
              className="inline-block bg-[#C9A961] text-black px-6 py-3 rounded-xl font-bold"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 border border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-6">Form Kontak</h2>

          <div className="space-y-4">
            <input
              placeholder="Nama"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              placeholder="Nomor HP"
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Pesan"
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32"
            />

            <button
              type="submit"
              className="bg-[#C9A961] text-black px-6 py-3 rounded-xl font-bold"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}