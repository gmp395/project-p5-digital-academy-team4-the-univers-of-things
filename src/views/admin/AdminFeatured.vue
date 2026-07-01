<template>
  <div class="featured-management">
    <h1 class="featured-management__title">Gestión de Personajes Destacados</h1>
    <FeaturedList />
  </div>
</template>

<script setup>
import FeaturedList from '@/components/cards/FeaturedList.vue'
</script>

<style scoped lang="scss">
.featured-management {
  padding: 40px 48px 24px;

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 32px;
  }
}
</style>