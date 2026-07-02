import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import HeaderPublic from '@/components/layout/HeaderPublic.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div/>' } }]
})

describe('HeaderPublic.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe renderizar el título CineMagic', () => {
    const wrapper = mount(HeaderPublic, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('CineMagic')
  })

})