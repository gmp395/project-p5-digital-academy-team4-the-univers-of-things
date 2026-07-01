import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'

describe('HeaderPublic.vue', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  const mountOptions = {
    global: {
      plugins: [createPinia()],
      stubs: {
        RouterLink: {
          template: '<a><slot /></a>',
        },
      },
    },
  }

  it('debe renderizar el título CineMagic', () => {
    const wrapper = mount(HeaderPublic, mountOptions)
    expect(wrapper.text()).toContain('CineMagic')
  })

  it('debe contener el enlace de Home', () => {
    const wrapper = mount(HeaderPublic, mountOptions)
    expect(wrapper.text()).toContain('Home')
  })

  it('debe contener el enlace de Login', () => {
    const wrapper = mount(HeaderPublic, mountOptions)
    expect(wrapper.text()).toContain('Login')
  })
})