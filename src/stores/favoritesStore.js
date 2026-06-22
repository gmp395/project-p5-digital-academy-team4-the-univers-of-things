import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),

  actions: {
    addFavorite(item) {
      const exists = this.favorites.some((favorite) => favorite._id === item._id)

      if (!exists) {
        this.favorites.push({
          ...item,
          customTitle: item.name,
          customDescription: 'Personaje del universo Disney.',
          rating: 0
        })
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter((favorite) => favorite._id !== id)
    },

    updateFavorite(id, updatedData) {
      const favorite = this.favorites.find((favorite) => favorite._id === id)

      if (favorite) {
        Object.assign(favorite, updatedData)
      }
    },

    rateFavorite(id, rating) {
      const favorite = this.favorites.find((favorite) => favorite._id === id)

      if (favorite) {
        favorite.rating = rating
      }
    }
  }
})