<template>
  <div class="about-page">
    <section class="about-library">
      <div class="about-container">
        <div class="about-content anim-target">
          <h1 class="about-title">Cerita Kami: Membawa Dunia Literasi Lebih Dekat</h1>
          <p class="about-description">
            PerpusKita didirikan pada tahun 2025 dengan sebuah mimpi sederhana: menciptakan sebuah ruang di mana pengetahuan dapat diakses oleh semua orang tanpa batas. Kami percaya bahwa setiap buku adalah jendela menuju dunia baru, dan tugas kami adalah membuka jendela tersebut selebar-lebarnya untuk Anda.
          </p>
          <p class="about-description">
            Dengan koleksi yang terus bertambah dan fasilitas yang modern, kami berkomitmen untuk menjadi mitra setia Anda dalam perjalanan belajar, berimajinasi, dan berkembang.
          </p>
        </div>
        <div class="about-image-wrapper anim-target">
          <img src="../assets/aboutpage.png" alt="Interior Perpustakaan" class="about-image">
        </div>
      </div>
    </section>

    <section class="team-section">
      <div class="team-container">
        <h2 class="section-title anim-target">Kelompok 1</h2>
        <div class="team-grid">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="member.id" 
            class="team-member-card anim-target"
            :style="{ 'transition-delay': (index * 100) + 'ms' }"
          >
            <div class="card-header-bg"></div>
            <img :src="member.photo" :alt="member.name" class="team-member-photo">
            <div class="card-body">
              <h3 class="team-member-name">{{ member.name }}</h3>
              <p class="team-member-role">{{ member.role }}</p>
              <p class="team-member-id">{{ member.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      observer: null,
      teamMembers: [
        { id: '2211083010', name: 'Deni Ramdhan', role: 'Frontend Developer', photo: require('../assets/deni.jpg') },
        { id: '2211083024', name: 'Dzaky Rahmat Nurwahid', role: 'Team Leader', photo: require('../assets/jakun.jpg') },
        { id: '2211081006', name: 'Cindy Steffani', role: 'Backend Developer', photo: require('../assets/cindi.jpg') },
        { id: '2211083026', name: 'Geraldo Afrinandi Persada', role: 'Frontend Developer', photo: require('../assets/geraldo2.jpg') },
        { id: '2211081029', name: 'Taufiqurrahman', role: 'Backend Developer', photo: require('../assets/taufiq.jpg') }
      ]
    };
  },
  mounted() {
    const options = { threshold: 0.2 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    const targets = this.$el.querySelectorAll('.anim-target');
    targets.forEach(target => {
      this.observer.observe(target);
    });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
</script>