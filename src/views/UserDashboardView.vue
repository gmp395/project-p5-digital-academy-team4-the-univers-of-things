<template>
  <div class="user-dashboard">
    <UserSidebar />

  <div class="user-dashboard__main">
    <main class="user-dashboard__content">
      <section class="user-dashboard__intro">
        <h1>Tu espacio personal</h1>
        <p>Accede a tu perfil, favoritos y ajustes desde aquí.</p>
      </section>

      <section class="user-dashboard__summary">
        <UserInfoCard />
        <UserStatsCard :total-favorites="favoritesStore.favorites.length" />
      </section>

      <hr class="user-dashboard__divider" />
    </main>
  <Footer />
    </div>
  </div>
</template>

<script setup>
import UserSidebar from '@/components/user/UserSidebar.vue'
import UserInfoCard from '@/components/user/UserInfoCard.vue'
import UserStatsCard from '@/components/user/UserStatsCard.vue'
import Footer from '@/components/Footer.vue'
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoritesStore = useFavoritesStore()
</script>

<style scoped lang="scss">
.user-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #0f172a;
}

.user-dashboard__main {
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.user-dashboard__content {
  flex: 1;
  padding: 48px 64px;
  color: #ffffff;
}


.user-dashboard__intro {
  max-width: 560px;
  margin-bottom: 32px;

  h1 {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
  }
}

.user-dashboard__summary {
  display: flex;
  align-items: stretch;
  gap: 20px;
  margin-top: 32px;
}

.user-dashboard__divider {
  margin-top: 40px;
  border: none;
  border-top: 1px solid #23324b;
}
@media (max-width: 1000px) {
  .user-dashboard {
    flex-direction: column;
  }
  .user-dashboard__main {
    min-height: auto;
  }
  .user-dashboard__content {
    padding: 20px;
  }

  .user-dashboard__summary {
    flex-direction: column;
  }
}
</style>