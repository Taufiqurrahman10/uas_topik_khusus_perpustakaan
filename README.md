<div align="center">

📚 Proyek UAS: Sistem Informasi Perpustakaan
uas_topik_khusus_perpustakaan

</div>

Ini adalah repository untuk Proyek Ujian Akhir Semester (UAS) mata kuliah Topik Khusus. Proyek ini adalah aplikasi web full-stack untuk manajemen perpustakaan yang dibangun menggunakan arsitektur layanan terpisah dan dideploy menggunakan Docker.

🛠️ Tumpukan Teknologi (Tech Stack)
<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=61DAFB" alt="Vue.js">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

🚀 Fitur Utama
Fitur

Deskripsi

👤 Manajemen Pengguna

Registrasi dan Login untuk user dan admin dengan sistem otentikasi.

🛡️ Manajemen Role

Sistem peran untuk membedakan hak akses antara admin dan user.

📖 Katalog Buku (CRUD)

Admin dapat menambah, melihat, mengedit, dan menghapus data buku.

🔍 Pencarian Buku

Pengguna dapat mencari buku berdasarkan judul atau kategori.

📥 Sistem Peminjaman

Pengguna dapat melakukan peminjaman buku dan melihat statusnya.

📤 Sistem Pengembalian

Admin dapat mengelola dan memvalidasi pengembalian buku.

📜 Riwayat Transaksi

Pengguna dan admin dapat melihat riwayat peminjaman yang pernah dilakukan.

📁 Struktur Proyek
Proyek ini diorganisir dalam struktur monorepo dengan tiga direktori utama:

./perpustakaan: Berisi kode sumber untuk layanan Backend (Node.js).

./perpustakaan-uas: Berisi kode sumber untuk layanan Frontend User (Vue.js).

./FrontEndAdminTK: Berisi kode sumber untuk layanan Frontend Admin (Vue.js).

💡 Konfigurasi untuk menjalankan semua layanan ini secara bersamaan didefinisikan dalam file docker-compose.yml.

⚙️ Cara Menjalankan Proyek Secara Lokal
Pastikan Anda sudah menginstal Docker Desktop di komputer Anda.

1. Clone Repository Ini
git clone https://github.com/Taufiqurrahman10/uas_topik_khusus_perpustakaan.git
cd uas_topik_khusus_perpustakaan

2. Buat File .env
Buat sebuah file baru bernama .env di dalam folder utama proyek. Salin konten di bawah ini ke dalam file tersebut.

# Konfigurasi untuk database
DB_PASS=kelompok1
DB_NAME=db_perpustakaan

3. Jalankan dengan Docker Compose
Buka terminal di folder utama proyek dan jalankan perintah berikut:

docker-compose up --build

Perintah ini akan membangun image untuk setiap layanan dan menjalankan semua container. Proses ini mungkin memakan waktu beberapa menit saat pertama kali dijalankan.

4. Akses Aplikasi
Setelah semua layanan berjalan, buka browser Anda dan akses:

Frontend User: http://localhost:5174

Frontend Admin: http://localhost:5173

# perpustakaan

## Kelompok
| Nama     | Nim                          |
|----------------|-------------------------------|
| Cindy Steffani    | 2211081006              |
| Deni Ramadhan    | 2211083010             |
| Dzaky Rahmat Nurwahid    | 2211083024              |
| Geraldo Afrinandi Persada    | 2211083026              |
| Taufiqurrahman    | 2211081029   |
