<template>
    <div class="book-detail-page">
        <div v-if="isLoading" class="loading-spinner"></div>

        <div v-if="book && !isLoading" class="detail-container">
            <div class="cover-wrapper">
                <img :src="book.cover" :alt="book.title" class="cover-image" />
            </div>
            <div class="info-wrapper">
                <span class="category-tag">{{ book.category }}</span>
                <h1 class="book-title">{{ book.title }}</h1>
                <p class="book-author">oleh {{ book.author }}</p>
                <div class="book-meta">
                    <span>Penerbit: {{ book.penerbit }}</span>
                    <span>Tahun Terbit: {{ book.tahun_terbit }}</span>
                </div>
                <div class="book-synopsis">
                    <h3 class="synopsis-title">Sinopsis</h3>
                    <p>{{ book.sinopsis || 'Sinopsis tidak tersedia.' }}</p>

                </div>
                <div class="actions">
                    <router-link to="/buku" class="back-button-details">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5"></path>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Kembali</span>
                    </router-link>
                    <button class="borrow-button" @click="openBorrowModal">Pinjam Buku</button>
                </div>
            </div>
        </div>

        <div v-if="!book && !isLoading" class="not-found">
            <h2>Buku Tidak Ditemukan</h2>
            <p>Maaf, buku yang Anda cari tidak ada dalam koleksi kami.</p>
            <router-link to="/buku" class="back-button">Kembali ke Koleksi</router-link>
        </div>

        <!-- <BorrowModal v-if="isModalOpen" :bookTitle="book.title" @close="closeBorrowModal"
            @submit="handleBorrowSubmit" /> -->

        <NotificationToast v-if="showNotification" :message="notificationMessage" :type="notificationType"
            @close="closeNotification" />
    </div>
    <BorrowModal v-if="isModalOpen && book" :bookTitle="book.title" :bookId="book.id" @close="closeBorrowModal"
        @borrowSuccess="handleBorrowSubmit" @showNotification="handleNotification" />

    <BorrowReceipt v-if="showReceipt" :receipt="receiptData" @close="showReceipt = false" />




</template>

<script>
import axios from 'axios';
import BorrowModal from '@/components/BorrowModal.vue';
import NotificationToast from '@/components/NotificationToast.vue';
import BorrowReceipt from '@/components/Receipt.vue';

export default {
    name: 'BookDetailPage',
    components: {
        BorrowModal,
        BorrowReceipt,
        NotificationToast,
    },
    data() {
        return {
            receiptData: null,
            showReceipt: false,
            book: null,
            isLoading: true,
            isModalOpen: false,
            showNotification: false,
            notificationMessage: '',
            notificationType: 'error',
            user: null,
        };
    },
    created() {
        const bookId = this.$route.params.id;
        this.fetchBookDetails(bookId);
        this.fetchUserProfile();
    },
    methods: {
        fetchBookDetails(id) {
            this.isLoading = true;
            axios
                .get(`http://localhost:5000/api/buku/${id}`)
                .then((response) => {
                    const bookData = response.data;

                    if (bookData) {
                        this.book = {
                            id: bookData.id_buku,
                            title: bookData.judul,
                            author: bookData.penulis,
                            penerbit: bookData.penerbit || '-',
                            tahun_terbit: bookData.tahun_terbit || '-',
                            category: bookData.kategori ? bookData.kategori.nama_kategori : 'Tanpa Kategori',
                            cover: bookData.images,
                            sinopsis:
                                bookData.sinopsis ||
                                'Sinopsis untuk buku ini belum tersedia.',
                        };
                    } else {
                        this.book = null;
                    }
                })
                .catch((error) => {
                    console.error('Gagal mengambil detail buku:', error);
                    this.book = null;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        fetchUserProfile() {
            axios
                .get('http://localhost:5000/api/profile', { withCredentials: true })
                .then((response) => {
                    this.user = response.data.user;
                })
                .catch(() => {
                    this.user = null;
                });
        },

        openBorrowModal() {
            console.log('Membuka modal untuk buku dengan ID:', this.book.id);
            if (!this.user) {
                this.notificationMessage = 'Silakan login terlebih dahulu untuk meminjam buku.';
                this.notificationType = 'error';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                    this.$router.push('/login');
                }, 2000);

                return;
            }
            this.isModalOpen = true;
        },


        closeBorrowModal() {
            this.isModalOpen = false;
        },

handleBorrowSubmit(receipt) { 
    console.log('RECEIPT dari API:', receipt);

    this.isModalOpen = false; 

    this.receiptData = {
        judul_buku: this.book.title, 
        tanggal_pinjam: receipt.tanggal_pinjam,
        tanggal_kembali: receipt.tanggal_kembali,
        status: receipt.status,
        
        nomor_resi: receipt.kartu_pustaka?.nomor_resi || 'N/A'
    };
    
    this.showReceipt = true; 
},

        handleBorrowSuccess(peminjamanData) {
            this.closeBorrowModal();

            this.$router.push({
                name: 'receipt',
                query: {
                    peminjamanId: peminjamanData.id_peminjaman,
                    judul: this.book.title,
                    penulis: this.book.author,
                    tanggalPinjam: peminjamanData.tanggal_pinjam,
                    tanggalKembali: peminjamanData.tanggal_kembali,
                },
            });
        },
        handleNotification({ message, type }) {
            this.notificationMessage = message;
            this.notificationType = type;
            this.showNotification = true;

            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },


        tampilkanResi(peminjamanData) {

            console.log('✅ Event borrowSuccess berhasil diterima!');
            console.log('Data yang dibawa event:', peminjamanData);

            this.isModalOpen = false;


            this.receiptData = {
                judul_buku: this.book.title,
                tanggal_pinjam: peminjamanData.tanggal_pinjam,
                tanggal_kembali: peminjamanData.tanggal_kembali,
                status: peminjamanData.status,
                nomor_resi: peminjamanData.kartu_pustaka?.nomor_resi || 'N/A',
                tanggal_diterbitkan: peminjamanData.tanggal_diterbitkan,
                berlaku_sampai: peminjamanData.berlaku_sampai,
            };


            this.showReceipt = true;
        },

        closeNotification() {
            this.showNotification = false;
        },
    },
};
</script>



<style scoped>
.book-detail-page {
    padding-top: 72px;
    background-color: #F9FAFB;
    min-height: 100vh;
    overflow-x: hidden;
}


.detail-container {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    position: relative;
}


.detail-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 0 80px 0;
    z-index: 0;
}

