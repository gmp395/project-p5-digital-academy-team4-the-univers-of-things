<script setup>
import { ref } from 'vue'
import { useCharactersStore } from '@/stores/charactersStore'

const charactersStore = useCharactersStore()

const search = ref('')

const updateSearch = () => {
  charactersStore.setSearch(search.value)
}
</script>
<template>
  <section class="flex justify-center px-6 py-6">
    <div class="flex w-full max-w-3xl overflow-hidden rounded-xl border-2 border-slate-600 bg-slate-900 shadow-lg">
     <input
  v-model="search"
  @input="updateSearch"
  type="text"
  placeholder="Search Disney characters..."
  class="flex-1 bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none"
/>

      <button
        class="bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  </section>
</template>