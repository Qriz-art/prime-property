"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
const searchParams = useSearchParams();
  const [data, setData] = useState(properties);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
const [tipeFilter, setTipeFilter] = useState("All");
const [kawasanFilter, setKawasanFilter] = useState("All");
const [hadapFilter, setHadapFilter] = useState("All");
const [siapFilter, setSiapFilter] = useState("All");
const [carportFilter, setCarportFilter] = useState("All");
const [minLebar, setMinLebar] = useState("");
const [maxHarga, setMaxHarga] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [originalForm, setOriginalForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(50);
const [currentPage, setCurrentPage] = useState(1);
const [toast, setToast] = useState("");
const [highlightId, setHighlightId] = useState(null);

const [sortField, setSortField] = useState("nama_property");
const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
  setSearch(searchParams.get("search") || "");
  setKawasanFilter(searchParams.get("kawasan") || "All");
  setMinLebar(searchParams.get("minLebar") || "");
  setMaxHarga(searchParams.get("maxHarga") || "");
  setStatusFilter(searchParams.get("status") || "All");
  setTipeFilter(searchParams.get("tipe") || "All");
  setHadapFilter(searchParams.get("hadap") || "All");
  setSiapFilter(searchParams.get("siap") || "All");
  setCarportFilter(searchParams.get("carport") || "All");
}, []);
useEffect(() => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (kawasanFilter !== "All") params.set("kawasan", kawasanFilter);
  if (minLebar) params.set("minLebar", minLebar);
  if (maxHarga) params.set("maxHarga", maxHarga);
  if (statusFilter !== "All") params.set("status", statusFilter);
  if (tipeFilter !== "All") params.set("tipe", tipeFilter);
  if (hadapFilter !== "All") params.set("hadap", hadapFilter);
  if (siapFilter !== "All") params.set("siap", siapFilter);
  if (carportFilter !== "All") params.set("carport", carportFilter);

  const queryString = params.toString();

  router.replace(
    queryString ? `/agent/dashboard?${queryString}` : "/agent/dashboard",
    { scroll: false }
  );
}, [
  search,
  kawasanFilter,
  minLebar,
  maxHarga,
  statusFilter,
  tipeFilter,
  hadapFilter,
  siapFilter,
  carportFilter,
  router,
]);
  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("prime_user"))
      : null;

  const kawasanOptions = [...new Set(data.map((item) => item.kawasan).filter(Boolean))];

const filteredProperties = data.filter((item) => {
  const keyword = debouncedSearch.toLowerCase();

  const matchSearch =
    item.nama_property?.toLowerCase().includes(keyword) ||
    item.group?.toLowerCase().includes(keyword) ||
    item.kawasan?.toLowerCase().includes(keyword);

  const matchStatus = statusFilter === "All" || item.status === statusFilter;
  const matchTipe = tipeFilter === "All" || item.tipe === tipeFilter;
  const matchKawasan = kawasanFilter === "All" || item.kawasan === kawasanFilter;
  const matchHadap = hadapFilter === "All" || item.hadap === hadapFilter;
  const matchSiap = siapFilter === "All" || item.siap === siapFilter;
  const matchCarport =
    carportFilter === "All" || String(item.carport) === carportFilter;

  const matchMinLebar = !minLebar || Number(item.lebar) >= Number(minLebar);
  const matchMaxHarga = !maxHarga || Number(item.price) <= Number(maxHarga);

  function isDirty(field) {
  if (!editId) return false;

  return String(form[field]) !== String(originalForm[field]);
}

function dirtyClass(field) {
  return isDirty(field)
    ? "border-[#C9A961] bg-[#C9A961]/10"
    : "";
}
  return (
    matchSearch &&
    matchStatus &&
    matchTipe &&
    matchKawasan &&
    matchHadap &&
    matchSiap &&
    matchCarport &&
    matchMinLebar &&
    matchMaxHarga
  );
});

const sortedProperties = [...filteredProperties].sort((a, b) => {
  let aValue = a[sortField];
  let bValue = b[sortField];

  if (sortField === "price") {
    aValue = Number(aValue);
    bValue = Number(bValue);
  }

  if (sortField === "created_at") {
    aValue = new Date(aValue);
    bValue = new Date(bValue);
  }

  if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
  if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;

  return 0;
});

const totalPages = Math.ceil(sortedProperties.length / rowsPerPage);

const paginatedProperties = sortedProperties.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
 
function showToast(message) {
  setToast(message);

  setTimeout(() => {
    setToast("");
  }, 3000);
}

