<script setup>
import { RouterView, useRoute } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <main class="app__content">

      <HeaderPublic v-if="!route.meta.hideHeader" />

      <RouterView />

    </main>

    <Footer v-if="!route.meta.hideHeader" />
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