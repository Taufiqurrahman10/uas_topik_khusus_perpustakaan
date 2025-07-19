<template>
  <main class="main-content">
    <HeroSection />
    
    <IntroSection />

    <BookCatalog />

  </main>
</template>

<script>

import HeroSection from '@/components/HeroSection.vue'
import IntroSection from '@/components/IntroSection.vue';
import BookCatalog from '@/components/BookCatalog.vue';


export default {
  name: 'HomePage',
  
  components: {
    HeroSection,
    IntroSection,
    BookCatalog
  },
  
};
</script>