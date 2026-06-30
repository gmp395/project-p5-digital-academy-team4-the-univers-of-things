<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'
import Spinner from '@/components/Spinner.vue'
import RatingStars from '@/components/RatingStars.vue'

const route = useRoute()
const character = ref(null)
const loading = ref(true)
const error = ref(false)

const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const response = await fetch(`https://api.disneyapi.dev/character/${route.params.id}`)
    const data = await response.json()

    character.value = data.data
  } catch (err) {
    console.error('Error al cargar el personaje:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="min-h-screen bg-slate-950 p-8 text-white">
    <RouterLink
      to="/"
      class="mb-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
    >
      Volver
    </RouterLink>

    <Spinner v-if="loading" />

    <p
      v-else-if="error"
      class="text-center text-red-400"
    >
      No se pudo cargar el personaje.
    </p>

    <section
      v-else-if="character"
      class="mx-auto max-w-4xl rounded-2xl bg-slate-900 p-8 shadow-lg"
    >
      <img
        :src="character.imageUrl"
        :alt="character.name"
        class="mx-auto mb-6 max-h-[500px] rounded-2xl object-contain"
      >

      <h1 class="mb-6 text-center text-4xl font-bold">
        {{ character.name }}
      </h1>

      <div
        v-if="authStore.user?.role === 'customer'"
        class="mb-6 flex justify-center gap-4"
      >
        <button
          @click="favoritesStore.toggleFavorite(character)"
          class="text-3xl transition hover:scale-110"
        >
          {{ favoritesStore.isFavorite(character._id) ? '❤️' : '🤍' }}
        </button>

        <RatingStars :character="character" />
      </div>

      <p v-if="character.films?.length" class="mb-3">
        <strong>Películas:</strong> {{ character.films.join(', ') }}
      </p>

      <p v-if="character.tvShows?.length" class="mb-3">
        <strong>Series:</strong> {{ character.tvShows.join(', ') }}
      </p>
    </section>
  </main>
</template>