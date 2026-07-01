import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import UserDashboardView from '@/views/UserDashboardView.vue'

describe('UserDashboardView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('muestra el título de la página', () => {
    const wrapper = mount(UserDashboardView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          UserSidebar: true,
          UserInfoCard: true,
          UserStatsCard: true,
          Footer: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Tu espacio personal')
    expect(wrapper.text()).toContain(
      'Accede a tu perfil, favoritos y ajustes desde aquí.'
    )
  })
})