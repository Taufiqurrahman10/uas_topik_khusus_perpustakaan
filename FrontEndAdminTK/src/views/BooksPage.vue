<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import Modal from '../components/Modal.vue';

const API_URL = 'http://localhost:5000/api';

const books = ref([]);
const categories = ref([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedImageFiles = ref([]);


const formBook = ref(null);

const imagePreviews = computed(() => {
  if (!formBook.value) return [];

  if (selectedImageFiles.value.length > 0) {
    return selectedImageFiles.value.map(file => URL.createObjectURL(file));
  }
  if (isEditing.value && Array.isArray(formBook.value.images) && formBook.value.images.length > 0) {
    return formBook.value.images;
  }
  if (isEditing.value && typeof formBook.value.images === 'string' && formBook.value.images.startsWith('http')) {
      return [formBook.value.images];
  }
  return [];
});

const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/kategori`, { credentials: 'include' });
    if (!response.ok) throw new Error('Gagal mengambil data kategori');
    categories.value = await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    alert('Gagal memuat data kategori.');
  }
};

const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/buku`, { credentials: 'include' });
    if (!response.ok) {
        if (response.status === 404) {
            books.value = [];
            return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const dataFromApi = await response.json();
    
    books.value = dataFromApi.map(book => {
      let coverUrl = 'https://placehold.co/100x150/e2e8f0/667085?text=No+Image';

      if (Array.isArray(book.images) && book.images.length > 0) {
        coverUrl = book.images[0];
      } 
      else if (typeof book.images === 'string' && book.images.startsWith('http')) {
        coverUrl = book.images;
      }

      return {
        id: book.id_buku,
        title: book.judul,
        author: book.penulis,
        category: book.kategori?.nama_kategori || 'Tanpa Kategori',
        stok: book.stok,
        coverUrl: coverUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    alert(`Terjadi kesalahan saat memuat data buku: ${error.message}`);
    books.value = [];
  }
};

const saveBook = async () => {
  if (!formBook.value || !formBook.value.judul || !formBook.value.penulis || !formBook.value.penerbit || !formBook.value.kategori_id) {
    alert('Judul, Penulis, Penerbit, dan Kategori harus diisi');
    return;
  }

  const formData = new FormData();
  formData.append('judul', formBook.value.judul);
  formData.append('penulis', formBook.value.penulis);
  formData.append('penerbit', formBook.value.penerbit);
  formData.append('kategori_id', formBook.value.kategori_id);
  formData.append('tahun_terbit', formBook.value.tahun_terbit);
  formData.append('stok', formBook.value.stok);
  formData.append('sinopsis', formBook.value.sinopsis || '');
  
  if (selectedImageFiles.value.length > 0) {
    for (const file of selectedImageFiles.value) {
      formData.append('images', file); 
    }
  }

  try {
    const url = isEditing.value ? `${API_URL}/buku/${formBook.value.id_buku}` : `${API_URL}/buku`;
    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorResult = await response.json().catch(() => ({ msg: 'Gagal menyimpan data buku' }));
      throw new Error(errorResult.msg);
    }

    const result = await response.json();
    alert(result.msg || 'Buku berhasil disimpan');
    await fetchBooks();
    closeModal();
  } catch (error) {
    console.error('Error saving book:', error);
    alert(`Terjadi kesalahan: ${error.message}`);
  }
};

const deleteBook = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
  try {
    const response = await fetch(`${API_URL}/buku/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.msg || 'Gagal menghapus buku');
    }
    const result = await response.json();
    alert(result.msg || 'Buku berhasil dihapus.');
    await fetchBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
    alert(`Terjadi kesalahan saat menghapus: ${error.message}`);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  formBook.value = {
    id_buku: null,
    judul: '',
    penulis: '',
    penerbit: '',
    kategori_id: categories.value.length > 0 ? categories.value[0].id_kategori : null,
    stok: 0,
    tahun_terbit: new Date().getFullYear(),
    images: [],
    sinopsis: '',
  };
  selectedImageFiles.value = [];
  isModalOpen.value = true;
};

const openEditModal = async (book) => {
  isEditing.value = true;
  formBook.value = null; 
  isModalOpen.value = true;
  
  try {
    const response = await fetch(`${API_URL}/buku/${book.id}`, { credentials: 'include' });
    if (!response.ok) throw new Error('Gagal mengambil detail buku');
    
    formBook.value = await response.json();
    selectedImageFiles.value = [];

  } catch (error) {
    console.error('Error fetching book details:', error);
    alert(`Tidak dapat memuat data detail buku: ${error.message}`);
    closeModal();
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  formBook.value = null;
};

const handleImageUpload = (event) => {
  selectedImageFiles.value = Array.from(event.target.files || []);
};

onMounted(() => {
  fetchCategories();
  fetchBooks();
});
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Kelola Buku</h1>
      <button @click="openAddModal" class="btn btn-primary">Tambah Buku</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>ID</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="books.length === 0">
            <td colspan="7" class="text-center">Memuat data atau tidak ada data buku...</td>
          </tr>
          <tr v-for="book in books" :key="book.id">
            <td>
              <img :src="book.coverUrl" :alt="book.title" class="book-cover-thumbnail" 
                   onerror="this.onerror=null;this.src='https://placehold.co/100x150/e2e8f0/667085?text=Error';">
            </td>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.category }}</td>
            <td>{{ book.stok }}</td>
            <td class="action-buttons">
              <button @click.stop="openEditModal(book)" class="btn btn-secondary" title="Edit">E</button>
              <button @click="deleteBook(book.id)" class="btn btn-danger" title="Delete">D</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="isModalOpen && formBook" :show="isModalOpen" @close="closeModal">
      <template #header>
        <h3>{{ isEditing ? 'Edit Buku' : 'Tambah Buku Baru' }}</h3>
      </template>
      <template #body>
        <div class="form-group">
          <label for="judul">Judul</label>
          <input type="text" id="judul" v-model="formBook.judul" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="penulis">Penulis</label>
          <input type="text" id="penulis" v-model="formBook.penulis" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="penerbit">Penerbit</label>
          <input type="text" id="penerbit" v-model="formBook.penerbit" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="kategori">Kategori</label>
          <select id="kategori" v-model="formBook.kategori_id" class="form-input" required>
            <option :value="null" disabled>Pilih Kategori</option>
            <option v-for="category in categories" :key="category.id_kategori" :value="category.id_kategori">
              {{ category.nama_kategori }}
            </option>
          </select>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="tahun_terbit">Tahun Terbit</label>
            <input type="number" id="tahun_terbit" v-model.number="formBook.tahun_terbit" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="stok">Stok</label>
            <input type="number" id="stok" v-model.number="formBook.stok" class="form-input" required>
          </div>
        </div>

        <div class="form-group">
          <label for="images">Unggah Gambar Sampul</label>
          <input type="file" id="images" @change="handleImageUpload" class="form-input" accept="image/*" multiple>
          <div v-if="imagePreviews.length > 0" class="image-preview-container">
            <div v-for="(src, index) in imagePreviews" :key="index" class="image-preview">
                <img :src="src" class="preview-image" alt="Pratinjau Sampul">
            </div>
          </div>
          <p class="image-info" v-if="isEditing && selectedImageFiles.length > 0">
              Gambar baru akan menggantikan semua gambar lama.
          </p>
        </div>
        <div class="form-group">
          <label for="sinopsis">Sinopsis</label>
          <textarea id="sinopsis" v-model="formBook.sinopsis" class="form-input" rows="4"></textarea>
        </div>
      </template>
      <template #footer>
        <button @click="closeModal" class="btn btn-secondary">Batal</button>
        <button @click="saveBook" class="btn btn-primary">Simpan</button>
      </template>
    </Modal>
  </div>
</template>