.cover-wrapper,
.info-wrapper {
    position: relative;
    z-index: 1;
}

.cover-wrapper {
    transform: translateY(-80px);
    position: sticky;
    top: 120px;
    align-self: start;
    height: fit-content;
}

.cover-image {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: all 0.4s ease;
}

.cover-wrapper:hover .cover-image {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
}

.info-wrapper {
    padding-left: 2rem;
}

.category-tag {
    display: inline-block;
    background-color: #E0F2FE;
    color: #007BFF;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
}

.book-title {
    font-size: 2rem;
    font-weight: 700;
    color: #101828;
    line-height: 1.2;
    margin: 0;
}

.book-author {
    font-size: 1.25rem;
    color: #667085;
    margin: 0.5rem 0 2rem;
}

.book-meta {
    display: flex;
    gap: 2.5rem;
    font-size: 1rem;
    color: #475467;
    padding: 1.5rem 0;
    border-top: 1px solid #EAECF0;
    border-bottom: 1px solid #EAECF0;
    margin-bottom: 2rem;
}

.book-meta span {
    font-weight: 500;
}

.synopsis-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    border-left: 4px solid #007BFF;
    padding-left: 1rem;
}

.book-synopsis p {
    line-height: 1.8;
    color: #475467;
    font-size: 1.1rem;
}

.actions {
    margin-top: 3rem;
}

.borrow-button {
    background: linear-gradient(to right, #007BFF, #0056b3);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 16px 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
}

.borrow-button:hover {
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
    transform: translateY(-3px);
}

.not-found,
.loading-spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    text-align: center;
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007BFF;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

.back-button {
    margin-top: 1.5rem;
    background: #007BFF;
    color: #fff;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.back-button:hover {
    background: #0056b3;
}


.actions {

    margin-top: 3rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}


.back-button-details {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: transparent;
    color: #020202;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.back-button-details:hover {
    border-color: #667085;
    background-color: #F9FAFB;
    color: #101828;
}


@media (max-width: 900px) {
    .actions {
        justify-content: center;
        flex-wrap: wrap;
    }
}


@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 900px) {
    .detail-container {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .detail-container::before {
        display: none;
    }

    .cover-wrapper {
        transform: translateY(0);
        width: 60%;
        margin: 0 auto 2rem;
        position: static;
    }

    .info-wrapper {
        padding-left: 0;
        text-align: center;
    }

    .book-meta {
        justify-content: center;
    }

    /* === GAYA UNTUK NOTIFICATION TOAST === */

    .notification-toast {
        position: fixed;
        top: 90px;
        /* Jarak dari atas */
        right: 2rem;
        z-index: 2000;
        width: 100%;
        max-width: 350px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        overflow: hidden;
        /* Penting untuk progress bar */
        border-left: 5px solid #2196F3;
        /* Warna default untuk 'info' */
    }

    /* Variasi warna berdasarkan tipe notifikasi */
    .notification-toast.is-success {
        border-left-color: #4CAF50;
        /* Hijau untuk sukses */
    }

    .notification-toast.is-error {
        border-left-color: #F44336;
        /* Merah untuk error */
    }

    .toast-content {
        padding: 1rem 1.5rem;
        flex-grow: 1;
    }

    .toast-message {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        color: #333;
        margin: 0;
    }

    .toast-close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #aaa;
        cursor: pointer;
        padding: 1rem;
        align-self: flex-start;
    }

    .toast-close-button:hover {
        color: #333;
    }

    /* Progress bar di bawah notifikasi */
    .toast-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background-color: #ddd;
        animation: progress-bar 5s linear forwards;
    }

    .notification-toast.is-success .toast-progress {
        background-color: #4CAF50;
    }

    .notification-toast.is-error .toast-progress {
        background-color: #F44336;
    }

    @keyframes progress-bar {
        from {
            width: 100%;
        }

        to {
            width: 0%;
        }
    }

    /* Animasi untuk kemunculan dan kepergian toast */
    .toast-fade-enter-active,
    .toast-fade-leave-active {
        transition: all 0.4s ease;
    }

    .toast-fade-enter-from,
    .toast-fade-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }



}
</style>