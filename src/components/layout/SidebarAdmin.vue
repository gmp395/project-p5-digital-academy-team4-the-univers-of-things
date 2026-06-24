<template>
  <aside
    class="fixed left-0 top-0 h-full w-64 bg-surface-light border-r glass-stroke flex flex-col py-8 z-50 hidden md:flex">
    <div class="px-6 mb-10">
      <div class="px-6 mb-4 mt-6 flex justify-center">
  <span class="material-symbols-outlined !text-6xl text-primary">
    movie_filter
  </span>
</div>
</div>
 
    <!-- Navegación -->
    <nav class="flex-1 space-y-0.5">

  <RouterLink
    to="/"
    class="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-surface-variant hover:text-on-surface transition-colors duration-300"
  >
    <span class="material-symbols-outlined text-[20px]">house</span>
    <span class="font-label-lg text-label-lg">Home</span>
  </RouterLink>

  <RouterLink
    to="/admin"
    class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
    active-class="bg-primary/10 text-primary border-l-4 border-primary"
    exact-active-class="bg-primary/10 text-primary border-l-4 border-primary"
  >
    <span class="material-symbols-outlined text-[20px]">bar_chart</span>
    <span class="font-label-lg text-label-lg">Dashboard</span>
  </RouterLink>

  <RouterLink
    to="/admin/users"
    class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
    active-class="bg-primary/10 text-primary border-l-4 border-primary"
  >
    <span class="material-symbols-outlined text-[20px]">contacts</span>
    <span class="font-label-lg text-label-lg">User Directory</span>
  </RouterLink>

  <RouterLink
    to="/admin/featured"
    class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
    active-class="bg-primary/10 text-primary border-l-4 border-primary"
  >
    <span class="material-symbols-outlined text-[20px]">thumb_up</span>
    <span class="font-label-lg text-label-lg">Featured Characters</span>
  </RouterLink>

</nav>
 
    <!-- Bloque inferior: avatar + logout -->
    <div class="px-6 pt-8 border-t glass-stroke mt-auto">
      <div class="flex items-center gap-3 mb-1">
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 bg-surface-variant flex items-center justify-center">
          <span class="material-symbols-outlined text-on-surface-variant">person</span>
        </div>
        <div>
          <p class="font-label-lg text-label-lg font-bold text-on-surface">{{ adminName }}</p>
          <p class="text-xs text-on-surface-variant">Master Manager</p>
        </div>
      </div>
 
      <button
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-accent-red hover:text-white transition-all duration-300"
        @click="handleLogout"
      >
        <span class="material-symbols-outlined">logout</span>
        <span class="font-label-lg text-label-lg">Logout</span>
      </button>
    </div>
  </aside>
</template>
 
<script setup>
// Nombre temporal del admin — se conectará con authStore cuando esté disponible
const adminName = 'Alex Rivera'
 
function handleLogout() {
  // TODO: conectar con authStore.logout() cuando exista (DT-42, rama de Raana)
  console.warn('[Logout] Pendiente de integrar con authStore.')
}
</script>