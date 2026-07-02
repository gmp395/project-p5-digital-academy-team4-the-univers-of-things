import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    const authStore = useAuthStore()
    authStore.user = { email: 'test@test.com' }
  })

  it('añade un favorito', () => {
    const store = useFavoritesStore()
    store.addFavorite({
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    })
    expect(store.favorites).toHaveLength(1)
    expect(store.favorites[0].customTitle).toBe('Mickey Mouse')
    expect(store.favorites[0].customDescription).toBe(
      'Personaje del universo Disney.'
    )
  })

  it('no añade favoritos duplicados', () => {
    const store = useFavoritesStore()
    const favorite = {
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    }
    store.addFavorite(favorite)
    store.addFavorite(favorite)
    expect(store.favorites).toHaveLength(1)
  })

  it('elimina un favorito', () => {
    const store = useFavoritesStore()
    store.addFavorite({
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    })
    store.removeFavorite(1)
    expect(store.favorites).toHaveLength(0)
  })

  it('edita la descripción de un favorito', () => {
    const store = useFavoritesStore()
    store.addFavorite({
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    })
    store.updateFavorite(1, {
      customDescription: 'Mi personaje favorito',
    })
    expect(store.favorites[0].customDescription).toBe(
      'Mi personaje favorito'
    )
  })

  it('valora un personaje', () => {
    const store = useFavoritesStore()
    const character = {
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    }
    store.rateCharacter(character, 5)
    expect(store.getRating(1)).toBe(5)
  })
})