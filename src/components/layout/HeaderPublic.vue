<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'
import { useLogout } from '@/utils/useLogout'

const route = useRoute()
const isMenuOpen = ref(false)
const dropdownOpen = ref(false)
const authStore = useAuthStore()
const adminStore = useAdminStore()
const { logout } = useLogout()

const userAvatarValue = ref(localStorage.getItem('userAvatar') || '')
const userAvatar = computed(() => authStore.user?.avatar || userAvatarValue.value)
const userName = computed(() => authStore.user?.name || authStore.user?.email || 'Usuario')

onMounted(() => {
  window.addEventListener('storage', () => { userAvatarValue.value = localStorage.getItem('userAvatar') || '' })
  window.addEventListener('avatar-updated', () => { userAvatarValue.value = localStorage.getItem('userAvatar') || '' })
})
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__left">
        <RouterLink to="/" class="header__brand">
          <h1 class="header__logo">CineMagic</h1>
        </RouterLink>
        <div class="header__links">
          <RouterLink to="/" class="header__nav-link" active-class="header__nav-link--active">Home</RouterLink>
        </div>
      </div>

      <div class="header__actions">
        <div class="header__desktop-actions">

          <!-- Sin sesión -->
          <template v-if="!authStore.isAuthenticated">
            <RouterLink
              to="/login"
              class="header__nav-link"
              :class="{ 'header__nav-link--active': route.path === '/login' }"
            >Login</RouterLink>

            <RouterLink
              to="/register"
              class="header__nav-link"
              :class="{ 'header__nav-link--active': route.path === '/register' }"
            >Registro</RouterLink>
          </template>

          <!-- Admin: dropdown -->
          <div v-else-if="authStore.userRole === 'admin'" class="header__dropdown-wrapper">
            <div v-if="dropdownOpen" @click="dropdownOpen = false" class="header__overlay"></div>
            <button @click="dropdownOpen = !dropdownOpen" class="header__avatar-btn">
              <img v-if="adminStore.avatar" :src="adminStore.avatar" alt="Avatar" class="header__avatar-img" />
              <span v-else class="material-symbols-outlined">person</span>
            </button>
            <transition name="dropdown">
              <div v-if="dropdownOpen" class="header__dropdown">
                <div class="header__dropdown-header">
                  <p class="header__dropdown-name">{{ authStore.user?.name }}</p>
                  <p class="header__dropdown-email">{{ authStore.user?.email }}</p>
                </div>
                <div class="header__dropdown-section">
                  <RouterLink to="/admin/settings" @click="dropdownOpen = false" class="header__dropdown-link">
                    <span class="material-symbols-outlined">settings</span>
                    Ajustes
                  </RouterLink>
                </div>
                <div class="header__dropdown-section header__dropdown-section--border">
                  <button @click="() => { logout(); dropdownOpen = false }" class="header__dropdown-btn">
                    <span class="material-symbols-outlined">logout</span>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Usuario regular: mismo dropdown que admin -->
          <div v-else class="header__dropdown-wrapper">
            <div v-if="dropdownOpen" @click="dropdownOpen = false" class="header__overlay"></div>
            <button @click="dropdownOpen = !dropdownOpen" class="header__avatar-btn">
              <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="header__avatar-img" />
              <span v-else class="material-symbols-outlined">person</span>
            </button>
            <transition name="dropdown">
              <div v-if="dropdownOpen" class="header__dropdown">
                <div class="header__dropdown-header">
                  <p class="header__dropdown-name">{{ userName }}</p>
                  <p class="header__dropdown-email">{{ authStore.user?.email }}</p>
                </div>
                <div class="header__dropdown-section">
                  <RouterLink to="/user" @click="dropdownOpen = false" class="header__dropdown-link">
                    <span class="material-symbols-outlined">dashboard</span>
                    Mi perfil
                  </RouterLink>
                </div>
                <div class="header__dropdown-section header__dropdown-section--border">
                  <button @click="() => { logout(); dropdownOpen = false }" class="header__dropdown-btn">
                    <span class="material-symbols-outlined">logout</span>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </transition>
          </div>

        </div>

        <button class="header__mobile-toggle" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen" aria-label="Abrir menú de navegación">
          <span class="material-symbols-outlined">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </nav>

    <transition name="mobile-menu">
      <div v-if="isMenuOpen" class="header__mobile-menu">
        <RouterLink to="/" class="header__mobile-link" @click="isMenuOpen = false">Home</RouterLink>
        <template v-if="!authStore.isAuthenticated">
          <RouterLink to="/login" class="header__mobile-link" @click="isMenuOpen = false">Login</RouterLink>
          <RouterLink to="/register" class="header__mobile-link" @click="isMenuOpen = false">Registro</RouterLink>
        </template>
        <template v-else-if="authStore.userRole === 'admin'">
          <RouterLink to="/admin/settings" class="header__mobile-link" @click="isMenuOpen = false">Ajustes</RouterLink>
          <button @click="() => { logout(); isMenuOpen = false }" class="header__mobile-btn">Cerrar sesión</button>
        </template>
        <template v-else>
          <RouterLink to="/user" class="header__mobile-link" @click="isMenuOpen = false">Mi perfil</RouterLink>
          <button @click="() => { logout(); isMenuOpen = false }" class="header__mobile-btn">Cerrar sesión</button>
        </template>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(24px);
  padding: 6px 0;
  transition: all 0.3s;

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    max-width: 1280px;
    margin: 0 auto;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 48px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #60a5fa;
    letter-spacing: -0.05em;
    margin: 0;
  }

  &__links {
    display: none;
    align-items: center;
    gap: 32px;

    @media (min-width: 768px) { display: flex; }
  }

  &__nav-link {
    font-size: 0.875rem;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.2s;
    padding-bottom: 4px;

    &:hover { color: #e2e8f0; }
    &--active { color: #60a5fa; font-weight: 700; border-bottom: 2px solid #60a5fa; }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__desktop-actions {
    display: none;
    align-items: center;
    gap: 16px;

    @media (min-width: 1024px) { display: flex; }
  }

  &__auth-link {
    font-size: 0.875rem;
    color: #94a3b8;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    padding-bottom: 4px;
    outline: none;

    &:hover { color: #e2e8f0; }
    &--active { color: #60a5fa; font-weight: 700; border-bottom: 2px solid #60a5fa; }
  }

  &__dropdown-wrapper { position: relative; }

  &__overlay { position: fixed; inset: 0; z-index: 40; }

  &__avatar-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
    background: none;
    cursor: pointer;
    position: relative;
    z-index: 50;
    transition: border-color 0.3s;

    &:hover { border-color: #60a5fa; }
  }

  &__avatar-img { width: 100%; height: 100%; object-fit: cover; }

  &__dropdown {
    position: absolute;
    right: 0;
    top: 48px;
    width: 224px;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 50;
    overflow: hidden;
  }

  &__dropdown-header {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__dropdown-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__dropdown-email {
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__dropdown-section {
    padding: 4px 0;

    &--border { border-top: 1px solid rgba(255, 255, 255, 0.08); }
  }

  &__dropdown-link,
  &__dropdown-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    font-size: 0.875rem;
    color: #94a3b8;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: background 0.2s, color 0.2s;

    &:hover { background: #334155; color: #e2e8f0; }

    .material-symbols-outlined { font-size: 18px; }
  }

  &__mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #e2e8f0;
    padding: 4px;

    @media (min-width: 1024px) { display: none; }
  }

  &__mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__mobile-link {
    font-size: 0.875rem;
    color: #94a3b8;
    text-decoration: none;
    padding: 8px 0;
    transition: color 0.2s;

    &:hover { color: #e2e8f0; }
  }

  &__mobile-btn {
    font-size: 0.875rem;
    color: #94a3b8;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 0;
    text-align: left;
    transition: color 0.2s;

    &:hover { color: #e2e8f0; }
  }
}

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: scale(0.95) translateY(-4px); }

.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 0.2s, transform 0.2s; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>