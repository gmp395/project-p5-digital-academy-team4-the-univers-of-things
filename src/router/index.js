import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },

    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, hideHeader: true },
      redirect: '/admin/user',   // 👈 CLAVE: siempre entra al dashboard

      children: [
        {
          path: 'user',
          name: 'user-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue')
        },
        {
          path: 'users',
          name: 'user-directory',
          component: () => import('../views/admin/AdminDirectory.vue')
        },
        {
          path: 'featured',
          name: 'featured-management',
          component: () => import('../views/admin/AdminFeatured.vue')
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/AdminSettings.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  if (to.path.startsWith('/admin') && authStore.userRole !== 'admin') {
    return next({ name: 'home' })
  }

  next()
})

export default router