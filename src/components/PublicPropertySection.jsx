"use client";

import { useMemo, useState } from "react";

export default function PublicPropertySection({ properties }) {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [kawasan, setKawasan] = useState("All");
  const [tipe, setTipe] = useState("All");
  const [status, setStatus] = useState("All");
  const [hadap, setHadap] = useState("All");
  const [carport, setCarport] = useState("All");
  const [hargaMax, setHargaMax] = useState("");

  const kawasanOptions = [
    ...new Set(properties.map((item) => item.kawasan).filter(Boolean)),
  ];

  const filteredProperties = useMemo(() => {
    const keyword = search.toLowerCase();

    return properties.filter((item) => {
      const matchSearch =
        item.nama_property?.toLowerCase().includes(keyword) ||
        item.group?.toLowerCase().includes(keyword) ||
        item.kawasan?.toLowerCase().includes(keyword);

      const matchKawasan = kawasan === "All" || item.kawasan === kawasan;
      const matchTipe = tipe === "All" || item.tipe === tipe;
      const matchStatus = status === "All" || item.status === status;
      const matchHadap = hadap === "All" || item.hadap === hadap;
      const matchCarport =
        carport === "All" || String(item.carport) === carport;
      const matchHarga =
        !hargaMax || Number(item.price) <= Number(hargaMax);

      return (
        matchSearch &&
        matchKawasan &&
        matchTipe &&
        matchStatus &&
        matchHadap &&
        matchCarport &&
        matchHarga
      );
    });
  }, [properties, search, kawasan, tipe, status, hadap, carport, hargaMax]);

  function resetFilter() {
    setSearch("");
    setKawasan("All");
    setTipe("All");
    setStatus("All");
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
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Cari properti, group, kawasan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
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
                className="border rounded-xl px-4 py-3"
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
                className="border rounded-xl px-4 py-3"
              >
                <option value="All">Semua Tipe</option>
                <option value="Villa">Villa</option>
                <option value="Ruko">Ruko</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded-xl px-4 py-3"
              >
                <option value="All">Semua Status</option>
                <option value="in_stock">In Stock</option>
                <option value="sold_out">Sold Out</option>
              </select>

              <select
                value={hadap}
                onChange={(e) => setHadap(e.target.value)}
                className="border rounded-xl px-4 py-3"
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
                className="border rounded-xl px-4 py-3"
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
                className="border rounded-xl px-4 py-3"
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

      <p className="text-sm text-gray-500 mb-5">
        Menampilkan {filteredProperties.length} properti
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{item.nama_property}</h3>
                <p className="text-gray-500">{item.group || item.kawasan}</p>
              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm h-fit">
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

            <div className="mt-5 flex items-center justify-between">
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

        {filteredProperties.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-10 text-center text-gray-500">
            Properti tidak ditemukan.
          </div>
        )}
      </div>
    </section>
  );
}