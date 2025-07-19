# 📚 Proyek UAS: Sistem Informasi Perpustakaan

Selamat datang di repository Proyek Ujian Akhir Semester (UAS) untuk mata kuliah Topik Khusus. Proyek ini adalah aplikasi web full-stack untuk manajemen perpustakaan, dibangun menggunakan arsitektur layanan terpisah dan dideploy dengan Docker.

## 🚀 Fitur Utama

| Fitur                 | Deskripsi                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| 👤 Manajemen Pengguna | Registrasi dan login untuk pengguna dan admin dengan sistem otentikasi.   |
| 🛡️ Manajemen Role    | Sistem peran untuk membedakan hak akses antara admin dan pengguna.         |
| 📖 Katalog Buku (CRUD)| Admin dapat menambah, melihat, mengedit, dan menghapus data buku.          |
| 🔍 Pencarian Buku     | Pengguna dapat mencari buku berdasarkan judul atau kategori.               |
| 📥 Sistem Peminjaman  | Pengguna dapat melakukan peminjaman buku dan melihat statusnya.            |
| 📤 Sistem Pengembalian| Admin dapat mengelola dan memvalidasi pengembalian buku.                   |
| 📜 Riwayat Transaksi  | Pengguna dan admin dapat melihat riwayat peminjaman yang pernah dilakukan. |

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend (User)**: Vue.js
- **Frontend (Admin)**: Vue.js
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## 📁 Struktur Proyek

Proyek ini menggunakan struktur monorepo dengan tiga direktori utama:

- **./perpustakaan**: Kode sumber untuk layanan Backend (Node.js + Express.js).
- **./perpustakaan-uas**: Kode sumber untuk layanan Frontend User (Vue.js).
- **./FrontEndAdminTK**: Kode sumber untuk layanan Frontend Admin (Vue.js).

Konfigurasi untuk menjalankan semua layanan secara bersamaan didefinisikan dalam file `docker-compose.yml`.

## ⚙️ Cara Menjalankan Proyek Secara Lokal

### Prasyarat

- Pastikan Anda telah menginstal **Docker Desktop** di komputer Anda.
- Pastikan port `5173`, `5174`, dan port lain yang diperlukan tidak sedang digunakan.

### Langkah-langkah

1. **Clone Repository**

   ```bash
   git clone https://github.com/Taufiqurrahman10/uas_topik_khusus_perpustakaan.git
   cd uas_topik_khusus_perpustakaan
   ```

2. **Jalankan dengan Docker Compose**

   Buka terminal di folder utama proyek dan jalankan:

   ```bash
   docker-compose up --build
   ```

   Perintah ini akan membangun image untuk setiap layanan dan menjalankan container. Proses ini mungkin memakan waktu beberapa menit saat pertama kali dijalankan.

3. **Akses Aplikasi**

   Setelah semua layanan berjalan, buka browser Anda dan akses:

   - **Frontend User**: [http://localhost:5174](http://localhost:5174)
   - **Frontend Admin**: [http://localhost:5173](http://localhost:5173)

## 👥 Anggota Kelompok

| Nama                         | NIM         |
|------------------------------|-------------|
| Cindy Steffani               | 2211081006  |
| Deni Ramadhan                | 2211083010  |
| Dzaky Rahmat Nurwahid        | 2211083024  |
| Geraldo Afrinandi Persada    | 2211083026  |
| Taufiqurrahman               | 2211081029  |

## 📝 Catatan

- Pastikan koneksi internet stabil saat menjalankan `docker-compose up --build` untuk mengunduh dependensi.
- Jika terjadi error terkait port, pastikan tidak ada aplikasi lain yang menggunakan port yang sama.
- Untuk menghentikan aplikasi, tekan `Ctrl+C` di terminal dan jalankan `docker-compose down` untuk membersihkan container.

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
