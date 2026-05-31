"use client";

import { useEffect, useState } from "react";

export default function PublicPropertySection({ properties }) {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [kawasan, setKawasan] = useState("All");
  const [tipe, setTipe] = useState("All");
  const [status, setStatus] = useState("in_stock");
  const [hadap, setHadap] = useState("All");
  const [carport, setCarport] = useState("All");
  const [hargaMax, setHargaMax] = useState("");

  const [list, setList] = useState(properties || []);
  const [loading, setLoading] = useState(false);

  const kawasanOptions = [
    ...new Set((properties || []).map((item) => item.kawasan).filter(Boolean)),
  ];

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (kawasan !== "All") params.set("kawasan", kawasan);
      if (tipe !== "All") params.set("tipe", tipe);
      if (status !== "All") params.set("status", status);
      if (hadap !== "All") params.set("hadap", hadap);
      if (carport !== "All") params.set("carport", carport);
      if (hargaMax) params.set("hargaMax", hargaMax);

      try {
        const response = await fetch(
          `/api/public-properties?${params.toString()}`
        );
        const result = await response.json();

        if (result.success) {
          setList(result.data || []);
        }
      } catch {
        setList([]);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, kawasan, tipe, status, hadap, carport, hargaMax]);

  function resetFilter() {
    setSearch("");
    setKawasan("All");
    setTipe("All");
    setStatus("in_stock");
    setHadap("All");
    setCarport("All");
    setHargaMax("");
  }

  return (
    <section id="properti" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Properti Unggulan</h2>
          <p className="text-gray-500 mt-2">
            Data properti aktif langsung dari sistem internal.
          </p>
        </div>

        <div className="w-full lg:w-[430px]">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Cari properti, group, kawasan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-[#1A1A1A]"
            />

            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="px-5 py-3 rounded-xl bg-[#C9A961] text-black font-bold whitespace-nowrap"
            >
              Filter
            </button>
          </div>

          {showFilter && (
            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 grid gap-3 shadow-sm">
              <select
                value={kawasan}
                onChange={(e) => setKawasan(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="All">Semua Kawasan</option>
                {kawasanOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="All">Semua Tipe</option>
                <option value="Villa">Villa</option>
                <option value="Ruko">Ruko</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="All">Semua Status</option>
                <option value="in_stock">In Stock</option>
                <option value="sold_out">Sold Out</option>
              </select>

              <select
                value={hadap}
                onChange={(e) => setHadap(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="All">Semua Hadap</option>
                <option value="Utara">Utara</option>
                <option value="Selatan">Selatan</option>
                <option value="Timur">Timur</option>
                <option value="Barat">Barat</option>
                <option value="Utara/Timur">Utara/Timur</option>
                <option value="Selatan/Barat">Selatan/Barat</option>
              </select>

              <select
                value={carport}
                onChange={(e) => setCarport(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="All">Semua Carport</option>
                <option value="true">Ada Carport</option>
                <option value="false">Tidak Ada Carport</option>
              </select>

              <input
                type="number"
                placeholder="Harga Max"
                value={hargaMax}
                onChange={(e) => setHargaMax(e.target.value)}
                className="border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <button
                type="button"
                onClick={resetFilter}
                className="border border-[#B33A3A] text-[#B33A3A] rounded-xl px-4 py-3 font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          Menampilkan {list.length} properti
        </p>

        {loading && (
          <p className="text-sm text-gray-500">
            Memuat...
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{item.nama_property}</h3>
                <p className="text-gray-500">{item.group || item.kawasan}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm h-fit ${
                  item.status === "in_stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status === "in_stock" ? "In Stock" : "Sold Out"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 border-y py-4">
              <p>Ukuran: {item.lebar} x {item.panjang}</p>
              <p>Hadap: {item.hadap}</p>
              <p>Tipe: {item.tipe}</p>
              <p>Tingkat: {item.tingkat} Lt</p>
              <p>Carport: {item.carport ? "Ada" : "Tidak"}</p>
              <p>Kawasan: {item.kawasan}</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-[#C9A961] font-bold text-lg">
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>

              {item.maps_link && (
                <a
                  href={item.maps_link}
                  target="_blank"
                  className="text-sm font-semibold underline"
                >
                  Maps
                </a>
              )}
            </div>
          </div>
        ))}

        {list.length === 0 && !loading && (
          <div className="col-span-full bg-white rounded-2xl p-10 text-center text-gray-500">
            Properti tidak ditemukan.
          </div>
        )}
      </div>
    </section>
  );
}