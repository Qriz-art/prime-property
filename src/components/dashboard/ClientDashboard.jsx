"use client";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import PropertyTable from "./PropertyTable";

export default function ClientDashboard({ properties }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("prime_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex">
      <Sidebar user={user} />

      <section className="flex-1 p-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome back, {user.name}
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-[#C9A961]" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-500 mb-2">Total Property</p>

            <h3 className="text-4xl font-bold text-[#1A1A1A]">
              {properties.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-500 mb-2">In Stock</p>

            <h3 className="text-4xl font-bold text-[#C9A961]">
              {
                properties.filter(
                  (item) => item.status === "in_stock"
                ).length
              }
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-500 mb-2">Sold Out</p>

            <h3 className="text-4xl font-bold text-[#B33A3A]">
              {
                properties.filter(
                  (item) => item.status === "sold_out"
                ).length
              }
            </h3>
          </div>
        </div>

        <PropertyTable
          properties={properties}
          role={user.role}
        />
      </section>
    </main>
  );
}