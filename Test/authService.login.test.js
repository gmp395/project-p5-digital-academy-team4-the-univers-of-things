import { describe, it, expect, beforeEach } from 'vitest'
import { authService } from '@/services/authService'

describe('authService.login', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  it('should login hardcoded admin user', () => {
    const result = authService.login('admin@cinemagic.com', '123456')
    expect(result.success).toBe(true)
    expect(result.user.role).toBe('admin')
  })
it('should login hardcoded customer user', () => {
    const result = authService.login('user@test.com', '123456')
    expect(result.success).toBe(true)
    expect(result.user.role).toBe('customer')
  })
  it('should login a registered user from localStorage', () => {
    authService.register('Test User', 'test@example.com', '123456')
    const result = authService.login('test@example.com', '123456')
    expect(result.success).toBe(true)
    expect(result.user.role).toBe('customer')
  })
  it('should fail with wrong password', () => {
    authService.register('Test User', 'test@example.com', '123456')
    const result = authService.login('test@example.com', 'wrongpassword')
    expect(result.success).toBe(false)
  })
   it('should fail with unknown email', () => {
    const result = authService.login('unknown@mail.com', '123456')
    expect(result.success).toBe(false)
  })
})