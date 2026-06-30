<template>
  <header class="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b glass-stroke py-3 transition-all duration-300">
    <nav class="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div class="flex items-center gap-12">
        <RouterLink to="/" class="flex items-center">
          <h1 class="font-display-lg text-display-lg-mobile font-bold text-primary tracking-tighter">CineMagic</h1>
        </RouterLink>
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/"
            class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors pb-1"
            active-class="text-primary font-bold border-b-2 border-primary"
          >Home</RouterLink>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="hidden lg:flex items-center gap-4">

          <!-- Sin sesión -->
          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="text-on-surface-variant hover:text-on-surface transition-opacity duration-300 font-label-lg text-label-lg"
          >Login</RouterLink>

          <!-- Con sesión -->
          <div v-else class="relative">

            <!-- Overlay para cerrar dropdown -->
            <div v-if="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-40"></div>

            <!-- Avatar botón -->
            <button @click="dropdownOpen = !dropdownOpen" class="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md hover:border-primary transition-all duration-300 z-50 relative">
              <img v-if="adminStore.avatar" :src="adminStore.avatar" alt="Avatar" class="w-full h-full object-cover" />
              <span v-else class="material-symbols-outlined text-sm text-on-surface-variant">person</span>
            </button>

            <!-- Dropdown -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="dropdownOpen"
                class="absolute right-0 top-12 w-56 bg-surface-container border glass-stroke rounded-2xl shadow-lg z-50 overflow-hidden"
              >
                <!-- Info usuario -->
                <div class="px-4 py-3 border-b glass-stroke">
                  <p class="text-sm font-semibold text-on-surface truncate">{{ authStore.user?.name }}</p>
                  <p class="text-xs text-on-surface-variant truncate">{{ authStore.user?.email }}</p>
                </div>

                <!-- Navegación -->
                <div class="py-1">
                  <RouterLink
                    to="/admin/settings"
                    @click="dropdownOpen = false"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">settings</span>
                    Ajustes
                  </RouterLink>
                </div>

                <!-- Cerrar sesión -->
                <div class="border-t glass-stroke py-1">
                  <button
                    @click="logout; dropdownOpen = false"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors w-full"
                  >
                    <span class="material-symbols-outlined text-[18px]">logout</span>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Botón menú móvil -->
        <button
          class="lg:hidden flex items-center justify-center text-on-surface p-1"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Abrir menú de navegación"
        >
          <span class="material-symbols-outlined text-[28px]">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </nav>

    <!-- Menú móvil -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="lg:hidden flex flex-col gap-3 px-margin-mobile py-4 bg-surface-dark/95 backdrop-blur-xl border-b glass-stroke">
        <RouterLink to="/" class="text-body-md text-on-surface-variant hover:text-on-surface py-2" @click="isMenuOpen = false">Home</RouterLink>
        <template v-if="!authStore.isAuthenticated">
          <RouterLink to="/login" class="text-body-md text-on-surface-variant hover:text-on-surface py-2" @click="isMenuOpen = false">Login</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/admin/settings" class="text-body-md text-on-surface-variant hover:text-on-surface py-2" @click="isMenuOpen = false">Ajustes</RouterLink>
          <button @click="logout; isMenuOpen = false" class="text-body-md text-on-surface-variant hover:text-on-surface py-2 text-left">Cerrar sesión</button>
        </template>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'
import { useLogout } from '@/utils/useLogout'

const isMenuOpen = ref(false)
const dropdownOpen = ref(false)
const authStore = useAuthStore()
const adminStore = useAdminStore()
const { logout } = useLogout()
</script>