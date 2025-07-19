<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">&times;</button>
      <h2 class="modal-title">Form Peminjaman</h2>
      <p class="modal-book-title">{{ bookTitle }}</p>

      <form @submit.prevent="submitBorrow">
        <div class="form-group">
          <label for="startDate" class="form-label">Tanggal Pinjam</label>
          <input type="date" id="startDate" v-model="startDate" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="endDate" class="form-label">Tanggal Kembali</label>
          <input type="date" id="endDate" v-model="endDate" class="form-input" required>
        </div>
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Memproses...' : 'Konfirmasi Pinjam' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BorrowModal',
  props: {
    bookTitle: { type: String, required: true },
    bookId: { type: Number, required: true }
  },
  created() {
    console.log('Modal menerima bookId:', this.bookId);
  },
  data() {
    return {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      isSubmitting: false,
    };
  },
  methods: {
    async submitBorrow() {
      console.log('Nilai this.bookId saat submit ditekan:', this.bookId);

      if (!this.endDate) {
        this.$emit('showNotification', {
          message: 'Silakan pilih tanggal kembali.',
          type: 'error'
        });
        return;
      }

      this.isSubmitting = true;

      const [yyyy, mm, dd] = this.startDate.split('-');
      const formattedStartDate = `${dd}-${mm}-${yyyy}`;

      const [yyyy2, mm2, dd2] = this.endDate.split('-');
      const formattedEndDate = `${dd2}-${mm2}-${yyyy2}`;

      try {
        const response = await axios.post(
          'http://localhost:5000/api/peminjaman',
          {
            buku_id: this.bookId,
            tanggal_pinjam: formattedStartDate,
            tanggal_kembali: formattedEndDate
          },
          { withCredentials: true }
        );

        console.log(formattedStartDate, formattedEndDate);

        this.$emit('showNotification', {
          message: response.data.msg,
          type: 'success'
        });

        this.$emit('borrowSuccess', response.data.data);

      } catch (error) {
        console.error('Gagal melakukan peminjaman:', error.response);

        this.$emit('showNotification', {
          message: error.response?.data?.msg || 'Terjadi kesalahan saat meminjam buku.',
          type: 'error'
        });

      } finally {
        this.isSubmitting = false;
      }
    }


  }
};
</script>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(16, 24, 40, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transform: scale(0.95);
  animation: popInModal 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f2f4f7;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #98a2b3;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-button:hover {
  background: #eaecf0;
  color: #101828;
  transform: rotate(90deg);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.modal-book-title {
  font-size: 1rem;
  color: #667085;
  margin-bottom: 2rem;
  text-align: center;
}

.modal-content .form-group {
  margin-bottom: 1.5rem;
}

.modal-content .form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.modal-content .form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.modal-content .form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes popInModal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>