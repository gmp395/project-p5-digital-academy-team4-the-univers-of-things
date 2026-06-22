import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import Hero from './hero.vue'

describe('Hero', () => {
  test('muestra el titulo del hero', () => {
    const wrapper = mount(Hero)

    expect(wrapper.text()).toContain(
      'Descubre la magia de cada personaje'
    )
  })
})