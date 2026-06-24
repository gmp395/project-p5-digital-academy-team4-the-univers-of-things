<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'

const route = useRoute()

// Ocultamos elementos globales si la ruta tiene meta: { hideHeader: true, hideFooter: true }
const shouldHideHeader = computed(() => route.matched.some(record => record.meta.hideHeader))
const shouldHideFooter = computed(() => route.matched.some(record => record.meta.hideFooter))
</script>

<template>
  <div class="app">
    <HeaderPublic v-if="!shouldHideHeader" />

    <main class="app__content">
      <RouterView />
    </main>

    <Footer v-if="!shouldHideFooter" /> 
  </div>
</template>