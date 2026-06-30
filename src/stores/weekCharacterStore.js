import { defineStore } from 'pinia'

export const useWeekCharacterStore = defineStore('weekCharacter', {
  state: () => ({
    weekCharacter: JSON.parse(localStorage.getItem('weekCharacter')) || null
  }),

  actions: {
    setWeekCharacter(character) {
      this.weekCharacter = character
      localStorage.setItem('weekCharacter', JSON.stringify(character))
    },

    clearWeekCharacter() {
      this.weekCharacter = null
      localStorage.removeItem('weekCharacter')
    }
  }
})