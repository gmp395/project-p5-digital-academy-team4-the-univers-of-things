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
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')

    if (!token) {
      return '/login'
    }
  }

  return true
})

export default router
