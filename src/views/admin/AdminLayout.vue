<script setup>
import SidebarAdmin from '@/components/layout/SidebarAdmin.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="admin-layout">
    <SidebarAdmin />
    <div class="admin-layout__right">
      <main class="admin-layout__main">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #0f172a;

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 0;
  }

  &__main {
    flex: 1;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }
}
</style>