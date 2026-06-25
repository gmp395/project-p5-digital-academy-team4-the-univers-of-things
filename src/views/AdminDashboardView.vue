<template>
  <div class="flex min-h-screen bg-surface-dark">
    <SidebarAdmin />

    <main class="flex-1 md:ml-64 p-6 md:p-8">
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-6">
        Panel de administración
      </h1>

      <!-- Aquí se mostrará el contenido según la sección seleccionada -->
      <div class="text-on-surface-variant">
        Vista en construcción
      </div>
    </main>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/layout/SidebarAdmin.vue'
</script>