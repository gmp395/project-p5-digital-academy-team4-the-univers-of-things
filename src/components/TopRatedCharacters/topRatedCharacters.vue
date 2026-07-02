<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { RouterLink } from 'vue-router'

const favoritesStore = useFavoritesStore()

const topRatedCharacters = computed(() => {
  return favoritesStore.ratings
    .filter((character) => character.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
})
</script>

<template>
  <section class="px-6 py-10">
    <h2 class="mb-6 text-2xl font-bold text-white">
      ⭐ Top Rated by Users
    </h2>

    <p
      v-if="topRatedCharacters.length === 0"
      class="text-slate-300"
    >
      Todavía no hay personajes puntuados.
    </p>

    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
    >
      <RouterLink
        v-for="character in topRatedCharacters"
        :key="character._id"
        :to="`/character/${character._id}`"
        class="block cursor-pointer"
      >
        <article class="overflow-hidden rounded-xl bg-slate-800 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <img
            :src="character.imageUrl"
            :alt="character.name"
            class="h-40 w-full object-cover"
          >

          <div class="p-3">
            <h3 class="text-sm font-bold text-white">
              {{ character.name }}
            </h3>

            <p class="mt-1 text-yellow-400 text-sm">
              ⭐ {{ character.rating }}
            </p>
          </div>
        </article>
      </RouterLink>
    </div>
  </section>
</template>