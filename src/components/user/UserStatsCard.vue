<template>
  <article class="user-stats-card">
    <span class="user-stats-card__number">{{ totalFavorites }}</span>
    <h2>Favoritos</h2>
    <p>Personajes y películas guardados en tu lista.</p>
  </article>
</template>

<script setup>
defineProps({
  totalFavorites: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped lang="scss">
.user-stats-card {
  width: 280px;
  background-color: #172133;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
}

.user-stats-card__number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.user-stats-card p {
  color: #cbd5e1;
}
</style>