"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/prime-logo.png"
            alt="Prime Property"
            width={180}
            height={60}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold">
          <Link href="/">Beranda</Link>
          <Link href="/about">Tentang Kami</Link>
          <Link href="/contact">Kontak</Link>
          <Link
            href="/agent/login"
            className="border border-[#C9A961] text-[#C9A961] px-5 py-2 rounded-xl hover:bg-[#C9A961] hover:text-black transition"
          >
            Login Agent
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden border px-3 py-2 rounded-lg text-[#1A1A1A]"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 font-semibold">
          <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
          <Link href="/about" onClick={() => setOpen(false)}>Tentang Kami</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Kontak</Link>
          <Link
            href="/agent/login"
            onClick={() => setOpen(false)}
            className="border border-[#C9A961] text-[#C9A961] px-5 py-2 rounded-xl text-center"
          >
            Login Agent
          </Link>
        </div>
      )}
    </header>
  );
}