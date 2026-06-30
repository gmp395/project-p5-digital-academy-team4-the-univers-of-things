<template>
  <div class="user-directory -mt-10 px-6">

    <h1 class="text-3xl font-bold text-on-surface mb-8">User Directory</h1>

    <div class="table-container bg-surface-container border glass-stroke rounded-2xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-high border-b glass-stroke">
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Avatar</th>
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Full Name</th>
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Email Address</th>
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary text-center">Security Status</th>
            </tr>
          </thead>
          <tbody class="divide-y glass-stroke">
            <tr v-for="user in adminStore.users" :key="user.id" class="hover:bg-surface-container-low transition-colors group">
              <td class="px-6 py-4">
                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-variant group-hover:border-primary transition-colors">
                  <img :src="user.avatar || `https://i.pravatar.cc/60?u=${user.email}`" :alt="user.name" class="w-full h-full object-cover" />
                </div>
              </td>
              <td class="px-6 py-4 font-body-md text-on-surface font-semibold">{{ user.name }}</td>
              <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ user.email }}</td>
              <td class="px-6 py-4 flex items-center justify-center">
                <button
                  @click="adminStore.toggleUserStatus(user.id)"
                  :class="[
                    'w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 border glass-stroke',
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

<script setup>
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
</script>

<style scoped>
</style>