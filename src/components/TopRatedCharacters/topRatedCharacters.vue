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

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <article
        v-for="character in topRatedCharacters"
        :key="character._id"
        class="overflow-hidden rounded-2xl bg-slate-800 shadow-lg"
      >
        <img
          :src="character.imageUrl"
          :alt="character.name"
          class="h-72 w-full object-cover"
        />

        <div class="p-4">
          <h3 class="text-lg font-bold text-white">
            {{ character.name }}
          </h3>

          <p class="mt-2 text-yellow-400">
            ⭐ 4.8
          </p>
        </div>
      </article>
    </div>
  </section>
</template>