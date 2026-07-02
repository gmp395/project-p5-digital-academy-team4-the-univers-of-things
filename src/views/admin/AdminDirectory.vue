<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()

const refresh = () => adminStore.refreshUsers()

onMounted(() => {
  adminStore.refreshUsers()
  window.addEventListener('avatar-updated', refresh)
  window.addEventListener('storage', refresh)
})

onUnmounted(() => {
  window.removeEventListener('avatar-updated', refresh)
  window.removeEventListener('storage', refresh)
})
</script>

<template>
  <div class="admin-directory">
    <h1 class="admin-directory__title">Directorio de usuarios</h1>

    <div class="table-container bg-surface-container border glass-stroke rounded-2xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-high border-b glass-stroke">
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Nombre completo</th>
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Correo electrónico</th>
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary text-center">Estado de acceso</th>
            </tr>
          </thead>
          <tbody class="divide-y glass-stroke">
            <tr v-for="user in adminStore.users" :key="user.email" class="hover:bg-surface-container-low transition-colors group">
              <td class="px-6 py-4 font-body-md text-on-surface font-semibold">{{ user.name }}</td>
              <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ user.email }}</td>
              <td class="px-6 py-4 text-center">
                <button
                  @click="adminStore.toggleUserStatus(user.email)"
                  :class="[
                    'w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 border glass-stroke mx-auto',
                    user.status === 'allowed' ? 'bg-primary' : 'bg-surface-variant'
                  ]"
                >
                  <div
                    :class="[
                      'w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md',
                      user.status === 'allowed' ? 'translate-x-7' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-directory {
  padding: 40px 48px 24px;

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 32px;
  }
}
</style>