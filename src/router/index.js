import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, hideHeader: true, hideFooter: true },
      redirect: '/admin/user',
      children: [
        { path: 'user', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboard.vue') },
        { path: 'users', name: 'user-directory', component: () => import('../views/admin/AdminDirectory.vue') },
        { path: 'featured', name: 'featured-management', component: () => import('../views/admin/AdminFeatured.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('../views/admin/AdminSettings.vue') }
      ]
    },
    { path: '/user', name: 'user-dashboard', component: () => import('../views/UserDashboardView.vue'), meta: { requiresAuth: true, hideHeader: true, hideFooter: true } },
    { path: '/user/favorites', name: 'favorites', component: () => import('../views/FavoritesView.vue'), meta: { requiresAuth: true, hideHeader: true, hideFooter: true } },
    { path: '/user/settings', name: 'user-settings', component: () => import('../views/UserSettingsView.vue'), meta: { requiresAuth: true, hideHeader: true, hideFooter: true } },
    { path: '/character/:id', name: 'character-detail', component: () => import('../views/CharacterDetailView.vue') }
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