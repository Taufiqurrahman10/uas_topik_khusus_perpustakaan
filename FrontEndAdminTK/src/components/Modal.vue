<script setup>
defineProps({
  show: Boolean,
});
const emit = defineEmits(['close']);
</script>

<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-backdrop" @click.self="emit('close')" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-label="Modal Window">
        <header class="modal-header">
          <slot name="header">Default Header</slot>
          <button type="button" class="btn-close" @click="emit('close')" aria-label="Close Modal">×</button>
        </header>

        <section class="modal-body">
          <slot name="body">Default body</slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>