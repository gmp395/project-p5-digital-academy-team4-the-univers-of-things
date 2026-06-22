import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, hideHeader: true }, // Definido aquí
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/AdminDashboardView.vue')
        },
        {
          path: 'users',
          name: 'user-directory',
          component: () => import('../views/UserDirectoryView.vue')
        },
        {
          path: 'featured',
          name: 'featured-management',
          component: () => import('../views/FeaturedManagementView.vue')
        }
      ]
    }
  ]
})

export default router