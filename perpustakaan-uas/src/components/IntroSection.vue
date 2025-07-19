<template>
  <section class="intro-section">
    <div class="intro-container">
      <div class="intro-image-wrapper anim-target">
        <img src="../assets/PerkenalanPerpus.png" alt="Interior Perpustakaan" class="intro-image">
      </div>
      
      <div class="intro-content">
        <h2 class="intro-title anim-target">Selamat Datang di PerpusKita</h2>
        <p class="intro-description anim-target">
          PerpusKita adalah pusat pengetahuan dan komunitas bagi para pecinta buku. Kami menyediakan ribuan koleksi, mulai dari fiksi populer hingga referensi akademis, dalam lingkungan yang nyaman dan modern.
        </p>
        <p class="intro-description anim-target">
          Tujuan kami adalah untuk menumbuhkan kecintaan membaca dan mendukung pembelajaran seumur hidup bagi semua kalangan.
        </p>
        <a href="/buku" class="intro-button anim-target">
          <span>Jelajahi buku</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IntroSection',
  mounted() {
    const options = { threshold: 0.3 }; 
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    
    this.$el.querySelectorAll('.anim-target').forEach(el => {
      observer.observe(el);
    });
  }
}
</script>