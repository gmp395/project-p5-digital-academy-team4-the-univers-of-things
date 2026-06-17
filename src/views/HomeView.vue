<script setup>
import TarjetasPersonajes from '../componentes/tarjetaspersonajes.vue'

const personajes = [
  {
    id: 1,
    name: 'Baloo',
    imageUrl: 'https://static.wikia.nocookie.net/disney/images/0/03/Profile_-_Baloo.jpeg'
  },
  {
    id: 2,
    name: 'Mickey Mouse',
    imageUrl: 'https://picsum.photos/300/400?1'
  },
  {
    id: 3,
    name: 'Donald Duck',
    imageUrl: 'https://picsum.photos/300/400?2'
  }
]
</script>

<template>
  <main>
    <h1>Disney Characters</h1>

    <TarjetasPersonajes :personaje="personajePrueba" /><TarjetasPersonajes
  v-for="personaje in personajes"
  :key="personaje.id"
  :personaje="personaje"
/>  </main>
</template>