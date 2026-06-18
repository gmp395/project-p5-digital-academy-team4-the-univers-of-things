import { defineStore } from 'pinia'
import { authService } from '../services/authService'
export const useAuthStore = defineStore('auth', {
  state: () => ({
  user: null,
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
  }
},
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      },

    initAuth() {
        const token = localStorage.getItem('token')

  if (token) {
    this.token = token
    this.isAuthenticated = true
    }
  }
}
})