<script setup>
import { ref, onMounted, reactive } from 'vue';
import Modal from '../components/Modal.vue';

const API_URL = 'http://localhost:5000/api';
const loans = ref([]);
const users = ref([]);
const books = ref([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const currentLoan = reactive({
  id_peminjaman: null,
  user_id: null,
  buku_id: null,
  kartu_pustaka_id: null,
  tanggal_pinjam: new Date().toISOString().split('T')[0],
  tanggal_kembali: '',
  status: 'Dipinjam',
});

const fetchLoans = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const response = await fetch(`${API_URL}/peminjaman`, {
      credentials: 'include' 
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.msg || 'Gagal mengambil data peminjaman');
    }

     const formattedLoans = result.map(loan => ({
      id_peminjaman: loan.id_peminjaman,
      user_id: loan.user_id || 'N/A',
      buku_id: loan.buku_id || 'N/A',
      User: {
        email: loan.user?.email?.split('@')[0] || 'Unknown',
        nama: loan.user?.nama || loan.user?.email?.split('@')[0] || 'Unknown',
      },
      Buku: {
        judul: loan.buku?.judul || 'Unknown',
      },
      KartuPustaka: {
        nomor_resi: loan.kartu_pustaka?.nomor_resi || 'N/A',
      },

      tanggal_pinjam: loan.tanggal_pinjam,
      tanggal_kembali: loan.tanggal_kembali,
      status: loan.status || 'Unknown',
    }));


    loans.value = formattedLoans;
  } catch (error) {
    console.error('Error fetching loans:', error);
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchLoans();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Kelola Peminjaman</h1>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Peminjam</th>
            <th>Judul Buku</th>
            <th>Nomor Resi</th>
            <th>Tgl Pinjam</th>
            <th>Tgl Kembali</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loans.length === 0">
            <td colspan="8" class="text-center">Memuat data atau tidak ada data...</td>
          </tr>
          <tr v-for="loan in loans" :key="loan.id_peminjaman">
            <td>{{ loan.id_peminjaman }}</td>
            <td>{{ loan.User?.nama || 'N/A' }}</td>
            <td>{{ loan.Buku?.judul || 'N/A' }}</td>
            <td>{{ loan.KartuPustaka?.nomor_resi || 'N/A' }}</td>
            <td>{{ loan.tanggal_pinjam }}</td>  
            <td>{{ loan.tanggal_kembali || '-' }}</td>
            <td>
              <span :class="['status-badge', loan.status.toLowerCase()]">{{ loan.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
