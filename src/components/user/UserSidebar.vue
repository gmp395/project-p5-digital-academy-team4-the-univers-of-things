<template>
  <aside class="user-sidebar">
    <h2 class="user-sidebar__logo">CineMagic</h2>

    <nav class="user-sidebar__nav">
      <RouterLink to="/">
        <Home :size="18" />
        Inicio
      </RouterLink>

      <RouterLink to="/user/favorites">
        <Heart :size="18" />
        Favoritos
      </RouterLink>

      <RouterLink to="/user">
        <User :size="18" />
        Perfil
      </RouterLink>

      <RouterLink to="/user/settings">
        <Settings :size="18" />
        Ajustes
      </RouterLink>
    </nav>

    <div class="user-sidebar__profile">
      <div class="user-sidebar__avatar">
        <img
          v-if="userStore.avatar"
          :src="userStore.avatar"
          :alt="userStore.avatarName"
        />
        <span v-else>A</span>
      </div>

      <span>{{ userStore.avatarName }}</span>
    </div>

    <button class="user-sidebar__logout" @click="handleLogout">
      Cerrar sesión
    </button>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { Home, Heart, User, Settings } from "lucide-vue-next";
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped lang="scss">
.user-sidebar {
  width: 210px;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #172133;
  color: white;
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
}

.user-sidebar__logo {
  margin-bottom: 28px;
  font-size: 2rem;
  font-weight: 700;
}

.user-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #cbd5e1;
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.95rem;

    &:hover,
    &.router-link-active {
      background-color: #253247;
      color: #ffffff;
    }
  }
}
.user-sidebar__profile {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 0.85rem;
  line-height: 1.2;
}

.user-sidebar__profile span {
  white-space: nowrap;
}

.user-sidebar__avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-sidebar__logout {
  margin-top: 12px;
  color: #cbd5e1;
  background: transparent;
  border: 1px solid #334155;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background-color: #253247;
    color: #ffffff;
  }
}

@media (max-width: 1000px) {
  .user-sidebar {
    width: 100%;
    height: auto;
    min-height: auto;
    position: static;
  }

  .user-sidebar__nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .user-sidebar__profile {
    margin-top: 16px;
  }
}
</style>
