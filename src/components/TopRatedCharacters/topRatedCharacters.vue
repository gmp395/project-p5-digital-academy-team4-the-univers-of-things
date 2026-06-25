<script setup>
import { ref, onMounted } from 'vue'

const topRatedCharacters = ref([])

const fetchTopRatedCharacters = async () => {
  try {
    const response = await fetch('https://api.disneyapi.dev/character')
    const data = await response.json()

    topRatedCharacters.value = data.data
      .filter((character) => character.imageUrl)
      .slice(0, 5)
  } catch (error) {
    console.error('Error loading top rated characters:', error)
  }
}

onMounted(() => {
  fetchTopRatedCharacters()
})
</script>
<template>
  <section class="px-6 py-10">
    <h2 class="mb-6 text-2xl font-bold text-white">
      ⭐ Top Rated by Users
    </h2>
    <ul>
  <li
    v-for="character in topRatedCharacters"
    :key="character._id"
  >
    {{ character.name }}
  </li>
</ul>
  </section>
</template>