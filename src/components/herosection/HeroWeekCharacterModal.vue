<script setup>
import { useWeekCharacterStore } from '@/stores/weekCharacterStore'

defineEmits(['close'])

const weekCharacterStore = useWeekCharacterStore()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
    <div class="max-w-md rounded-2xl bg-slate-900 p-8 text-center text-white shadow-2xl">

      <h2 class="mb-6 text-3xl font-bold">
        ⭐ Personaje de la semana
      </h2>

      <div v-if="weekCharacterStore.weekCharacter">
        <img
          :src="weekCharacterStore.weekCharacter.imageUrl"
          :alt="weekCharacterStore.weekCharacter.name"
          class="mx-auto mb-6 h-64 rounded-xl object-cover"
        >

        <h3 class="mb-3 text-2xl font-bold">
          {{ weekCharacterStore.weekCharacter.name }}
        </h3>
      </div>

      <div v-else>
        <p class="mb-6 text-lg">
          Esta semana... el personaje eres tú ✨
        </p>
      </div>

      <button
        @click="$emit('close')"
        class="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
      >
        Cerrar
      </button>

    </div>
  </div>
</template>