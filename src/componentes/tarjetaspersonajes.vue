<template>
  <article>
    <img src="" alt="personaje">
    <h3>Nombre personaje</h3>
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