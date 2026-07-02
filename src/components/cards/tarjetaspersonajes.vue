<script setup>
import { RouterLink } from 'vue-router'
import RatingStars from '@/components/RatingStars.vue'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'

defineProps({
  personaje: {
    type: Object,
    required: true
  }
})

const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
</script>

<template>
  <RouterLink :to="`/character/${personaje._id}`" class="block">
    <article class="overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <img
        :src="personaje.imageUrl"
        :alt="personaje.name"
        class="h-40 w-full object-contain bg-slate-800"
      >

      <div class="px-3 pt-2 pb-1">
        <h3 class="text-center text-sm font-semibold text-white leading-tight">
          {{ personaje.name }}
        </h3>

        <div
          v-if="authStore.user?.role === 'customer'"
          class="mt-1 flex items-center justify-center gap-3"
        >
          <button
            @click.prevent.stop="favoritesStore.toggleFavorite(personaje)"
            class="text-xl transition hover:scale-110"
            title="Añadir o quitar de favoritos"
          >
            {{ favoritesStore.isFavorite(personaje._id) ? '❤️' : '🤍' }}
          </button>

          <RatingStars :character="personaje" @click.prevent.stop />
        </div>
      </div>
    </article>
  </RouterLink>
</template>