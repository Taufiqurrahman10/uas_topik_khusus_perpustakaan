<template>
  <header class="app-header" :class="[
    { 'scrolled-header': isScrolled },
    { 'not-home': isNotHome }
  ]">
    <div class="header-container">
      <div class="logo">
        <img src="https://vuejs.org/images/logo.png" alt="Logo Perpustakaan" />
        <span class="logo-text">PerpusKita</span>
      </div>

      <nav class="main-nav">
        <router-link to="/" class="nav-link" :class="{ active: isHome }">Beranda</router-link>
        <router-link to="/buku" class="nav-link" :class="{ active: isBooks }">Buku</router-link>
        <router-link to="/tentang" class="nav-link" :class="{ active: isTentang }">Tentang</router-link>
      </nav>

      <div class="header-actions">

        <router-link v-if="!isLoggedIn" to="/login" class="login-link">Login</router-link>


        <div v-else class="profile-dropdown" ref="profileDropdown">
          <button class="avatar-button" @click="toggleDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="username">{{ userName }}</span>
            <svg :class="{ 'arrow-up': isDropdownOpen }" class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m6 9l6 6l6-6" />
            </svg>
          </button>

          <transition name="dropdown-fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <div class="dropdown-header">
                <span class="greeting">Halo,</span>
                <span class="dropdown-username">{{ userName }}</span>
              </div>
              <button @click="goToRiwayat" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span>Lihat</span>
              </button>

              <button @click="handleLogout" class="logout-button dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
      isLoggedIn: false,
      userName: '',
      isDropdownOpen: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
    };
  },
  computed: {
    isNotHome() {
      return this.$route.path !== '/';
    },
    isHome() {
      return this.$route.path === '/';
    },
    isBooks() {
      return this.$route.path.startsWith('/buku');
    },
    isTentang() {
      return this.$route.path.startsWith('/tentang');
    },
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
    checkLoginStatus() {
      axios.get('http://localhost:5000/api/profile', {
        withCredentials: true
      })
        .then(res => {
          this.isLoggedIn = true;
          this.userName = res.data.user.nama;
        })
        .catch(err => {
          console.log('[Header] Tidak login:', err.response?.data);
          this.isLoggedIn = false;
          this.userName = '';
        });
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdownOnClickOutside(event) {
      if (this.$refs.profileDropdown && !this.$refs.profileDropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },

     goToRiwayat() {
    this.$router.push('/riwayat');
  },
    async handleLogout() {
      try {
        await axios.delete('http://localhost:5000/api/user/logout', {
          withCredentials: true
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');

        this.isLoggedIn = false;
        this.userName = '';
        this.isDropdownOpen = false;


        this.toastType = 'success';
        this.toastMessage = 'Anda telah berhasil logout.';
        this.showToast = true;


        this.$router.push('/');

      } catch (error) {
        console.error('Logout gagal:', error);

        this.toastType = 'error';
        this.toastMessage = 'Logout gagal. Silakan coba lagi.';
        this.showToast = true;
      }
    },


  },
  watch: {
    $route() {
      this.checkLoginStatus();
      this.isDropdownOpen = false;
    },
  },
  mounted() {
    this.checkLoginStatus();
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.closeDropdownOnClickOutside);

    window.addEventListener('login-success', this.checkLoginStatus);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.closeDropdownOnClickOutside);

    window.removeEventListener('login-success', this.checkLoginStatus);
  },
};
</script>

<style scoped>.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  width: 240px;
  padding: 8px;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 4px; 
  z-index: 100;
}


.dropdown-header {
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}
.greeting {
  font-size: 14px;
  color: #666;
}
.dropdown-username {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}


.dropdown-item {
  
  display: flex;
  align-items: center;
  gap: 12px; 
  
  
  width: 100%;
  padding: 10px 12px;
  
  
  background-color: transparent;
  border: none;
  border-radius: 8px; 
  color: #333;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  

  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}


.dropdown-item svg {
  color: #555;
  flex-shrink: 0; 
}


.logout-button:hover {
  background-color: #fff1f1; 
  color: #e53e3e;
}

.logout-button:hover svg {
  color: #e53e3e; 
}


.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}</style>