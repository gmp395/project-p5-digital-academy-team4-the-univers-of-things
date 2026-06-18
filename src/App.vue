<script setup>
import { RouterView } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app">
    <main class="app__content">
      <HeaderPublic />
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__content {
  flex: 1;
}
</style>