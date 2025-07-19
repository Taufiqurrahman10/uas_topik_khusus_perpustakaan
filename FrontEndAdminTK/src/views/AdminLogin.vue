<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const API_URL = 'http://localhost:5000/api';

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.msg || 'Login gagal. Periksa kembali email dan password Anda.');
    }

    if (result.user && result.user.role === 'admin' || 'Admin') {
      localStorage.setItem('userData', JSON.stringify(result.user));
      localStorage.setItem('userToken', 'true');
      
      router.push('/dashboard');
    } else {
      throw new Error('Akses ditolak. Akun ini bukan admin.');
    }

  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-visual">
      <div class="visual-content">
        <h2>PerpusKita - Admin Panel</h2>
        <p>Area khusus untuk manajemen dan administrasi sistem perpustakaan.</p>
      </div>
    </div>

    <div class="login-form-wrapper">
      <div class="login-form">
        <h1 class="form-title">Admin Login</h1>
        <p class="form-subtitle">Silakan masuk untuk mengakses dashboard.</p>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              class="form-input" 
              placeholder="admin@email.com" 
              required 
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              class="form-input" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" class="form-button">Login</button>
        </form>

      </div>
    </div>
  </div>
</template>
