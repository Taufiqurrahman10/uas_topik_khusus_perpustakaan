<template>
  <div class="login-page">
    <div class="login-visual">
      <div class="visual-content">
        <h2>PerpusKita</h2>
        <p>Gerbang Anda menuju ribuan cerita dan pengetahuan tak terbatas.</p>
      </div>
    </div>

    <div class="login-form-wrapper">
      <div class="login-form">
        <h1 class="form-title">Selamat Datang Kembali</h1>
        <p class="form-subtitle">Silakan masuk untuk melanjutkan.</p>

        <form @submit.prevent="handleLogin">
          <NotificationToast v-if="showToast" :message="toastMessage" :type="toastType" @close="showToast = false" />

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" placeholder="contoh@email.com" required>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" placeholder="••••••••" required>
          </div>
          <div class="form-options">
            <a href="#" class="forgot-password">Lupa password?</a>
          </div>
          <button type="submit" class="form-button">Login</button>
        </form>

        <p class="signup-link">
          Belum punya akun? <router-link to="/register">Daftar di sini</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NotificationToast from '@/components/NotificationToast.vue';

export default {
  name: 'LoginPage',
  components: {
    NotificationToast
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';
      try {
        
        const response = await axios.post('http://localhost:5000/api/user/login', {
          email: this.email,
          password: this.password
        }, {
           withCredentials: true
        });
        console.log('Login berhasil:', response.data);

        if (response.data.user) {
        localStorage.setItem('userName', response.data.user.nama);
        
        // localStorage.setItem('accessToken', response.data.accessToken);
        window.dispatchEvent(new Event('login-success'));
      }


        this.toastMessage = 'Login Berhasil!';
        this.toastType = 'success';
        this.showToast = true;



        setTimeout(() => {
          this.$router.push('/buku');
        }, 1200);

      } catch (error) {

        console.error('Login gagal:', error.response.data);

        this.toastMessage = error.response.data.msg || 'Terjadi kesalahan. Silakan coba lagi.';
        this.toastType = 'error';
        this.showToast = true;

      }
    }
  }
}
</script>