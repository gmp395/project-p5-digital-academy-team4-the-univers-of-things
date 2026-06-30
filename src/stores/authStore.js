import { defineStore } from 'pinia'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    userRole: (state) => state.user?.role || 'guest'
  },

  actions: {
    async login(email, password) {
      const result = await authService.login(email, password)

      if (result.success) {
        this.user = result.user
        this.token = result.token

        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        return true
      }

      this.logout()
      return false
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    initAuth() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (token && user) {
        this.token = token
        this.user = user
      }
    }
  },
})