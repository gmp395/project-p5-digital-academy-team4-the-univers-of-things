import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import { useFavoritesStore } from './favoritesStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(email, password) {
      const result = await authService.login(email, password)

      if (result.success) {
        this.user = result.user
        this.token = result.token
        this.isAuthenticated = true

        // Guardar token para mantener la sesión
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        const favoritesStore = useFavoritesStore()
favoritesStore.loadFavorites()
        return true
      }
const favoritesStore = useFavoritesStore()
favoritesStore.favorites = []
      this.user = null
      this.token = null
      this.isAuthenticated = false

      return false
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
    },

  initAuth() {
  const token = localStorage.getItem('token')

  if (token) {
    this.token = token
    this.user = JSON.parse(localStorage.getItem('user'))
    this.isAuthenticated = true
  } else {
    this.user = null
    this.token = null
    this.isAuthenticated = false
  }
}
},
})
