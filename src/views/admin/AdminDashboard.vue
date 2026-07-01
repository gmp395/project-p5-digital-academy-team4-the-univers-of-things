<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { useAuthStore } from '@/stores/authStore'
import { useFeaturedStore } from '@/stores/FeaturedStore'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const featuredStore = useFeaturedStore()
</script>

<template>
  <div class="featured-management -mt-10 px-6">

    <div class="mb-10">
      <h1 class="mb-2 text-3xl font-bold text-white">
        Resumen del panel
      </h1>

      <p class="text-slate-400">
        Bienvenido, <span class="font-semibold text-white">{{ authStore.user?.name }}</span> 👋
      </p>

      <p class="mt-1 text-slate-500">
        Gestiona usuarios y personajes destacados desde un mismo lugar.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-10">

      <div class="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <h2 class="text-slate-400">
            Total de usuarios
          </h2>
          <span class="material-symbols-outlined text-3xl text-blue-400">group</span>
        </div>
        <p class="mt-4 text-4xl font-bold text-white">
          {{ adminStore.totalUsers }}
        </p>
        <p class="mt-2 text-sm text-slate-500">
          Usuarios registrados
        </p>
      </div>

      <div class="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <h2 class="text-slate-400">
            Personajes destacados
          </h2>
          <span class="material-symbols-outlined text-3xl text-yellow-400">stars</span>
        </div>
        <p class="mt-4 text-4xl font-bold text-white">{{ featuredStore.totalFeatured }}</p>
        <p class="mt-2 text-sm text-slate-500">
          Personajes resaltados
        </p>
      </div>

    </div>

    <h2 class="mb-5 text-xl font-semibold text-white">
      Acciones rápidas
    </h2>
    <div class="flex flex-wrap gap-4">
      <router-link
        :to="{ name: 'user-directory' }"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <span class="material-symbols-outlined">group</span>
        Gestionar usuarios
      </router-link>

      <router-link
        :to="{ name: 'featured-management' }"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <span class="material-symbols-outlined">stars</span>
        Personajes destacados
      </router-link>

      <router-link
        :to="{ name: 'admin-settings' }"
        class="flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
      >
        <span class="material-symbols-outlined">settings</span>
        Configuración
      </router-link>
    </div>

  </div>
</template>