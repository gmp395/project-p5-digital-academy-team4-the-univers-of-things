<template>
  <div class="admin-dashboard">

    <div class="admin-dashboard__header">
      <h1 class="admin-dashboard__title">Resumen del panel</h1>
      <p class="admin-dashboard__welcome">
        Bienvenido, <span>{{ authStore.user?.name }}</span> 👋
      </p>
      <p class="admin-dashboard__subtitle">
        Gestiona usuarios y personajes destacados desde un mismo lugar.
      </p>
    </div>

    <div class="admin-dashboard__stats">
      <div class="admin-dashboard__stat-card">
        <div class="admin-dashboard__stat-header">
          <h2>Total de usuarios</h2>
          <span class="material-symbols-outlined admin-dashboard__stat-icon--blue">group</span>
        </div>
        <p class="admin-dashboard__stat-number">{{ adminStore.totalUsers }}</p>
        <p class="admin-dashboard__stat-label">Usuarios registrados</p>
      </div>

      <div class="admin-dashboard__stat-card">
        <div class="admin-dashboard__stat-header">
          <h2>Personajes destacados</h2>
          <span class="material-symbols-outlined admin-dashboard__stat-icon--yellow">stars</span>
        </div>
        <p class="admin-dashboard__stat-number">{{ featuredStore.totalFeatured }}</p>
        <p class="admin-dashboard__stat-label">Personajes resaltados</p>
      </div>
    </div>

    <h2 class="admin-dashboard__actions-title">Acciones rápidas</h2>
    <div class="admin-dashboard__actions">
      <router-link :to="{ name: 'user-directory' }" class="admin-dashboard__action-btn admin-dashboard__action-btn--primary">
        <span class="material-symbols-outlined">group</span>
        Gestionar usuarios
      </router-link>
      <router-link :to="{ name: 'featured-management' }" class="admin-dashboard__action-btn admin-dashboard__action-btn--primary">
        <span class="material-symbols-outlined">stars</span>
        Personajes destacados
      </router-link>
      <router-link :to="{ name: 'admin-settings' }" class="admin-dashboard__action-btn admin-dashboard__action-btn--secondary">
        <span class="material-symbols-outlined">settings</span>
        Configuración
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { useAuthStore } from '@/stores/authStore'
import { useFeaturedStore } from '@/stores/FeaturedStore'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const featuredStore = useFeaturedStore()
</script>

<style scoped lang="scss">
.admin-dashboard {
  flex: 1;
  padding: 40px 48px 24px;
  color: white;
}

.admin-dashboard__header {
  margin-bottom: 40px;
}

.admin-dashboard__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 8px;
}

.admin-dashboard__welcome {
  color: #94a3b8;
  margin-bottom: 4px;

  span {
    font-weight: 600;
    color: #ffffff;
  }
}

.admin-dashboard__subtitle {
  color: #64748b;
}

.admin-dashboard__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.admin-dashboard__stat-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  h2 {
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 400;
  }
}

.admin-dashboard__stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.admin-dashboard__stat-icon--blue { color: #60a5fa; font-size: 1.875rem; }
.admin-dashboard__stat-icon--yellow { color: #facc15; font-size: 1.875rem; }

.admin-dashboard__stat-number {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.admin-dashboard__stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.admin-dashboard__actions-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
}

.admin-dashboard__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.admin-dashboard__action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  transition: background 0.2s;

  &--primary {
    background: #2563eb;
    &:hover { background: #1d4ed8; }
  }

  &--secondary {
    background: #334155;
    &:hover { background: #475569; }
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 40px 24px 24px;
  }

  .admin-dashboard__stats {
    grid-template-columns: 1fr;
  }

  .admin-dashboard__actions {
    flex-direction: column;
  }
}
</style>