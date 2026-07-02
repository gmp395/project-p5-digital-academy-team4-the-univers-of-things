<template>
  <aside class="sticky top-0 h-screen w-64 bg-surface-light border-r glass-stroke flex flex-col py-4 z-50 shrink-0">

    <div class="px-6 mb-2 mt-2 flex justify-center">
      <span class="material-symbols-outlined text-primary" style="font-size: 40px;">movie_filter</span>
    </div>

    <nav class="flex-1 space-y-1">
      <p class="px-6 pt-4 pb-2 text-xs text-on-surface-variant uppercase tracking-wider">Sistema</p>

      <RouterLink
        to="/"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">home</span>
        <span class="font-label-lg text-sm font-bold">Inicio</span>
      </RouterLink>

      <p class="px-6 pt-6 pb-2 text-xs text-on-surface-variant uppercase tracking-wider">Personal</p>

      <RouterLink
        to="/user"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">person</span>
        <span class="font-label-lg text-sm font-bold">Perfil</span>
      </RouterLink>

      <RouterLink
        to="/user/favorites"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">favorite</span>
        <span class="font-label-lg text-sm font-bold">Favoritos</span>
      </RouterLink>

      <RouterLink
        to="/user/settings"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">settings</span>
        <span class="font-label-lg text-sm font-bold">Ajustes</span>
      </RouterLink>
    </nav>

    <div class="px-6 pt-8 border-t glass-stroke mt-auto">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 bg-surface-variant flex items-center justify-center">
          <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover" />
          <span v-else class="material-symbols-outlined text-on-surface-variant">person</span>
        </div>
        <div>
          <p class="font-label-lg text-label-lg font-bold text-on-surface">{{ authStore.user?.name || 'Usuario' }}</p>
          <p class="text-xs text-on-surface-variant">Miembro de CineMagic</p>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-300"
      >
        <span class="material-symbols-outlined">logout</span>
        <span class="font-label-lg text-label-lg">Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useLogout } from '@/utils/useLogout'

const authStore = useAuthStore()
const { logout } = useLogout()

const userAvatar = ref('')

const loadUserAvatar = () => {
  userAvatar.value = localStorage.getItem('userAvatar') || ''
}

onMounted(() => {
  loadUserAvatar()
  window.addEventListener('storage', loadUserAvatar)
  window.addEventListener('avatar-updated', loadUserAvatar)
})
</script>