function resetFilters() {
  setSearch("");
  setStatusFilter("All");
  setTipeFilter("All");
  setKawasanFilter("All");
  setHadapFilter("All");
  setSiapFilter("All");
  setCarportFilter("All");
  setMinLebar("");
  setMaxHarga("");
  router.replace("/agent/dashboard", { scroll: false });
}

  function openAddModal() {
    setOriginalForm(emptyForm);
    setErrors({});
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(item) {
    const editForm = {
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
};

setForm(editForm);
setOriginalForm(editForm);
    setErrors({});
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
function validatePropertyForm() {
  const newErrors = {};

  if (form.nama_property.trim().length < 3) {
    newErrors.nama_property = "Nama properti minimal 3 karakter.";
  }

  if (form.nama_property.trim().length > 100) {
    newErrors.nama_property = "Nama properti maksimal 100 karakter.";
  }

  if (Number(form.lebar) <= 0) {
    newErrors.lebar = "Lebar harus lebih dari 0.";
  }

  if (!/^\d+(\.\d{1,2})?$/.test(String(form.lebar))) {
    newErrors.lebar = "Lebar maksimal 2 angka desimal.";
  }

  if (Number(form.panjang) <= 0) {
    newErrors.panjang = "Panjang harus lebih dari 0.";
  }

  if (!/^\d+(\.\d{1,2})?$/.test(String(form.panjang))) {
    newErrors.panjang = "Panjang maksimal 2 angka desimal.";
  }

  if (!Number.isInteger(Number(form.price)) || Number(form.price) <= 0) {
    newErrors.price = "Harga harus integer rupiah dan lebih dari 0.";
  }

  if (Number(form.tingkat) < 1 || Number(form.tingkat) > 10) {
    newErrors.tingkat = "Tingkat harus antara 1 sampai 10.";
  }

  if (!/^\d+(\.\d{1})?$/.test(String(form.tingkat))) {
    newErrors.tingkat = "Tingkat maksimal 1 angka desimal.";
  }

  if (
    form.maps_link &&
    !form.maps_link.includes("google.com/maps")
  ) {
    newErrors.maps_link = "Maps link harus URL Google Maps.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

async function getCsrfToken() {
  const response = await fetch("/api/csrf");
  const result = await response.json();
  return result.csrfToken;
}

  async function handleSaveProperty(e) {
    e.preventDefault();
    if (!validatePropertyForm()) {
  return;
}

    const payload = {
      ...form,
      lebar: Number(form.lebar),
      panjang: Number(form.panjang),
      tingkat: Number(form.tingkat),
      price: Number(form.price),
    };

    if (editId) {
      
     const csrfToken = await getCsrfToken();

const response = await fetch(`/api/properties/${editId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "x-csrf-token": csrfToken,
  },
  body: JSON.stringify({
    property: form,
  }),
});

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }
      

      setData(data.map((item) => (item.id === editId ? result.data : item)));
showToast("Properti berhasil diperbarui.");
    } else {
      const csrfToken = await getCsrfToken();
      
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "x-csrf-token": csrfToken,
},
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
setHighlightId(result.data.id);
showToast("Properti berhasil ditambahkan.");

setTimeout(() => {
  setHighlightId(null);
}, 3000);
    }

    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  }

  async function handleDeleteProperty(id) {
    const deletedProperty = data.find((item) => item.id === id);

const confirmed = window.confirm(
  `Yakin hapus properti "${deletedProperty?.nama_property}"?\n\nTindakan ini tidak dapat dibatalkan.`
);

if (!confirmed) return;



  const csrfToken = await getCsrfToken();

    const response = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: {
  "Content-Type": "application/json",
  "x-csrf-token": csrfToken,
},
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
    showToast("Properti berhasil dihapus.");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {toast && (
  <div className="fixed top-6 right-6 z-[999] bg-[#C9A961] text-black px-5 py-3 rounded-xl font-semibold shadow-lg">
    {toast}
  </div>
)}
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

        <div className="grid md:grid-cols-4 gap-4">

  <input
    type="text"
    placeholder="Cari properti, group, kawasan..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  />

  <select
    value={kawasanFilter}
    onChange={(e) => setKawasanFilter(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  >
    <option value="All">Semua Kawasan</option>
    {kawasanOptions.map((kawasan) => (
      <option key={kawasan} value={kawasan}>
        {kawasan}
      </option>
    ))}
  </select>

  <input
    type="number"
    placeholder="Lebar Min (m)"
    value={minLebar}
    onChange={(e) => setMinLebar(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  />

  <input
    type="number"
    placeholder="Harga Max"
    value={maxHarga}
    onChange={(e) => setMaxHarga(e.target.value)}
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

  <select
    value={hadapFilter}
    onChange={(e) => setHadapFilter(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  >
    <option value="All">Semua Hadap</option>
    <option value="Utara">Utara</option>
    <option value="Selatan">Selatan</option>
    <option value="Timur">Timur</option>
    <option value="Barat">Barat</option>
  </select>

  <select
    value={siapFilter}
    onChange={(e) => setSiapFilter(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  >
    <option value="All">Semua Kondisi</option>
    <option value="siap_huni">Siap Huni</option>
    <option value="siap_kosong">Siap Kosong</option>
    <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
  </select>

  <select
    value={carportFilter}
    onChange={(e) => setCarportFilter(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A]"
  >
    <option value="All">Semua Carport</option>
    <option value="true">Ada Carport</option>
    <option value="false">Tidak Ada Carport</option>
  </select>

</div>

<div className="mt-4">
  <button
  type="button"
  onClick={resetFilters}
    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
  >
    Reset Filter
  </button>

        </div>
        <div className="flex flex-wrap gap-4 mt-4">

  <select
    value={sortField}
    onChange={(e) => setSortField(e.target.value)}
    className="border rounded-lg px-3 py-2"
  >
    <option value="nama_property">Nama</option>
    <option value="price">Harga</option>
    <option value="created_at">Tanggal Dibuat</option>
    <option value="status">Status</option>
  </select>

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="border rounded-lg px-3 py-2"
  >
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>

  <select
    value={rowsPerPage}
    onChange={(e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    className="border rounded-lg px-3 py-2"
  >
    <option value={25}>25 Baris</option>
    <option value={50}>50 Baris</option>
    <option value={100}>100 Baris</option>
  </select>

</div>
        <div className="flex flex-wrap gap-2 mt-4">
  {search && (
  <button
    onClick={() => setSearch("")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Search: {search} ✕
  </button>
)}

  {kawasanFilter !== "All" && (
  <button
    onClick={() => setKawasanFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Kawasan: {kawasanFilter} ✕
  </button>
)}

  {minLebar && (
    <span className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm">
      Lebar Min: {minLebar} m
    </span>
  )}

  {maxHarga && (
    <span className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm">
      Harga Max: Rp {Number(maxHarga).toLocaleString("id-ID")}
    </span>
  )}

  {statusFilter !== "All" && (
  <button
    onClick={() => setStatusFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Status: {statusFilter} ✕
  </button>
)}

  {tipeFilter !== "All" && (
  <button
    onClick={() => setTipeFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Tipe: {tipeFilter} ✕
  </button>
)}

  {hadapFilter !== "All" && (
  <button
    onClick={() => setHadapFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Hadap: {hadapFilter} ✕
  </button>
)}

  {siapFilter !== "All" && (
  <button
    onClick={() => setSiapFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Siap: {siapFilter} ✕
  </button>
)}

  {carportFilter !== "All" && (
  <button
    onClick={() => setCarportFilter("All")}
    className="px-3 py-1 bg-[#C9A961]/20 text-[#8A6A2A] rounded-full text-sm"
  >
    Carport: {carportFilter === "true" ? "Ya" : "Tidak"} ✕
  </button>
)}
</div>
      </div>

      <div className="overflow-x-auto pb-2">
  <table className="w-full min-w-[1050px] text-[#1A1A1A]">
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
      {paginatedProperties.map((item) => (
        <tr
  key={item.id}
  onClick={() => setSelectedProperty(item)}
  className={`border-t border-gray-200 hover:bg-[#F5F5F5] cursor-pointer transition ${
  highlightId === item.id ? "bg-[#C9A961]/20" : ""
}`}
>
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
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      item.siap === "siap_huni"
        ? "bg-yellow-100 text-yellow-700"
        : item.siap === "siap_kosong"
        ? "bg-purple-100 text-purple-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {item.siap === "siap_huni"
      ? "Siap Huni"
      : item.siap === "siap_kosong"
      ? "Siap Kosong"
      : "Siap Huni Renovasi"}
  </span>
</td>

          <td className="px-6 py-4">{item.kawasan || "-"}</td>

          {role === "superadmin" && (
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
  e.stopPropagation();
  openEditModal(item);
}}
                  className="px-3 py-1 rounded-lg bg-[#C9A961] text-black text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
  e.stopPropagation();
  handleDeleteProperty(item.id);
}}
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
  <div className="flex items-center justify-between px-6 py-4 border-t">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span>
    Halaman {currentPage} dari {totalPages || 1}
  </span>

  <button
    disabled={currentPage >= totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
</div>
{selectedProperty && (
  <div className="fixed inset-0 z-40">
    <div
      onClick={() => setSelectedProperty(null)}
      className="absolute inset-0 bg-black/40"
    />

    <aside className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 overflow-y-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {selectedProperty.nama_property}
          </h2>

          <p className="text-gray-500 mt-1">
            {selectedProperty.group || selectedProperty.kawasan}
          </p>
        </div>

        <button
          onClick={() => setSelectedProperty(null)}
          className="text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Group</p>
          <p className="font-semibold">{selectedProperty.group || "-"}</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Kawasan</p>
          <p className="font-semibold">{selectedProperty.kawasan || "-"}</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Lebar × Panjang</p>
          <p className="font-semibold">
            {selectedProperty.lebar} × {selectedProperty.panjang} m
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Hadap</p>
          <p className="font-semibold">{selectedProperty.hadap}</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Tipe</p>
          <p className="font-semibold">{selectedProperty.tipe}</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Tingkat</p>
          <p className="font-semibold">{selectedProperty.tingkat} Lt</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Harga</p>
          <p className="font-semibold text-[#C9A961]">
            Rp {Number(selectedProperty.price).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Carport</p>
          <p className="font-semibold">
            {selectedProperty.carport ? "Ya" : "Tidak"}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Status</p>
          <p className="font-semibold">
            {selectedProperty.status === "in_stock" ? "In Stock" : "Sold Out"}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Siap</p>
          <p className="font-semibold">
            {selectedProperty.siap === "siap_huni"
              ? "Siap Huni"
              : selectedProperty.siap === "siap_kosong"
              ? "Siap Kosong"
              : "Siap Huni Renovasi"}
          </p>
        </div>

        <div className="border rounded-xl p-4 col-span-2">
          <p className="text-gray-500">Unit</p>
          <p className="font-semibold">{selectedProperty.unit || "-"}</p>
        </div>
      </div>

      {selectedProperty.maps_link && (
        <a
          href={selectedProperty.maps_link}
          target="_blank"
          className="mt-6 inline-block bg-[#C9A961] text-black px-5 py-3 rounded-xl font-bold"
        >
          Buka di Google Maps
        </a>
      )}

      {role === "superadmin" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              openEditModal(selectedProperty);
              setSelectedProperty(null);
            }}
            className="px-5 py-3 rounded-xl bg-[#C9A961] text-black font-bold"
          >
            Edit
          </button>

          <button
            onClick={() => {
              handleDeleteProperty(selectedProperty.id);
              setSelectedProperty(null);
            }}
            className="px-5 py-3 rounded-xl bg-[#B33A3A] text-white font-bold"
          >
            Hapus
          </button>
        </div>
      )}
    </aside>
  </div>
)}

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
  className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("nama_property")}`}
/>

{errors.nama_property && (
  <p className="text-[#B33A3A] text-sm mt-1">
    {errors.nama_property}
  </p>
)}

              <input
                placeholder="Group"
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("group")}`}
              />

              <input
                required
                type="number"
                step="0.01"
                placeholder="Lebar"
                value={form.lebar}
                onChange={(e) => setForm({ ...form, lebar: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("lebar")}`}
              />
              {errors.lebar && (
  <p className="text-[#B33A3A] text-sm mt-1">
    {errors.lebar}
  </p>
)}

              <input
                required
                type="number"
                step="0.01"
                placeholder="Panjang"
                value={form.panjang}
                onChange={(e) => setForm({ ...form, panjang: e.target.value })}
className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("panjang")}`}
              />
              {errors.panjang && (
  <p className="text-[#B33A3A] text-sm mt-1">
    {errors.panjang}
  </p>
)}

              <select
                value={form.hadap}
                onChange={(e) => setForm({ ...form, hadap: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("hadap")}`}

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
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("tipe")}`}

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
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("tingkat")}`}

              />
              {errors.tingkat && (
  <p className="text-[#B33A3A] text-sm mt-1">
    {errors.tingkat}
  </p>
)}

              <input
                required
                type="number"
                placeholder="Harga Rupiah"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("price")}`}

              />
              {errors.price && (
  <p className="text-[#B33A3A] text-sm mt-1">
    {errors.price}
  </p>
)}

              <select
                value={form.carport ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, carport: e.target.value === "true" })
                }
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("carport")}`}

              >
                <option value="true">Ada Carport</option>
                <option value="false">Tidak Ada Carport</option>
              </select>

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("status")}`}

              >
                <option value="in_stock">In Stock</option>
                <option value="sold_out">Sold Out</option>
              </select>

              <select
                value={form.siap}
                onChange={(e) => setForm({ ...form, siap: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("siap")}`}

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
className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] ${dirtyClass("kawasan")}`}
              />

              <input
                placeholder="Maps Link"
                value={form.maps_link}
                onChange={(e) => setForm({ ...form, maps_link: e.target.value })}
className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] md:col-span-2 ${dirtyClass("maps_link")}`}
              />
              {errors.maps_link && (
  <p className="text-[#B33A3A] text-sm mt-1 md:col-span-2">
    {errors.maps_link}
  </p>
)}

              <input
                placeholder="Unit"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-[#1A1A1A] md:col-span-2 ${dirtyClass("unit")}`}
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