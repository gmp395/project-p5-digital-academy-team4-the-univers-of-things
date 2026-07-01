import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
  path: '/register',
  name: 'register',
  component: () => import('../views/RegisterView.vue')
},

    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin',
        hideHeader: true
      }
    },

    {
      path: '/user',
      name: 'user-dashboard',
      component: () => import('../views/UserDashboardView.vue'),
      meta: {
        requiresAuth: true,
        hideHeader: true
      }
    },
   {
  path: '/user/favorites',
  name: 'favorites',
  component: () => import('../views/FavoritesView.vue'),
  meta: {
    requiresAuth: true,
    hideHeader: true
      }
    }, 
    {
  path: '/user/settings',
  name: 'user-settings',
  component: () => import('../views/UserSettingsView.vue'),
  meta: {
    requiresAuth: true,
    hideHeader: true
    }
   },
   {
  path: '/character/:id',
  name: 'character-detail',
  component: () => import('../views/CharacterDetailView.vue')
},
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return '/'
  }

  return true
})

export default router
