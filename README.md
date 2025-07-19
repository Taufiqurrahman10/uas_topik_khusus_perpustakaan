Proyek UAS: Sistem Informasi Perpustakaan (uas_topik_khusus_perpustakaan)
Ini adalah repository untuk Proyek Ujian Akhir Semester (UAS) mata kuliah Topik Khusus. Proyek ini adalah aplikasi web full-stack untuk manajemen perpustakaan yang dibangun menggunakan arsitektur layanan terpisah dan dideploy menggunakan Docker.

Deskripsi Proyek
Aplikasi ini dirancang untuk mengelola operasi sehari-hari di sebuah perpustakaan. Terdapat dua antarmuka utama: satu untuk pengguna (peminjam) yang dapat mencari dan meminjam buku, dan satu lagi untuk admin yang dapat mengelola data buku, anggota, dan transaksi peminjaman.

Seluruh aplikasi ini dikemas dalam container Docker untuk memastikan portabilitas dan kemudahan dalam proses deployment.

Teknologi yang Digunakan
Backend: Node.js dengan framework Express.js

Frontend User: Vue.js

Frontend Admin: Vue.js

Database: MySQL 8.0

Deployment: Docker & Docker Compose

Fitur Utama
Manajemen Pengguna: Registrasi dan Login untuk user dan admin.

Manajemen Role: Sistem peran untuk membedakan hak akses antara admin dan user.

Katalog Buku (CRUD): Admin dapat menambah, melihat, mengedit, dan menghapus data buku.

Pencarian Buku: Pengguna dapat mencari buku berdasarkan judul atau kategori.

Sistem Peminjaman: Pengguna dapat melakukan peminjaman buku.

Sistem Pengembalian: Admin dapat mengelola pengembalian buku.

Riwayat Transaksi: Pengguna dan admin dapat melihat riwayat peminjaman.

Struktur Proyek
Proyek ini diorganisir dalam struktur monorepo dengan tiga direktori utama:

/perpustakaan: Berisi kode sumber untuk layanan Backend (Node.js).

/perpustakaan-uas: Berisi kode sumber untuk layanan Frontend User (Vue.js).

/FrontEndAdminTK: Berisi kode sumber untuk layanan Frontend Admin (Vue.js).

Konfigurasi untuk menjalankan semua layanan ini secara bersamaan didefinisikan dalam file docker-compose.yml.

Cara Menjalankan Proyek Secara Lokal
Pastikan Anda sudah menginstal Docker Desktop di komputer Anda.

Clone Repository Ini

git clone https://github.com/Taufiqurrahman10/uas_topik_khusus_perpustakaan.git
cd uas_topik_khusus_perpustakaan

Buat File .env
Buat sebuah file baru bernama .env di dalam folder utama proyek. Salin konten di bawah ini ke dalam file tersebut dan sesuaikan jika perlu.

Jalankan dengan Docker Compose
Buka terminal di folder utama proyek dan jalankan perintah berikut:

docker-compose up --build

Perintah ini akan membangun image untuk setiap layanan dan menjalankan semua container. Proses ini mungkin memakan waktu beberapa menit saat pertama kali dijalankan.

Akses Aplikasi
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
