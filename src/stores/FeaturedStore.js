import { defineStore } from 'pinia'

const MAX_FEATURED = 10

export const useFeaturedStore = defineStore('featured', {
  state: () => ({
    characters: JSON.parse(localStorage.getItem('featuredCharacters')) || [],
    maxFeatured: MAX_FEATURED
  }),

  getters: {
    totalFeatured: (state) => state.characters.length,
    isFull: (state) => state.characters.length >= state.maxFeatured
  },

  actions: {
    addCharacter(character) {
      if (this.isFull) {
        return false
      }
      this.characters.push(character)
      this.saveToLocalStorage()
      return true
    },
    removeCharacter(id) {
      this.characters = this.characters.filter(c => c.id !== id)
      this.saveToLocalStorage()
    },
    updateCharacter(id, updates) {
      const character = this.characters.find(c => c.id === id)
      if (character) {
        character.name = updates.name
        character.imageUrl = updates.imageUrl
        this.saveToLocalStorage()
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('featuredCharacters', JSON.stringify(this.characters))
    }
  }
})