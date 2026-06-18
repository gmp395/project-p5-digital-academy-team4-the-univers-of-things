<template>
  <article class="overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
    <img
      :src="personaje.imageUrl"
      :alt="personaje.name"
      class="h-60 w-full object-cover"
    >

    <div class="p-4">
      <h3 class="text-center text-lg font-semibold text-white">
        {{ personaje.name }}
      </h3>
    </div>
  </article>
</template>

<script setup>
defineProps({
  personaje: {
    type: Object,
    required: true
  }
})
</script>