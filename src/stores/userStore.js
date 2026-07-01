import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    avatar: localStorage.getItem('userAvatar') || '',
    avatarName: localStorage.getItem('userAvatarName') || 'Nombre del usuario'
  }),

  actions: {
    setAvatar(avatar, avatarName) {
      this.avatar = avatar
      this.avatarName = avatarName

      localStorage.setItem('userAvatar', avatar)
      localStorage.setItem('userAvatarName', avatarName)
    }
  }
})