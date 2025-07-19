<script setup>
import { ref, reactive, onMounted } from 'vue';
import Modal from '../components/Modal.vue';

const API_URL = 'http://localhost:5000/api';
const returns = ref([]);
const peminjamanOptions = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const isModalOpen = ref(false);

const currentReturn = reactive({
  peminjaman_id: '',
  kondisi_buku: '',
});

const fetchReturns = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const response = await fetch(`${API_URL}/pengembalian`, { credentials: 'include' });
    const result = await response.json();
    if (!response.ok) throw new Error(result.msg || 'Gagal mengambil data pengembalian');

    returns.value = result.map(item => ({
      id_pengembalian: item.id_pengembalian,
      peminjaman_id: item.peminjaman_id,
      tanggal_kembali: item.tanggal_kembali,
      kondisi_buku: item.kondisi_buku || 'Baik',
      denda: item.denda || 0,
      User: {
        nama: item.peminjaman?.user?.nama || 'Unknown'
      },
      Buku: {
        judul: item.peminjaman?.buku?.judul || 'Unknown'
      },
      KartuPustaka: {
        nomor_resi: item.peminjaman?.kartu_pustaka?.nomor_resi || 'N/A'
      }
    }));
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

const fetchAvailablePeminjaman = async () => {
  try {
    const response = await fetch(`${API_URL}/peminjaman`, { credentials: 'include' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg || 'Gagal memuat data peminjaman');

    peminjamanOptions.value = data.filter(peminjaman => peminjaman.status === 'Dipinjam');
  } catch (error) {
    alert(error.message);
  }
};

const openAddModal = async () => {
  resetForm();
  await fetchAvailablePeminjaman();
  isModalOpen.value = true; 
};

const resetForm = () => {
  currentReturn.peminjaman_id = '';
  currentReturn.kondisi_buku = '';
};


const closeModal = () => {
  isModalOpen.value = false;
};

const saveReturn = async () => {
  if (!currentReturn.peminjaman_id || !currentReturn.kondisi_buku.trim()) {
    alert('Silakan pilih peminjaman dan isi kondisi buku.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/pengembalian`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(currentReturn)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.msg || 'Gagal menyimpan data');

    await fetchReturns();
    closeModal();
    alert(result.msg + (result.info_denda ? `\n${result.info_denda}` : ''));
  } catch (error) {
    alert('Gagal menyimpan: ' + error.message);
  }
};

const deleteReturn = async (id) => {
  if (!confirm('Yakin ingin menghapus data pengembalian ini?')) return;
  try {
    const response = await fetch(`${API_URL}/pengembalian/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.msg || 'Gagal menghapus');

    await fetchReturns();
    alert('Data berhasil dihapus.');
  } catch (error) {
    alert(error.message);
  }
};

function formatTanggal(tgl) {
  const d = new Date(tgl);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: '2-digit' });
}

onMounted(() => {
  fetchReturns();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Data Pengembalian</h1>
      <button @click="openAddModal" class="btn btn-primary">Tambah Pengembalian</button>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Peminjam</th>
            <th>Judul Buku</th>
            <th>Nomor Resi</th>
            <th>Tanggal Kembali</th>
            <th>Kondisi Buku</th>
            <th>Denda</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="8">Memuat data...</td>
          </tr>
          <tr v-else-if="returns.length === 0">
            <td colspan="8">Belum ada data pengembalian.</td>
          </tr>
          <tr v-for="item in returns" :key="item.id_pengembalian">
            <td>{{ item.id_pengembalian }}</td>
            <td>{{ item.User.nama }}</td>
            <td>{{ item.Buku.judul }}</td>
            <td>{{ item.KartuPustaka.nomor_resi }}</td>
            <td>{{ formatTanggal(item.tanggal_kembali) }}</td>
            <td>{{ item.kondisi_buku }}</td>
            <td>Rp {{ item.denda.toLocaleString('id-ID') }}</td>
            <td>
              <button @click="deleteReturn(item.id_pengembalian)" class="btn btn-danger">D</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :show="isModalOpen" @close="closeModal">
      <template #header>
        <h3>Tambah Pengembalian</h3>
      </template>
      <template #body>
        <div class="form-group">
          <label for="peminjaman_id">Pilih Peminjam</label>
          <select v-model="currentReturn.peminjaman_id" class="form-input" required>
            <option disabled value="">-- Pilih --</option>
            <option v-for="item in peminjamanOptions" :key="item.id_peminjaman" :value="item.id_peminjaman">
              {{ item.user.nama }} - {{ item.buku.judul }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="kondisi_buku">Kondisi Buku</label>
          <input type="text" id="kondisi_buku" v-model="currentReturn.kondisi_buku" class="form-input" required>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Batal</button>
        <button class="btn btn-primary" @click="saveReturn">Simpan</button>
      </template>
    </Modal>
  </div>
</template>