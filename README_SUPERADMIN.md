# Prime Property — Panduan Superadmin

## Login

1. Buka halaman:

   /agent/login

2. Masukkan email dan password Superadmin.

3. Setelah login berhasil, Anda akan masuk ke Dashboard Internal.

---

# Dashboard Properti

Menu utama digunakan untuk mengelola seluruh data properti.

Fitur yang tersedia:

- Melihat daftar properti
- Mencari properti
- Filter properti
- Menambah properti
- Mengubah properti
- Menghapus properti (Soft Delete)

---

# Menambah Properti

1. Klik tombol **Add Property**.
2. Isi seluruh data properti.
3. Klik **Save**.

Field yang wajib diisi:

- Nama Property
- Lebar
- Panjang
- Hadap
- Tipe
- Tingkat
- Harga
- Status
- Siap
- Kawasan

Field opsional:

- Group
- Unit
- Maps Link

---

# Mengubah Properti

1. Klik salah satu baris properti.
2. Drawer detail akan terbuka.
3. Klik tombol **Edit**.
4. Ubah data yang diperlukan.
5. Klik **Save**.

Semua perubahan akan dicatat pada Audit Log.

---

# Menghapus Properti

1. Buka detail properti.
2. Klik tombol **Hapus**.
3. Konfirmasi penghapusan.

Catatan:

- Sistem menggunakan Soft Delete.
- Data tidak benar-benar dihapus dari database.
- Properti yang dihapus tidak tampil pada listing normal.

---

# Filter & Pencarian

Dashboard mendukung:

- Search nama properti
- Search group
- Search kawasan
- Filter kawasan
- Filter hadap
- Filter tipe
- Filter status
- Filter kondisi siap
- Filter carport
- Filter harga maksimum
- Filter lebar minimum

Gunakan tombol **Reset Filter** untuk mengembalikan filter ke kondisi awal.

---

# Audit Log

Semua aktivitas penting Superadmin dicatat:

- Create Property
- Update Property
- Delete Property

Data yang dicatat:

- Email pengguna
- Jenis aksi
- Nama properti
- Waktu aktivitas

---

# Keamanan Sistem

Sistem memiliki:

- Login berbasis role
- Session Cookie HttpOnly
- Password Hashing (bcrypt)
- Rate Limiting Login
- Rate Limiting API
- Soft Delete Property

---

# Role

## Superadmin

Hak akses:

- Create Property
- Update Property
- Delete Property
- Kelola Admin
- Lihat Audit Log

## Admin

Hak akses:

- Lihat Properti
- Filter Properti
- Search Properti

Admin tidak dapat menambah, mengubah, atau menghapus properti.

---

Prime Property Internal System
Version 1.0