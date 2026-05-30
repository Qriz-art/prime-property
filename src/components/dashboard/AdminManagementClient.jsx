"use client";

import { useState } from "react";

export default function AdminManagementClient({ admins }) {
  const [data, setData] = useState(admins);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("prime_user"))
      : null;

  async function handleAddAdmin(e) {
    e.preventDefault();

    const response = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        admin: form,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    setData([result.data, ...data]);
    setShowModal(false);

    setForm({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });
  }
async function handleDeleteAdmin(id) {
  const confirmDelete = confirm("Yakin ingin menghapus admin ini?");
  if (!confirmDelete) return;

  const response = await fetch(`/api/admins/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
    }),
  });

  const result = await response.json();

  if (!result.success) {
    alert(result.message);
    return;
  }

  setData(data.filter((admin) => admin.id !== id));
}
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1A1A]">
          Daftar Admin
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#C9A961] text-black px-5 py-2 rounded-lg font-semibold"
        >
          Add Admin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[#1A1A1A]">
          <thead className="bg-[#F5F5F5]">
            <tr className="text-left">
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((admin) => (
              <tr key={admin.id} className="border-t border-gray-200">
                <td className="px-6 py-4 font-semibold">
                  {admin.name}
                </td>

                <td className="px-6 py-4">
                  {admin.email}
                </td>

                <td className="px-6 py-4">
                  <span className="bg-[#C9A961]/20 text-[#8A6A2A] px-3 py-1 rounded-full text-sm font-semibold">
                    {admin.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(admin.created_at).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
  {admin.role === "superadmin" ? (
    <span className="text-sm text-gray-400">
      Protected
    </span>
  ) : (
    <button
      onClick={() => handleDeleteAdmin(admin.id)}
      className="px-3 py-1 rounded-lg bg-[#B33A3A] text-white text-sm font-semibold"
    >
      Delete
    </button>
  )}
</td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Belum ada admin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleAddAdmin}
            className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-5 text-[#1A1A1A]">
              Add Admin
            </h2>

            <div className="space-y-4">
              <input
                required
                placeholder="Nama"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <input
                required
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              />

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-[#1A1A1A]"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
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