import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export function useLogout() {
  const authStore = useAuthStore()
  const router = useRouter()

  function logout() {
    authStore.logout()
    router.push('/login')
  }

  return { logout }
}