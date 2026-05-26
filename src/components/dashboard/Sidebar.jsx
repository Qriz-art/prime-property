"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  function handleLogout() {
    localStorage.removeItem("prime_user");
    window.location.href = "/agent/login";
  }

  const menus = [
  {
    name: "Dashboard",
    path: "/agent/dashboard",
  },
  {
    name: "Property Listing",
    path: "/agent/dashboard",
  },
  {
    name: "Admin Management",
    path: "/agent/admin-management",
  },
  {
    name: "Audit Log",
    path: "/agent/audit-log",
  },
];

  return (
    <aside className="w-72 bg-[#1A1A1A] text-white p-6 hidden md:flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#C9A961]">
          PRIME PROPERTY
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Internal Agent Portal
        </p>

        {user && (
          <div className="mt-5 bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {user.role}
            </p>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-3">
        {menus.map((menu) => {
          const active = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`px-4 py-3 rounded-xl font-semibold transition ${
                active
                  ? "bg-[#C9A961] text-black"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              {menu.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full border border-[#C9A961] text-[#C9A961] py-3 rounded-xl hover:bg-[#C9A961] hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}