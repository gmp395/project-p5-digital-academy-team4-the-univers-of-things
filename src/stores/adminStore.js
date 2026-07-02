import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
    avatar: JSON.parse(localStorage.getItem('adminProfile'))?.avatar || null
  }),
  getters: {
    totalUsers: (state) => state.users.length
  },
  actions: {
    refreshUsers() {
      const raw = JSON.parse(localStorage.getItem('users')) || []
      this.users = raw.map(u => ({
        ...u,
        status: u.status ?? 'allowed'
      }))
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    toggleUserStatus(email) {
      this.users = this.users.map(u =>
        u.email === email
          ? { ...u, status: u.status === 'allowed' ? 'restricted' : 'allowed' }
          : u
      )
      this.saveToLocalStorage()
    },
    setAvatar(url) {
      this.avatar = url
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
      localStorage.setItem('adminProfile', JSON.stringify({ avatar: this.avatar }))
    }
  }
})