<template>
  <div class="browse-page">
    <aside class="sidebar-filters">
      <div class="filter-group">
        <h3 class="filter-title">Cari Buku</h3>
        <input type="text" v-model="searchQuery" placeholder="Judul, penulis..." class="sidebar-search-input" />
      </div>
      <div class="filter-group">
        <h3 class="filter-title">Kategori</h3>
        <ul class="sidebar-category-list">
          <li v-for="category in categories" :key="category.value">
            <button @click="selectedCategory = category.value" :class="{ active: selectedCategory === category.value }"
              class="sidebar-category-button">
              {{ category.text }}
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <main class="main-collection">
      <div class="page-header">
        <h1 class="page-title" style="text-align: center;">Koleksi Buku</h1>
        <!-- <p class="page-subtitle">Menampilkan {{ filteredBooks.length }} buku</p> -->
      </div>

      <transition-group name="book-list" tag="div" class="book-display-grid">
        <router-link v-for="book in paginatedBooks" :key="book.id" :to="'/buku/' + book.id" class="book-item">
          <div class="book-item-card">
            <img :src="book.cover" :alt="book.title" class="book-item-cover" />
            <div class="book-item-content">
              <span class="book-item-category">{{ book.category }}</span>
              <h4 class="book-item-title">{{ book.title }}</h4>
              <p class="book-item-author">oleh {{ book.author }}</p>
            </div>
          </div>
        </router-link>
      </transition-group>

      <div v-if="filteredBooks.length === 0" class="no-results">
        <p>Maaf, tidak ada buku yang cocok dengan kriteria Anda.</p>
      </div>


      <div v-if="totalPages > 1" class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button nav-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Sebelumnya</span>
        </button>

        <div class="page-numbers">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
            :class="{ active: currentPage === page }" class="pagination-button page-number">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button nav-button">
          <span>Selanjutnya</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

    </main>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'AllBooks',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      itemsPerPage: 8,
      currentPage: 1,
      categories: [], // Dikosongkan untuk diisi dari API
      allBooks: []
    };
  },
  mounted() {
    // --- MENGAMBIL DATA BUKU ---
    axios.get('http://localhost:5000/api/buku')
      .then(response => {
        // Mengubah format data buku dari API agar sesuai dengan template
        this.allBooks = response.data.map(buku => ({
          id: buku.id_buku,
          title: buku.judul,
          author: buku.penulis,
          category: buku.kategori ? buku.kategori.nama_kategori : 'Tanpa Kategori',
          // Mengambil gambar pertama dari array 'images'
          cover: Array.isArray(buku.images) && buku.images.length > 0 ? buku.images[0] : '/placeholder.jpg'
        }));
      })
      .catch(error => {
        console.error('Gagal mengambil data buku:', error);
      });

    // --- MENGAMBIL DATA KATEGORI (DINAMIS) ---
    axios.get('http://localhost:5000/api/kategori')
      .then(response => {
        // Mengubah format data kategori dari API
        const fetchedCategories = response.data.map(kategori => ({
          text: kategori.nama_kategori,
          value: kategori.nama_kategori // Value tetap nama untuk dicocokkan dengan data buku
        }));
        
        // Menambahkan opsi "Semua" di awal array
        this.categories = [{ text: 'Semua', value: 'all' }, ...fetchedCategories];
      })
      .catch(error => {
        console.error('Gagal mengambil data kategori:', error);
      });
  },
  computed: {
    filteredBooks() {
      if (!this.allBooks) return [];
      let books = this.allBooks;

      // Filter berdasarkan kategori yang dipilih
      if (this.selectedCategory !== 'all') {
        books = books.filter(book => book.category.toLowerCase() === this.selectedCategory.toLowerCase());
      }

      // Filter berdasarkan query pencarian
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        books = books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      }

      return books;
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    }
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        window.scrollTo(0, 0);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    }
  },
  watch: {
    // Reset ke halaman 1 setiap kali filter berubah
    selectedCategory() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    }
  }
};
</script>