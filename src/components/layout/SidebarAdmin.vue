<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-surface-light border-r glass-stroke flex-col py-4 z-50 hidden md:flex">
    <div class="px-6 mb-4">
    <div class="px-6 mb-2 mt-2 flex justify-center">
      <span class="material-symbols-outlined text-primary" style="font-size: 40px;">movie_filter</span>
    </div>
  </div>

    <nav class="flex-1 space-y-1">
      <p class="px-6 pt-4 pb-2 text-xs text-on-surface-variant uppercase tracking-wider">System</p>
      
      <RouterLink
        to="/"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">home</span>
        <span class="font-label-lg text-label-lg">Home</span>
      </RouterLink>


      <RouterLink
        to="/admin/settings"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
      >
        <span class="material-symbols-outlined text-[20px]">settings</span>
        <span class="font-label-lg text-label-lg">Settings</span>
      </RouterLink>

      <p class="px-6 pt-6 pb-2 text-xs text-on-surface-variant uppercase tracking-wider">Management</p>

      <RouterLink
        to="/admin/user"
        class="flex items-center gap-4 px-6 py-3 transition-all duration-300 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
        active-class="bg-primary/10 text-primary border-l-4 border-primary"
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

    <div class="px-6 pt-8 border-t glass-stroke mt-auto">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 bg-surface-variant flex items-center justify-center">
          <img
            v-if="adminStore.avatar"
            :src="adminStore.avatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <span v-else class="material-symbols-outlined text-on-surface-variant">person</span>
        </div>
        <div>
          <p class="font-label-lg text-label-lg font-bold text-on-surface">
            {{ authStore.user?.name || 'Administrator' }}
          </p>
          <p class="text-xs text-on-surface-variant">Master Manager</p>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-300"
      >
        <span class="material-symbols-outlined">logout</span>
        <span class="font-label-lg text-label-lg">Logout</span>   
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'
import { useLogout } from '@/utils/useLogout'

const authStore = useAuthStore()
const adminStore = useAdminStore()
const { logout } = useLogout()
</script>