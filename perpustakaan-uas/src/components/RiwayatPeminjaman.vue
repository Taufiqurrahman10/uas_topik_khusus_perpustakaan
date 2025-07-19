<template>
    <div class="riwayat-container">
        <div v-if="isLoading" class="loading-state">
            <div class="spinner"></div>
            <p>Memuat riwayat...</p>
        </div>

        <div v-else-if="riwayat.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                stroke="#bdc3c7" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <h2>Riwayat Kosong</h2>
            <p>Anda belum pernah melakukan peminjaman buku.</p>
        </div>

        <div v-else class="riwayat-list">
            <div v-for="item in riwayat" :key="item.kartu_pustaka?.nomor_resi" class="riwayat-card">

                <div class="card-cover">
                    <img :src="item.buku?.images || ''" alt="Cover Buku" />
                </div>

                <div class="card-details">
                    <span :class="['status-badge', getStatusClass(item.status)]">{{ item.status }}</span>
                    <h3 class="book-title">{{ item.buku?.judul || '-' }}</h3>
                    <p class="book-author">oleh {{ item.buku?.penulis || '-' }}</p>

                    <div class="date-info">
                        <div>
                            <small>Tgl. Pinjam</small>
                            <strong>{{ formatDate(item.tanggal_pinjam) }}</strong>
                        </div>
                        <div>
                            <small>Tgl. Kembali</small>
                            <strong>{{ formatDate(item.tanggal_kembali) }}</strong>
                        </div>
                    </div>

                    <button class="receipt-button" @click="tampilkanResi(item)">
                        Lihat Resi
                    </button>
                </div>
            </div>
        </div>

        <BorrowReceipt v-if="showReceipt" :receipt="receiptData" @close="showReceipt = false" />
    </div>
</template>

<script>
import axios from 'axios';
import BorrowReceipt from '@/components/Receipt.vue';

export default {
  name: 'RiwayatPeminjaman',
  components: { BorrowReceipt },
  data() {
    return {
      riwayat: [],
      isLoading: true,
      showReceipt: false,
      receiptData: null,
    };
  },
  created() {
    this.fetchRiwayat();
  },
  methods: {
    async fetchRiwayat() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:5000/api/peminjaman/riwayat-saya', {
        //Untuk mengirimkan cookies
        withCredentials: true
});
        console.log("Hasil response:", response.data);

        if (Array.isArray(response.data)) {
          this.riwayat = response.data;
        } else {
          this.riwayat = [];
        }
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
        this.riwayat = [];
      } finally {
        this.isLoading = false;
      }
    },

   tampilkanResi(item) {
  console.log("Item:", item);
  this.receiptData = {
    judul_buku: item.buku?.judul || '-',
    nomor_resi: item.kartu_pustaka?.nomor_resi || '-',
    tanggal_pinjam: item.tanggal_pinjam,
    tanggal_kembali: item.tanggal_kembali,
    status: item.status,
  };
  this.showReceipt = true;
},


    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    getStatusClass(status) {
      if (!status) return 'default';
      const s = status.toLowerCase();
      if (s === 'dipinjam') return 'borrowed';
      if (s === 'dikembalikan') return 'returned';
      return 'default';
    },
  },
};
</script>


<style scoped>
.riwayat-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    padding-top: 100px;
    font-family: 'Poppins', sans-serif;
}

.riwayat-header {
    text-align: center;
    margin-bottom: 40px;
}

.riwayat-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
}

.riwayat-header p {
    font-size: 1.1rem;
    color: #7f8c8d;
}

.riwayat-list {
    display: grid;
    gap: 25px;
}

.riwayat-card {
    display: flex;
    gap: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.riwayat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-cover img {
    width: 100px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f0f0f0;
}

.card-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.status-badge {
    align-self: flex-start;
    padding: 4px 20px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: white;

}

.status-badge.borrowed {
    background-color: #3498db;
    /* Biru */
}

.status-badge.returned {
    background-color: #2ecc71;
    /* Hijau */
}

.book-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #2c3e50;
}

.book-author {
    font-size: 0.9rem;
    color: #95a5a6;
    margin: 4px 0 15px;
}

.date-info {
    display: flex;
    gap: 30px;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #ecf0f1;
}

.date-info div {
    display: flex;
    flex-direction: column;
}

.date-info small {
    font-size: 0.8rem;
    color: #7f8c8d;
}

.date-info strong {
    font-size: 0.9rem;
    color: #34495e;
}

.receipt-button {
    margin-left: auto;
    margin-top: auto;
    align-self: flex-end;
    /* Memastikan tombol ada di bawah kanan */
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.receipt-button:hover {
    background-color: #2980b9;
}

/* Loading dan Empty State */
.loading-state,
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #7f8c8d;
}

.empty-state h2 {
    color: #34495e;
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>