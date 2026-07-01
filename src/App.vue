<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const shouldHideHeader = computed(() => route.matched.some(record => record.meta.hideHeader))
const shouldHideFooter = computed(() => route.matched.some(record => record.meta.hideFooter))
</script>

<template>
  <div class="app" :class="{ 'app--public': !shouldHideHeader }">
    <HeaderPublic v-if="!shouldHideHeader" />
    <RouterView />
    <Footer v-if="!shouldHideFooter" />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}
</style>