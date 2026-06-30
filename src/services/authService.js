export const authService = {
  async login(email, password) {
    if (email === 'test@test.com' && password === '123456') {
      return {
        success: true,
        token: 'fake-jwt-token',
        user: {
        email,
        role: 'admin',
        name: 'Administrator'
      }
      }
    }

    return {
      success: false,
      message: 'Invalid email or password.'
    }
  }
}