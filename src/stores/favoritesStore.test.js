import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from './favoritesStore'
import { useAuthStore } from './authStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('añade un personaje a favoritos', () => {
    const authStore = useAuthStore()
    authStore.user = { email: 'user@test.com', role: 'customer' }

    const favoritesStore = useFavoritesStore()

    const character = {
      _id: 1,
      name: 'Stitch',
      imageUrl: 'stitch.jpg'
    }

    favoritesStore.addFavorite(character)

    expect(favoritesStore.favorites).toHaveLength(1)
    expect(favoritesStore.favorites[0].name).toBe('Stitch')
  })

  it('no añade favoritos duplicados', () => {
    const authStore = useAuthStore()
    authStore.user = { email: 'user@test.com', role: 'customer' }

    const favoritesStore = useFavoritesStore()

    const character = {
      _id: 1,
      name: 'Stitch',
      imageUrl: 'stitch.jpg'
    }

    favoritesStore.addFavorite(character)
    favoritesStore.addFavorite(character)

    expect(favoritesStore.favorites).toHaveLength(1)
  })

  it('quita un personaje de favoritos', () => {
    const authStore = useAuthStore()
    authStore.user = { email: 'user@test.com', role: 'customer' }

    const favoritesStore = useFavoritesStore()

    const character = {
      _id: 1,
      name: 'Stitch',
      imageUrl: 'stitch.jpg'
    }

    favoritesStore.addFavorite(character)
    favoritesStore.removeFavorite(1)

    expect(favoritesStore.favorites).toHaveLength(0)
  })

  it('guarda una puntuación sin añadir a favoritos', () => {
    const authStore = useAuthStore()
    authStore.user = { email: 'user@test.com', role: 'customer' }

    const favoritesStore = useFavoritesStore()

    const character = {
      _id: 1,
      name: 'Stitch',
      imageUrl: 'stitch.jpg'
    }

    favoritesStore.rateCharacter(character, 5)

    expect(favoritesStore.ratings).toHaveLength(1)
    expect(favoritesStore.ratings[0].rating).toBe(5)
    expect(favoritesStore.favorites).toHaveLength(0)
  })

  it('devuelve la puntuación de un personaje', () => {
    const authStore = useAuthStore()
    authStore.user = { email: 'user@test.com', role: 'customer' }

    const favoritesStore = useFavoritesStore()

    const character = {
      _id: 1,
      name: 'Stitch',
      imageUrl: 'stitch.jpg'
    }

    favoritesStore.rateCharacter(character, 4)

    expect(favoritesStore.getRating(1)).toBe(4)
  })
})