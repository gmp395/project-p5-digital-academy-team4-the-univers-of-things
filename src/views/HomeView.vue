<script setup>
import { ref, onMounted } from 'vue'
import Hero from '../components/herosection/hero.vue'
import Tarjetaspersonajes from '@/components/cards/tarjetaspersonajes.vue'
import BarraBusqueda from '@/components/BarraBusqueda/barraBusqueda.vue'
import TopRatedCharacters from '@/components/TopRatedCharacters/topRatedCharacters.vue'

const personajes = ref([])

onMounted(async () => {
  const response = await fetch('https://api.disneyapi.dev/character')
  const data = await response.json()

  personajes.value = data.data
    .filter(personaje => personaje.imageUrl)
    .slice(0, 10)
})
</script>

<template>
  <main class="min-h-screen bg-slate-950 p-8">

   <Hero />

<TopRatedCharacters />
<BarraBusqueda />

    <h1 class="mb-8 text-3xl font-bold text-white">
      Disney Characters
    </h1>

    <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <Tarjetaspersonajes
        v-for="personaje in personajes"
        :key="personaje._id"
        :personaje="personaje"
      />
    </section>

  </main>
</template>