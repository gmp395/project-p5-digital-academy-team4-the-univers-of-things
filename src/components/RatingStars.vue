<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const selectedRating = computed(() => {
  return favoritesStore.getRating(props.character._id)
})

const rateCharacter = (rating) => {
  favoritesStore.rateCharacter(props.character, rating)
}
</script>

<template>
  <div
    v-if="authStore.user?.role === 'customer'"
    class="mt-3 flex justify-center gap-1"
  >
    <button
      v-for="star in 5"
      :key="star"
      @click.stop.prevent="rateCharacter(star)"
      class="text-2xl transition hover:scale-110"
    >
      {{ star <= selectedRating ? '⭐' : '☆' }}
    </button>
  </div>
</template>