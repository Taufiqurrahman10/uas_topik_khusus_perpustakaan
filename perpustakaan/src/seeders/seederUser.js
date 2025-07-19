import bcrypt from 'bcrypt';
import Role from '../models/roleModels.js';
import User from '../models/userModels.js';

// Fungsi ini akan dijalankan untuk mengisi data awal
const runSeeder = async () => {
    try {
        // 1. Membuat Role 'admin' dan 'user' jika belum ada
        const [adminRole, createdAdminRole] = await Role.findOrCreate({
            where: { nama: 'admin' },
            defaults: {
                nama: 'admin',
                deskripsi: 'Administrator memiliki akses penuh ke sistem.'
            }
        });

        const [userRole, createdUserRole] = await Role.findOrCreate({
            where: { nama: 'user' },
            defaults: {
                nama: 'user',
                deskripsi: 'User memiliki akses terbatas sesuai fungsionalitas pengguna.'
            }
        });

        if (createdAdminRole) {
            console.log('Role admin berhasil dibuat.');
        }
        if (createdUserRole) {
            console.log('Role user berhasil dibuat.');
        }

        // 2. Membuat User Admin Default jika belum ada
        // Hash password default
        const hashedPassword = await bcrypt.hash('password123', 10); // Ganti 'password123' dengan password yang aman

        const [adminUser, createdAdminUser] = await User.findOrCreate({
            where: { email: 'admin@perpustakaan.com' },
            defaults: {
                nama: 'Admin Perpustakaan',
                email: 'admin@perpustakaan.com',
                password: hashedPassword,
                role_id: adminRole.id_role // Menggunakan id dari role admin yang sudah dibuat
            }
        });

        if (createdAdminUser) {
            console.log('User admin default berhasil dibuat: admin@perpustakaan.com');
        }

        console.log('Seeder berhasil dijalankan.');

    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
    }
};

export default runSeeder;