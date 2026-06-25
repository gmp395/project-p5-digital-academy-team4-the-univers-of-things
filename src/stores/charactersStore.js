import { defineStore } from 'pinia'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    search: '',
    topRatedCharacters: []
  }),

  actions: {

  }
})
