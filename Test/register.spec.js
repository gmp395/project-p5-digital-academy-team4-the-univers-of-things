import { describe, it, expect, beforeEach } from 'vitest'
import { authService } from '@/services/authService'

describe('authService.register', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  it('debe registrar un usuario correctamente', () => {
    const result = authService.register('Juan García', 'juan@test.com', '12345678r')
    expect(result.success).toBe(true)
  })

  it('debe guardar el usuario en localStorage', () => {
    authService.register('Juan García', 'juan@test.com', '123456')
    const users = JSON.parse(localStorage.getItem('users'))
    expect(users).toHaveLength(1)
    expect(users[0].email).toBe('juan@test.com')
  })

  it('debe rechazar un email ya registrado', () => {
    authService.register('Juan García', 'juan@test.com', '12345678r')
    const result = authService.register('Otro Usuario', 'juan@test.com', 'abcdef')
    expect(result.success).toBe(false)
    expect(result.message).toBe('Este email ya está registrado.')
  })

  it('debe permitir registrar múltiples usuarios', () => {
    authService.register('Juan García', 'juan@test.com', '12345678r')
    authService.register('Ana López', 'ana@test.com', '654321')
    const users = JSON.parse(localStorage.getItem('users'))
    expect(users).toHaveLength(2)
  })

})