import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAdminStore } from '@/stores/adminStore'

describe('adminStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  // ─── Estado inicial ───────────────────────────────────────────
  describe('state', () => {
    it('inicia con un array de usuarios vacío', () => {
      const store = useAdminStore()
      expect(store.users).toEqual([])
    })

    it('carga el avatar desde localStorage si existe', () => {
      localStorage.setItem('adminProfile', JSON.stringify({ avatar: 'avatar-1.png' }))
      const store = useAdminStore()
      expect(store.avatar).toBe('avatar-1.png')
    })

    it('avatar es null si no hay adminProfile en localStorage', () => {
      const store = useAdminStore()
      expect(store.avatar).toBeNull()
    })
  })

  // ─── Getter totalUsers ────────────────────────────────────────
  describe('totalUsers', () => {
    it('devuelve 0 cuando no hay usuarios', () => {
      const store = useAdminStore()
      expect(store.totalUsers).toBe(0)
    })

    it('devuelve el número correcto de usuarios', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com' },
        { name: 'Luis', email: 'luis@test.com' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      expect(store.totalUsers).toBe(2)
    })
  })

  // ─── refreshUsers() ───────────────────────────────────────────
  describe('refreshUsers()', () => {
    it('carga usuarios desde localStorage', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'María', email: 'maria@test.com', role: 'customer' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      expect(store.users).toHaveLength(1)
      expect(store.users[0].name).toBe('María')
    })

    it('asigna status "allowed" por defecto si el usuario no tiene status', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Juan', email: 'juan@test.com' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      expect(store.users[0].status).toBe('allowed')
    })

    it('conserva el status existente del usuario', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Pedro', email: 'pedro@test.com', status: 'restricted' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      expect(store.users[0].status).toBe('restricted')
    })

    it('devuelve array vacío si no hay usuarios en localStorage', () => {
      const store = useAdminStore()
      store.refreshUsers()
      expect(store.users).toEqual([])
    })

    it('persiste los usuarios normalizados en localStorage', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Carla', email: 'carla@test.com' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      const saved = JSON.parse(localStorage.getItem('users'))
      expect(saved[0].status).toBe('allowed')
    })
  })

  // ─── toggleUserStatus() ───────────────────────────────────────
  describe('toggleUserStatus()', () => {
    it('cambia status de "allowed" a "restricted"', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      store.toggleUserStatus('ana@test.com')
      expect(store.users[0].status).toBe('restricted')
    })

    it('cambia status de "restricted" a "allowed"', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'restricted' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      store.toggleUserStatus('ana@test.com')
      expect(store.users[0].status).toBe('allowed')
    })

    it('solo modifica el usuario indicado, no los demás', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' },
        { name: 'Luis', email: 'luis@test.com', status: 'allowed' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      store.toggleUserStatus('ana@test.com')
      expect(store.users[0].status).toBe('restricted')
      expect(store.users[1].status).toBe('allowed')
    })

    it('guarda el cambio en localStorage', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      store.toggleUserStatus('ana@test.com')
      const saved = JSON.parse(localStorage.getItem('users'))
      expect(saved[0].status).toBe('restricted')
    })

    it('no modifica nada si el email no existe', () => {
      localStorage.setItem('users', JSON.stringify([
        { name: 'Ana', email: 'ana@test.com', status: 'allowed' }
      ]))
      const store = useAdminStore()
      store.refreshUsers()
      store.toggleUserStatus('noexiste@test.com')
      expect(store.users[0].status).toBe('allowed')
    })
  })

  // ─── setAvatar() ──────────────────────────────────────────────
  describe('setAvatar()', () => {
    it('actualiza el avatar en el estado', () => {
      const store = useAdminStore()
      store.setAvatar('avatar-2.png')
      expect(store.avatar).toBe('avatar-2.png')
    })

    it('guarda el avatar en localStorage', () => {
      const store = useAdminStore()
      store.setAvatar('avatar-3.png')
      const saved = JSON.parse(localStorage.getItem('adminProfile'))
      expect(saved.avatar).toBe('avatar-3.png')
    })

    it('sobreescribe el avatar anterior', () => {
      const store = useAdminStore()
      store.setAvatar('avatar-1.png')
      store.setAvatar('avatar-5.png')
      expect(store.avatar).toBe('avatar-5.png')
    })
  })
})