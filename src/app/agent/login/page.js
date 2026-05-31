"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@primeproperty.id");
  const [password, setPassword] = useState("admin12345");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    window.location.href = "/agent/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#C9A961]">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 bg-white rounded-xl p-3 w-fit shadow-sm">
  <Image
    src="/prime-logo.png"
    alt="Prime Property"
    width={120}
    height={50}
    className="object-contain"
  />
</div>

          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Agent Login
          </h1>

          <p className="text-gray-500 mt-2">
            Prime Property Internal Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-sm text-[#1A1A1A]">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-[#C9A961]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-[#1A1A1A]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-[#C9A961]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A961] text-black py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Prime Property © 2026
        </p>
      </div>
    </main>
  );
}