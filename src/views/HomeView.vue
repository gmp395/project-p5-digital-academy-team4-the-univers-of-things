<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useCharactersStore } from '@/stores/charactersStore'
import Spinner from '@/components/Spinner.vue'

import Hero from '../components/herosection/hero.vue'
import Tarjetaspersonajes from '@/components/cards/tarjetaspersonajes.vue'
import BarraBusqueda from '@/components/BarraBusqueda/barraBusqueda.vue'
import TopRatedCharacters from '@/components/TopRatedCharacters/topRatedCharacters.vue'

const charactersStore = useCharactersStore()

const currentPage = ref(1)
const charactersPerPage = 15

const filteredCharacters = computed(() => {
  return charactersStore.characters.filter((personaje) =>
    personaje.name
      .toLowerCase()
      .includes(charactersStore.search.toLowerCase())
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / charactersPerPage)
})

const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * charactersPerPage
  const end = start + charactersPerPage

  return filteredCharacters.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

watch(
  () => charactersStore.search,
  () => {
    currentPage.value = 1
  }
)

onMounted(() => {
  charactersStore.fetchCharacters()
})
</script>

<template>
  <main class="min-h-screen bg-slate-950 px-8 py-4">
    <Hero />

    <TopRatedCharacters />

    <BarraBusqueda />

    <h1 class="mb-4 text-2xl font-bold text-white">
      Disney Characters
    </h1>

    <Spinner v-if="charactersStore.loading" />

    <section
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      <Tarjetaspersonajes
        v-for="personaje in paginatedCharacters"
        :key="personaje._id"
        :personaje="personaje"
      />
    </section>

    <div
      v-if="!charactersStore.loading && totalPages > 1"
      class="mt-4 flex items-center justify-center gap-4 text-white"
    >
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="rounded-lg bg-blue-600 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        Anterior
      </button>

      <span>Página {{ currentPage }} de {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="rounded-lg bg-blue-600 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        Siguiente
      </button>
    </div>
  </main>
</template>
