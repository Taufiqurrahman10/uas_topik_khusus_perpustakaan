<template>
  <section class="book-catalog">
    <h2 class="section-title">Buku Terpopuler Saat Ini</h2>

    <div class="book-grid">
      <router-link 
        v-for="(book, index) in books" 
        :key="book.id" 
        :to="'/buku/' + book.id" 
        class="book-card-link"
        :style="{ 'animation-delay': (index * 100) + 'ms' }"
      >
        <div class="book-card">
          <div class="card-image-container">
            <img :src="book.cover" :alt="book.title" class="book-cover" />
            <div class="image-overlay">
              <span class="overlay-button">Lihat Detail</span>
            </div>
          </div>
          <div class="card-content">
            <span class="book-item-category">{{ book.category }}</span>
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookCatalog',
  data() {
    return {
      observer: null,
      books: []
    };
  },
  mounted() {
    axios.get('http://localhost:5000/api/buku/latest')
      .then(response => {
        this.books = response.data.map(buku => ({
          id: buku.id || buku.id_buku,
          title: buku.title || buku.judul,
          author: buku.author || buku.penulis,
          category: buku.category || buku.Kategori?.nama_kategori,
          cover: buku.cover || buku.images
        }));

        this.$nextTick(() => {
          const options = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
          };

          this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('is-visible');
                this.observer.unobserve(entry.target);
              }
            });
          }, options);

          const cards = this.$el.querySelectorAll('.book-card-link');
          if (cards.length > 0) {
            cards.forEach(card => {
              this.observer.observe(card);
            });
          }
        });
      })
      .catch(error => {
        console.error("Gagal mengambil data buku:", error);
      });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
</script>
