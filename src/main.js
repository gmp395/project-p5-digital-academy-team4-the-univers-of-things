import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore' 
import { useFavoritesStore } from './stores/favoritesStore'

const app = createApp(App)

const pinia = createPinia()  
app.use(pinia)               
app.use(router)

const authStore = useAuthStore() 
authStore.initAuth()         
const favoritesStore = useFavoritesStore()

app.mount('#app')