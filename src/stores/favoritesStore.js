import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
    ratings: []
  }),

  actions: {
    getUserKey(type) {
      const authStore = useAuthStore()

      if (!authStore.user) return null

      return `${type}_${authStore.user.email}`
    },

    loadFavorites() {
      const favoritesKey = this.getUserKey('favorites')
      const ratingsKey = this.getUserKey('ratings')

      if (!favoritesKey || !ratingsKey) {
        this.favorites = []
        this.ratings = []
        return
      }

      this.favorites = JSON.parse(localStorage.getItem(favoritesKey)) || []
      this.ratings = JSON.parse(localStorage.getItem(ratingsKey)) || []
    },

    saveFavorites() {
      const favoritesKey = this.getUserKey('favorites')
      const ratingsKey = this.getUserKey('ratings')

      if (!favoritesKey || !ratingsKey) return

      localStorage.setItem(favoritesKey, JSON.stringify(this.favorites))
      localStorage.setItem(ratingsKey, JSON.stringify(this.ratings))
    },

    addFavorite(item) {
      const exists = this.favorites.some((favorite) => favorite._id === item._id)

      if (!exists) {
        this.favorites.push({
          ...item,
          customTitle: item.name,
          customDescription: 'Personaje del universo Disney.'
        })

        this.saveFavorites()
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter((favorite) => favorite._id !== id)
      this.saveFavorites()
    },

    isFavorite(id) {
      return this.favorites.some((favorite) => favorite._id === id)
    },

    toggleFavorite(item) {
      if (this.isFavorite(item._id)) {
        this.removeFavorite(item._id)
      } else {
        this.addFavorite(item)
      }
    },

    updateFavorite(id, updatedData) {
      const favorite = this.favorites.find((favorite) => favorite._id === id)

      if (favorite) {
        Object.assign(favorite, updatedData)
        this.saveFavorites()
      }
    },

    rateCharacter(character, rating) {
      const existingRating = this.ratings.find((item) => item._id === character._id)

      if (existingRating) {
        existingRating.rating = rating
      } else {
        this.ratings.push({
          _id: character._id,
          name: character.name,
          imageUrl: character.imageUrl,
          rating
        })
      }

      this.saveFavorites()
    },

    getRating(id) {
      const rating = this.ratings.find((item) => item._id === id)

      return rating?.rating || 0
    }
  }
})