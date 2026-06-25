import { defineStore } from 'pinia'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    search: '',
    topRatedCharacters: []
  }),

  actions: {
    async fetchCharacters() {
      try {
        const response = await fetch('https://api.disneyapi.dev/character')
        const data = await response.json()

        this.characters = data.data.filter(
          (character) => character.imageUrl
        )
      } catch (error) {
        console.error('Error al obtener los personajes:', error)
      }
    }
  }
})