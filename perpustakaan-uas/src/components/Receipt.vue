<template>
  <div class="receipt-modal-overlay" @click.self="$emit('close')">
    <div class="receipt-ticket">
      
      <header class="ticket-header">
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#007BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span>PerpusKita</span>
        </div>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </header>

      <main class="ticket-body">
        <div class="success-message">
          <h2 class="title">Peminjaman Berhasil</h2>
          <p class="subtitle">Simpan bukti peminjaman ini dengan baik.</p>
        </div>

        <div class="book-info">
          <p class="book-title">{{ receipt.judul_buku }}</p>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Tanggal Pinjam</span>
            <span class="value">{{ formatDate(receipt.tanggal_pinjam) }}</span>
          </div>
          <div class="detail-item" style="margin-left: 60px;">
            <span class="label">Tanggal Kembali</span>
            <span class="value">{{ formatDate(receipt.tanggal_kembali) }}</span>
          </div>
          <div class="detail-item status-item">
            <span class="label">Status</span>
            <span class="value status-badge">{{ receipt.status }}</span>
          </div>
        </div>
      </main>

      <footer class="ticket-footer">
        <div class="qr-code">
          <img :src="qrCodeUrl" alt="QR Code Bukti Peminjaman">
        </div>
        <div class="receipt-id">
          <span>ID PEMINJAMAN</span>
          <strong>#{{ receipt.nomor_resi }}</strong>
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BorrowReceipt',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  computed: {
    
    qrCodeUrl() {
      const data = `Peminjaman PerpusKita - ID: ${this.receipt.nomor_resi}`;
      return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(data)}&bgcolor=ffffff`;
    }
  },
  methods: {
    
    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #007BFF;
  --text-dark: #2c3e50;
  --text-light: #7f8c8d;
  --bg-light: #f8f9fa;
  --border-color: #ecf0f1;
}

.receipt-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.receipt-ticket {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden; 
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f1f1f1;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-light);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s, color 0.2s;
}
.close-button:hover {
  background-color: #e74c3c;
  color: white;
}

.ticket-header {
  padding: 20px 25px;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: var(--primary-color);
}

.ticket-body {
  padding: 10px 25px 25px;
}

.success-message {
  text-align: center;
  margin-bottom: 25px;
}
.success-message .title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 4px;
}
.success-message .subtitle {
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
}

.book-info {
  background-color: var(--bg-light);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
}
.book-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--text-dark);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
.detail-item {
  display: flex;
  flex-direction: column;
}
.detail-item.status-item {
  grid-column: 1 / -1;  
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: center; 
  margin-top: 10px;      
}
.label {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 2px;
}
.value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
}
.status-badge {
  background-color: #E0F2F1;
  color: #00796B;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 13px;
}

.ticket-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  background-color: var(--bg-light);
  border-top: 2px dashed var(--border-color);
}

.qr-code img {
  display: block;
  width: 90px; 
  height: 90px;
}

.receipt-id {
  text-align: right;
}
.receipt-id span {
  display: block;
  font-size: 11px;
  color: var(--text-light);
  letter-spacing: 0.5px;
}
.receipt-id strong {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  color: var(--text-dark);
}
</style>