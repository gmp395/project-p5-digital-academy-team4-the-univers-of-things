<template>
  <article class="user-info-card">
    <div class="user-info-card__avatar">
      <img
        v-if="userAvatar"
        :src="userAvatar"
        alt="Avatar de usuario"
      />
      <span v-else>A</span>
    </div>

    <div>
      <h2>Nombre del usuario</h2>
      <p>Miembro de CineMagic</p>
    </div>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const userAvatar = ref('')

const loadUserAvatar = () => {
  userAvatar.value = localStorage.getItem('userAvatar') || ''
}

onMounted(() => {
  loadUserAvatar()
})
</script>

<style scoped lang="scss">
.user-info-card__avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>