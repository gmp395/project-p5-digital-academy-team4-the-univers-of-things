<template>
  <header
    class="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b glass-stroke py-3 transition-all duration-300"
  >
    <nav class="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <!-- Logo + navegación principal -->
      <div class="flex items-center gap-12">
        <RouterLink to="/" class="flex items-center">
          <h1 class="font-display-lg text-display-lg-mobile font-bold text-primary tracking-tighter">
            CineMagic
          </h1>
        </RouterLink>
 
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/"
            class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors pb-1"
            active-class="text-primary font-bold border-b-2 border-primary"
          >
            Home
          </RouterLink>
        </div>
      </div>
 
      <!-- Login / Register -->
      <div class="flex items-center gap-6">
        <div class="hidden lg:flex items-center gap-4">
  <RouterLink
    to="/login"
    class="text-on-surface-variant hover:text-on-surface transition-opacity duration-300 font-label-lg text-label-lg"
    active-class="text-primary font-bold border-b-2 border-primary"
  >
    Login
  </RouterLink>
</div>
 
        <!-- Botón menú móvil -->
        <button
          class="lg:hidden flex items-center justify-center text-on-surface p-1"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Abrir menú de navegación"
        >
          <span class="material-symbols-outlined text-[28px]">
            {{ isMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </nav>
 
    <!-- Menú móvil desplegable -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden flex flex-col gap-3 px-margin-mobile py-4 bg-surface-dark/95 backdrop-blur-xl border-b glass-stroke"
      >
        <RouterLink
          to="/"
          class="text-body-md text-on-surface-variant hover:text-on-surface py-2"
          @click="isMenuOpen = false"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/login"
          class="text-body-md text-on-surface-variant hover:text-on-surface py-2"
          @click="isMenuOpen = false"
      >
          Login
        </RouterLink>
      </div>
    </transition>
  </header>
</template>
 
<script setup>
import { ref } from 'vue'
 
const isMenuOpen = ref(false)
</script>