<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="['notification-toast', toastTypeClass]">
      <div class="toast-content">
        <p class="toast-message">{{ message }}</p>
      </div>
      <button @click="close" class="toast-close-button">&times;</button>
      <div class="toast-progress"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationToast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info' 
    },
    duration: {
      type: Number,
      default: 5000 // 5 detik
    }
  },
  data() {
    return {
      visible: false,
      timeout: null
    };
  },
  computed: {
    toastTypeClass() {
      return `is-${this.type}`;
    }
  },
  mounted() {
    this.visible = true;
    this.timeout = setTimeout(() => {
      this.close();
    }, this.duration);
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  methods: {
    close() {
      this.visible = false;
      
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    }
  }
}
</script>

<style scoped>

 

.notification-toast {
  position: fixed;
  top: 90px; 
  right: 2rem;
  z-index: 2000;
  width: 100%;
  max-width: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  overflow: hidden; 
  border-left: 5px solid #2196F3;
}


.notification-toast.is-success {
  border-left-color: #4CAF50;
}
.notification-toast.is-error {
  border-left-color: #F44336; 
}

.toast-content {
  padding: 1rem 1.5rem;
  flex-grow: 1;
}

.toast-message {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.toast-close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  padding: 1rem;
  align-self: flex-start;
}
.toast-close-button:hover {
  color: #333;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: #ddd;
  animation: progress-bar 5s linear forwards;
}

.notification-toast.is-success .toast-progress {
  background-color: #4CAF50;
}
.notification-toast.is-error .toast-progress {
  background-color: #F44336;
}

@keyframes progress-bar {
  from { width: 100%; }
  to { width: 0%; }
}


.toast-fade-enter-active, .toast-fade-leave-active {
  transition: all 0.4s ease;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}</style>