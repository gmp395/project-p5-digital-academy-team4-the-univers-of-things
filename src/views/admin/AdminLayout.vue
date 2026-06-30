<template>
  <div class="grid grid-cols-[256px_1fr] min-h-screen">
    
    <aside class="border-r border-slate-800 bg-surface-light">
      <SidebarAdmin />
    </aside>

    <div class="flex flex-col min-w-0">
      <main class="flex-1 p-8">
        <router-view />
      </main>

      <Footer />
    </div>
    
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/layout/SidebarAdmin.vue'
import Footer from '@/components/Footer.vue'
</script>