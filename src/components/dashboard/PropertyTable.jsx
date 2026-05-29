"use client";

import { useState } from "react";

const emptyForm = {
  nama_property: "",
  group: "",
  lebar: "",
  panjang: "",
  hadap: "Utara",
  tipe: "Villa",
  tingkat: "",
  price: "",
  carport: true,
  status: "in_stock",
  siap: "siap_huni",
  maps_link: "",
  kawasan: "",
  unit: "",
};

export default function PropertyTable({ properties, role }) {
  const [data, setData] = useState(properties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tipeFilter, setTipeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("prime_user"))
      : null;

  const filteredProperties = data.filter((item) => {
    const matchSearch = item.nama_property
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    const matchTipe = tipeFilter === "All" || item.tipe === tipeFilter;

    return matchSearch && matchStatus && matchTipe;
  });

  function openAddModal() {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditId(item.id);
    setForm({
      nama_property: item.nama_property || "",
      group: item.group || "",
      lebar: item.lebar || "",
      panjang: item.panjang || "",
      hadap: item.hadap || "Utara",
      tipe: item.tipe || "Villa",
      tingkat: item.tingkat || "",
      price: item.price || "",
      carport: item.carport ?? true,
      status: item.status || "in_stock",
      siap: item.siap || "siap_huni",
      maps_link: item.maps_link || "",
      kawasan: item.kawasan || "",
      unit: item.unit || "",
    });
    setShowModal(true);
  }

  async function handleSaveProperty(e) {
    e.preventDefault();

    const payload = {
      ...form,
      lebar: Number(form.lebar),
      panjang: Number(form.panjang),
      tingkat: Number(form.tingkat),
      price: Number(form.price),
    };

    if (editId) {
      const response = await fetch(`/api/properties/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          property: payload,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setData(data.map((item) => (item.id === editId ? result.data : item)));
    } else {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          property: payload,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setData([result.data, ...data]);
    }

    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  }

  async function handleDeleteProperty(id) {
    const confirmDelete = confirm("Yakin ingin menghapus property ini?");
    if (!confirmDelete) return;

    const deletedProperty = data.find((item) => item.id === id);

    const response = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        propertyName: deletedProperty?.nama_property || "-",
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    setData(data.filter((item) => item.id !== id));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Property Listing</h3>

          {role === "superadmin" && (
            <button
              onClick={openAddModal}
              className="bg-[#C9A961] px-5 py-2 rounded-lg font-semibold text-black w-fit"
            >
              Add Property
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Cari nama properti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
          >
            <option value="All">Semua Status</option>
            <option value="in_stock">In Stock</option>
            <option value="sold_out">Sold Out</option>
          </select>

          <select
            value={tipeFilter}
            onChange={(e) => setTipeFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
          >
            <option value="All">Semua Tipe</option>
            <option value="Villa">Villa</option>
            <option value="Ruko">Ruko</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
  <table className="w-full text-[#1A1A1A]">
    <thead className="bg-[#F5F5F5]">
      <tr className="text-left">
        <th className="px-6 py-4">Property</th>
        <th className="px-6 py-4">Group</th>
        <th className="px-6 py-4">Ukuran</th>
        <th className="px-6 py-4">Hadap</th>
        <th className="px-6 py-4">Tipe</th>
        <th className="px-6 py-4">Tingkat</th>
        <th className="px-6 py-4">Harga</th>
        <th className="px-6 py-4">Carport</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4">Siap</th>
        <th className="px-6 py-4">Kawasan</th>

        {role === "superadmin" && (
          <th className="px-6 py-4">Aksi</th>
        )}
      </tr>
    </thead>

    <tbody>
      {filteredProperties.map((item) => (
        <tr key={item.id} className="border-t border-gray-200">
          <td className="px-6 py-4 font-semibold">{item.nama_property}</td>
          <td className="px-6 py-4">{item.group || "-"}</td>
          <td className="px-6 py-4">{item.lebar} x {item.panjang}</td>
          <td className="px-6 py-4">{item.hadap}</td>
          <td className="px-6 py-4">{item.tipe}</td>
          <td className="px-6 py-4">{item.tingkat} Lt</td>
          <td className="px-6 py-4 font-semibold">
            Rp {Number(item.price).toLocaleString("id-ID")}
          </td>
          <td className="px-6 py-4">{item.carport ? "Ya" : "Tidak"}</td>

          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                item.status === "in_stock"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status === "in_stock" ? "In Stock" : "Sold Out"}
            </span>
          </td>

          <td className="px-6 py-4">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              {item.siap === "siap_huni"
                ? "Siap Huni"
                : item.siap === "siap_kosong"
                ? "Siap Kosong"
                : "Renovasi"}
            </span>
          </td>

          <td className="px-6 py-4">{item.kawasan || "-"}</td>

          {role === "superadmin" && (
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1 rounded-lg bg-[#C9A961] text-black text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProperty(item.id)}
                  className="px-3 py-1 rounded-lg bg-[#B33A3A] text-white text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </td>
          )}
        </tr>
      ))}

      {filteredProperties.length === 0 && (
        <tr>
          <td
            colSpan={role === "superadmin" ? 12 : 11}
            className="px-6 py-10 text-center text-gray-500"
          >
            Properti tidak ditemukan.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSaveProperty}
            className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-5 text-[#1A1A1A]">
              {editId ? "Edit Property" : "Add Property"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Nama Property"
                value={form.nama_property}
                onChange={(e) =>
                  setForm({ ...form, nama_property: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                placeholder="Group"
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                required
                type="number"
                step="0.01"
                placeholder="Lebar"
                value={form.lebar}
                onChange={(e) => setForm({ ...form, lebar: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                required
                type="number"
                step="0.01"
                placeholder="Panjang"
                value={form.panjang}
                onChange={(e) => setForm({ ...form, panjang: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <select
                value={form.hadap}
                onChange={(e) => setForm({ ...form, hadap: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="Utara">Utara</option>
                <option value="Selatan">Selatan</option>
                <option value="Timur">Timur</option>
                <option value="Barat">Barat</option>
                <option value="Utara/Timur">Utara/Timur</option>
                <option value="Selatan/Barat">Selatan/Barat</option>
              </select>

              <select
                value={form.tipe}
                onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="Villa">Villa</option>
                <option value="Ruko">Ruko</option>
              </select>

              <input
                required
                type="number"
                step="0.5"
                placeholder="Tingkat"
                value={form.tingkat}
                onChange={(e) => setForm({ ...form, tingkat: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                required
                type="number"
                placeholder="Harga Rupiah"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <select
                value={form.carport ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, carport: e.target.value === "true" })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="true">Ada Carport</option>
                <option value="false">Tidak Ada Carport</option>
              </select>

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="in_stock">In Stock</option>
                <option value="sold_out">Sold Out</option>
              </select>

              <select
                value={form.siap}
                onChange={(e) => setForm({ ...form, siap: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="siap_huni">Siap Huni</option>
                <option value="siap_kosong">Siap Kosong</option>
                <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
              </select>

              <input
                required
                placeholder="Kawasan"
                value={form.kawasan}
                onChange={(e) => setForm({ ...form, kawasan: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                placeholder="Maps Link"
                value={form.maps_link}
                onChange={(e) => setForm({ ...form, maps_link: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A] md:col-span-2"
              />

              <input
                placeholder="Unit"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A] md:col-span-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border text-[#1A1A1A]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#C9A961] text-black font-semibold"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}