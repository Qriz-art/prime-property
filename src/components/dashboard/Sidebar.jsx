"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
  async function loadUser() {
    const response = await fetch("/api/me");
    const result = await response.json();

    if (result.success) {
      setUser(result.user);
    }
  }

  loadUser();
}, []);

  async function handleLogout() {
  await fetch("/api/logout", {
    method: "POST",
  });

  localStorage.removeItem("prime_user");
  window.location.href = "/agent/login";
}

  const menus = [
    { name: "Dashboard", path: "/agent/dashboard" },
    { name: "Property Listing", path: "/agent/dashboard" },
    { name: "Admin Management", path: "/agent/admin-management" },
    { name: "Audit Log", path: "/agent/audit-log" },
  ];

  function SidebarContent() {
  return (
    <>
      <div className="px-8 py-7 border-b border-white/10">
        <div className="bg-white rounded-xl p-3 w-fit mb-3">
          <Image
            src="/prime-logo.png"
            alt="Prime Property"
            width={150}
            height={55}
            className="object-contain"
          />
        </div>

        <p className="text-gray-400 text-sm mt-1">
          Internal Agent Portal
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {user && (
          <div className="mx-5 mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-400 mt-1 capitalize">
              {user.role}
            </p>
          </div>
        )}

        <nav className="flex flex-col gap-2 px-4 mt-8">
          {menus.map((menu) => {
            const active = pathname === menu.path;

            return (
              <Link
                key={menu.name}
                href={menu.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-[#C9A961] text-black"
                    : "text-gray-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full rounded-xl border border-[#C9A961] px-4 py-3 text-[#C9A961] font-bold hover:bg-[#C9A961] hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </>
  );
}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-5 left-5 z-50 bg-[#1A1A1A] text-[#C9A961] border border-[#C9A961] px-4 py-2 rounded-xl font-bold"
      >
        ☰
      </button>

      <aside
  className="
    hidden
    md:flex
    fixed
    left-0
    top-0
    h-screen
    w-72
    bg-[#1A1A1A]
    text-white
    flex-col
    border-r
    border-white/10
    z-40
  "
>
  <SidebarContent />
</aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <aside className="relative w-72 h-full bg-[#1A1A1A] text-white flex flex-col border-r border-white/10">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ×
            </button>

            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}