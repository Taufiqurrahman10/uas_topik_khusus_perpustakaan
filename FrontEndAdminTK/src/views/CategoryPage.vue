<script setup>
import { ref, onMounted } from 'vue';
import Modal from '../components/Modal.vue';

const API_URL = 'http://localhost:5000/api';

const categories = ref([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const formCategory = ref(null);

const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/kategori`, { credentials: 'include' });
    if (!response.ok) {
        if (response.status === 404) {
            categories.value = [];
            return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    categories.value = await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    alert(`Terjadi kesalahan saat memuat data kategori: ${error.message}`);
    categories.value = [];
  }
};

const saveCategory = async () => {
  if (!formCategory.value || !formCategory.value.nama_kategori) {
    alert('Nama Kategori wajib diisi.');
    return;
  }

  try {
    const url = isEditing.value
      ? `${API_URL}/kategori/${formCategory.value.id_kategori}`
      : `${API_URL}/kategori`;
    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_kategori: formCategory.value.nama_kategori,
        deskripsi: formCategory.value.deskripsi,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({ msg: 'Gagal menyimpan data kategori' }));
      throw new Error(errorResult.msg);
    }

    const result = await response.json();
    alert(result.msg || 'Kategori berhasil disimpan.');
    await fetchCategories();
    closeModal();
  } catch (error) {
    console.error('Error saving category:', error);
    alert(`Terjadi kesalahan saat menyimpan: ${error.message}`);
  }
};

const deleteCategory = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;

  try {
    const response = await fetch(`${API_URL}/kategori/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.msg || 'Gagal menghapus kategori');
    }

    const result = await response.json();
    alert(result.msg || 'Kategori berhasil dihapus.');
    await fetchCategories();
  } catch (error) {
    console.error('Error deleting category:', error);
    alert(`Terjadi kesalahan saat menghapus: ${error.message}`);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  formCategory.value = {
    id_kategori: null,
    nama_kategori: '',
    deskripsi: '',
  };
  isModalOpen.value = true;
};

const openEditModal = (category) => {
  isEditing.value = true;
  formCategory.value = { ...category };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  formCategory.value = null;
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Kelola Kategori</h1>
      <button @click="openAddModal" class="btn btn-primary">Tambah Kategori</button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Kategori</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categories.length === 0">
            <td colspan="4" class="text-center">Memuat data atau tidak ada data kategori...</td>
          </tr>
          <tr v-for="category in categories" :key="category.id_kategori">
            <td>{{ category.id_kategori }}</td>
            <td>{{ category.nama_kategori }}</td>
            <td>{{ category.deskripsi || '-' }}</td>
            <td class="action-buttons">
              <button @click.stop="openEditModal(category)" class="btn btn-secondary" title="Edit">E</button>
              <button @click="deleteCategory(category.id_kategori)" class="btn btn-danger" title="Delete">D</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="isModalOpen && formCategory" :show="isModalOpen" @close="closeModal">
      <template #header>
        <h3>{{ isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru' }}</h3>
      </template>
      <template #body>
        <div class="form-group">
          <label for="nama_kategori">Nama Kategori</label>
          <input type="text" id="nama_kategori" v-model="formCategory.nama_kategori" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="deskripsi">Deskripsi</label>
          <textarea id="deskripsi" v-model="formCategory.deskripsi" class="form-input" rows="4"></textarea>
        </div>
      </template>
      <template #footer>
        <button @click="closeModal" class="btn btn-secondary">Batal</button>
        <button @click="saveCategory" class="btn btn-primary">Simpan</button>
      </template>
    </Modal>
  </div>
</template>