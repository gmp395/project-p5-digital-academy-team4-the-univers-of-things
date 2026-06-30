<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['confirm', 'close'])
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
    <div class="w-full max-w-md rounded-2xl bg-slate-900 p-8 text-white shadow-2xl">

      <h2 class="mb-6 text-center text-3xl font-bold">
        👑 Personaje de la semana
      </h2>

      <img
        :src="character.imageUrl"
        :alt="character.name"
        class="mx-auto mb-5 h-56 rounded-xl object-cover"
      >

      <p class="mb-8 text-center text-lg">
        ¿Estás seguro de que
        <strong>{{ character.name }}</strong>
        será el personaje de la semana?
      </p>

      <div class="flex justify-center gap-4">

        <button
          @click="emit('close')"
          class="rounded-lg bg-slate-700 px-5 py-2 font-semibold hover:bg-slate-600"
        >
          Cancelar
        </button>

        <button
          @click="emit('confirm')"
          class="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-slate-900 hover:bg-yellow-400"
        >
          Confirmar
        </button>

      </div>

    </div>
  </div>
</template>