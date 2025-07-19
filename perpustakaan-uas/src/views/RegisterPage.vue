<template>
  <div class="auth-page">
    <div class="auth-visual">
      <div class="visual-content">
        <h2>PerpusKita</h2>
        <p>Bergabunglah dengan komunitas pembaca terbesar dan mulai petualangan literasi Anda.</p>
      </div>
    </div>

    <div class="auth-form-wrapper">
      <div class="auth-form">
        <h1 class="form-title">Buat Akun Baru</h1>
        <p class="form-subtitle">Mulai perjalanan literasi Anda bersama kami.</p>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="fullName" class="form-label">Nama Lengkap</label>
            <input type="text" id="fullName" v-model="fullName" class="form-input" placeholder="Nama lengkap Anda"
              required>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" placeholder="contoh@email.com" required>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" placeholder="Minimal 8 karakter"
              required>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input"
              placeholder="Ulangi password" required>
          </div>

          <button type="submit" class="form-button">Buat Akun</button>
        </form>

        <p class="switch-page-link">
          Sudah punya akun? <router-link to="/login">Masuk di sini</router-link>
        </p>
      </div>
    </div>
    <NotificationToast v-if="showToast" :message="toastMessage" :type="toastType" :duration="5000"
      @close="showToast = false" />
  </div>
</template>

<script>
import axios from 'axios';
import NotificationToast from '@/components/NotificationToast.vue';
export default {
  name: 'RegisterPage',
  components: { NotificationToast },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success',
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Password dan Konfirmasi Password tidak cocok!');
        return;
      }

      if (this.password.length < 8) {
        alert('Password minimal 8 karakter!');
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/user/register', {
          nama: this.fullName,
          email: this.email,
          password: this.password,
          role_id: 2,
        });

        this.showNotification('Registrasi berhasil!', 'success');


        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);

      } catch (error) {
        this.showNotification('Registrasi gagal! ' + error.response?.data?.msg, 'error');
      }
    },
    showNotification(msg, type = 'info') {
      this.toastMessage = msg;
      this.toastType = type;
      this.showToast = true;
    },
  },
};
</script>
