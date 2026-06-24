<script setup>
import { RouterView, useRoute } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="app" :class="{ 'app--public': !route.meta.hideHeader }">
    <HeaderPublic v-if="!route.meta.hideHeader" />

    <RouterView />

    <Footer v-if="!route.meta.hideHeader" />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}

</style>