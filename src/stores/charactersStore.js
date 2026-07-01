import { defineStore } from 'pinia'

const CACHE_KEY = 'disneyCharactersCache'
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 horas

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    search: '',
    topRatedCharacters: [],
    loading: false
  }),

  actions: {
    async fetchCharacters() {
      // Verificar caché
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          this.characters = data
          return
        }
      }

      this.loading = true

      try {
        // Primera petición para saber cuántas páginas hay
        const firstResponse = await fetch('https://api.disneyapi.dev/character?page=1&pageSize=500')
        const firstData = await firstResponse.json()
        const totalPages = firstData.info.totalPages

        // Cargar todas las páginas en paralelo
        const requests = []
        for (let page = 1; page <= totalPages; page++) {
          requests.push(
          fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=500`).then(r => r.json())
        )
        }

        const pages = await Promise.all(requests)
        const allCharacters = pages
          .flatMap(p => p.data)
          .filter(c => c.imageUrl)

        this.characters = allCharacters

        // Guardar en caché
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: allCharacters,
          timestamp: Date.now()
        }))

      } catch (error) {
        console.error('Error al obtener los personajes:', error)
      } finally {
        this.loading = false
      }
    },

    setSearch(searchText) {
      this.search = searchText
    }
  }
})