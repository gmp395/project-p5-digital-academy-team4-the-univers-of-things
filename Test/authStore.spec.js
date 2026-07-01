import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

vi.mock('@/services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}))

import { authService } from '@/services/authService'

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('inicia sesión correctamente', async () => {
    authService.login.mockResolvedValue({
      success: true,
      token: 'fake-token',
      user: {
        email: 'test@test.com',
        role: 'customer',
      },
    })

    const store = useAuthStore()

    const result = await store.login('test@test.com', '123456')

    expect(result).toBe(true)
    expect(store.isAuthenticated).toBe(true)
    expect(store.token).toBe('fake-token')
  })

  it('cierra la sesión correctamente', () => {
    const store = useAuthStore()

    store.logout()

    expect(store.user).toBe(null)
    expect(store.token).toBe(null)
    expect(store.isAuthenticated).toBe(false)
  })
})