import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
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
    expect(store.favorites[0].rating).toBe(0)
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

  it('valora un favorito', () => {
    const store = useFavoritesStore()

    store.addFavorite({
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: 'mickey.jpg',
    })

    store.rateFavorite(1, 5)

    expect(store.favorites[0].rating).toBe(5)
  })
})