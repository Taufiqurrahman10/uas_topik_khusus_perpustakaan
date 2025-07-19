<script setup>
import AppHeader from '../components/AppHeader.vue';
import SideBar from '../components/SideBar.vue';
</script>

<template>
  <div class="app-layout">
    <SideBar />
    <div class="main-content-wrapper">
      <AppHeader />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
