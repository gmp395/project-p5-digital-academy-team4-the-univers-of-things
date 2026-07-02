import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AdminDirectory from '@/views/admin/AdminDirectory.vue'
import { useAdminStore } from '@/stores/adminStore'

describe('AdminDirectory.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  // ─── Render básico ────────────────────────────────────────────
  describe('render', () => {
    it('muestra el título "Directorio de usuarios"', () => {
      const wrapper = mount(AdminDirectory)
      expect(wrapper.find('h1').text()).toBe('Directorio de usuarios')
    })

    it('muestra las cabeceras de la tabla', () => {
      const wrapper = mount(AdminDirectory)
      const headers = wrapper.findAll('th')
      expect(headers[0].text()).toBe('Nombre completo')
      expect(headers[1].text()).toBe('Correo electrónico')
      expect(headers[2].text()).toBe('Estado de acceso')
    })

    it('muestra una fila por cada usuario', async () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana García', email: 'ana@test.com', status: 'allowed' },
        { name: 'Luis Pérez', email: 'luis@test.com', status: 'restricted' }
      ]))
      const wrapper = mount(AdminDirectory)
      await wrapper.vm.$nextTick()
      const rows = wrapper.findAll('tbody tr')
      expect(rows).toHaveLength(2)
    })

    it('muestra el nombre y email de cada usuario', async () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'María López', email: 'maria@test.com', status: 'allowed' }
      ]))
      const wrapper = mount(AdminDirectory)
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain('María López')
      expect(wrapper.text()).toContain('maria@test.com')
    })

    it('no muestra filas cuando no hay usuarios', () => {
      const wrapper = mount(AdminDirectory)
      const rows = wrapper.findAll('tbody tr')
      expect(rows).toHaveLength(0)
    })
  })

  // ─── Ciclo de vida ────────────────────────────────────────────
  describe('ciclo de vida', () => {
    it('llama a refreshUsers al montar el componente', () => {
      const store = useAdminStore()
      const spy = vi.spyOn(store, 'refreshUsers')
      mount(AdminDirectory)
      expect(spy).toHaveBeenCalledOnce()
    })

    it('registra los event listeners al montar', () => {
      const addSpy = vi.spyOn(window, 'addEventListener')
      mount(AdminDirectory)
      expect(addSpy).toHaveBeenCalledWith('avatar-updated', expect.any(Function))
      expect(addSpy).toHaveBeenCalledWith('storage', expect.any(Function))
    })

    it('elimina los event listeners al desmontar', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const wrapper = mount(AdminDirectory)
      wrapper.unmount()
      expect(removeSpy).toHaveBeenCalledWith('avatar-updated', expect.any(Function))
      expect(removeSpy).toHaveBeenCalledWith('storage', expect.any(Function))
    })

    it('llama a refreshUsers cuando se dispara el evento "avatar-updated"', async () => {
      const store = useAdminStore()
      mount(AdminDirectory)
      const spy = vi.spyOn(store, 'refreshUsers')
      window.dispatchEvent(new Event('avatar-updated'))
      expect(spy).toHaveBeenCalled()
    })

    it('llama a refreshUsers cuando se dispara el evento "storage"', async () => {
      const store = useAdminStore()
      mount(AdminDirectory)
      const spy = vi.spyOn(store, 'refreshUsers')
      window.dispatchEvent(new Event('storage'))
      expect(spy).toHaveBeenCalled()
    })
  })

  // ─── Toggle de estado ─────────────────────────────────────────
  describe('toggle de estado', () => {
    it('llama a toggleUserStatus con el email correcto al hacer clic', async () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' }
      ]))
      const wrapper = mount(AdminDirectory)
      await wrapper.vm.$nextTick()
      const store = useAdminStore()
      const spy = vi.spyOn(store, 'toggleUserStatus')
      await wrapper.find('button').trigger('click')
      expect(spy).toHaveBeenCalledWith('ana@test.com')
    })

    it('cambia el status del usuario de allowed a restricted al hacer clic', async () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' }
      ]))
      const wrapper = mount(AdminDirectory)
      await wrapper.vm.$nextTick()
      await wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()
      const store = useAdminStore()
      expect(store.users[0].status).toBe('restricted')
    })

    it('cada fila tiene su propio botón de toggle', async () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' },
        { name: 'Luis', email: 'luis@test.com', status: 'allowed' }
      ]))
      const wrapper = mount(AdminDirectory)
      await wrapper.vm.$nextTick()
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(2)
    })
  })
})