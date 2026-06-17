import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  actions: {
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
    }
  }
})