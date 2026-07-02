<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'
import { useWeekCharacterStore } from '@/stores/weekCharacterStore'
import Spinner from '@/components/Spinner.vue'
import RatingStars from '@/components/RatingStars.vue'
import ConfirmWeekCharacterModal from '@/components/herosection/ConfirmWeekCharacterModal.vue'

const route = useRoute()
const character = ref(null)
const loading = ref(true)
const error = ref(false)
const showConfirmModal = ref(false)

const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const weekCharacterStore = useWeekCharacterStore()

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

const confirmWeekCharacter = () => {
  weekCharacterStore.setWeekCharacter(character.value)
  showConfirmModal.value = false
}
</script>

<template>
  <main class="bg-slate-950 px-8 py-6 text-white">
    <RouterLink
      to="/"
      class="mb-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
    >
      ← Volver
    </RouterLink>

    <Spinner v-if="loading" />

    <p v-else-if="error" class="text-center text-red-400">
      No se pudo cargar el personaje.
    </p>

    <section
      v-else-if="character"
      class="mx-auto max-w-lg rounded-2xl bg-slate-900 p-6 shadow-lg"
    >
      <div class="flex flex-col items-center gap-4">
        <img
          :src="character.imageUrl"
          :alt="character.name"
          class="h-72 w-full rounded-xl object-contain bg-slate-800"
        >

        <h1 class="text-xl font-bold text-center">{{ character.name }}</h1>

        <div v-if="authStore.user?.role === 'customer'" class="flex items-center gap-3">
          <button
            @click="favoritesStore.toggleFavorite(character)"
            class="text-xl transition hover:scale-110"
          >
            {{ favoritesStore.isFavorite(character._id) ? '❤️' : '🤍' }}
          </button>
          <RatingStars :character="character" />
        </div>

        <div v-if="authStore.user?.role === 'admin'">
          <button
            @click="showConfirmModal = true"
            class="rounded-lg bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-yellow-400"
          >
            👑 Elegir como personaje de la semana
          </button>
        </div>

        <p v-if="character.films?.length" class="text-sm text-center text-slate-300">
          <strong class="text-white">Películas:</strong> {{ character.films.join(', ') }}
        </p>

        <p v-if="character.tvShows?.length" class="text-sm text-center text-slate-300">
          <strong class="text-white">Series:</strong> {{ character.tvShows.join(', ') }}
        </p>
      </div>
    </section>

    <ConfirmWeekCharacterModal
      v-if="showConfirmModal && character"
      :character="character"
      @close="showConfirmModal = false"
      @confirm="confirmWeekCharacter"
    />
  </main>
</template>