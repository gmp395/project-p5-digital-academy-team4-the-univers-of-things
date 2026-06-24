export const authService = {
  login(email, password) {
    if (email === 'test@test.com' && password === '123456') {
      return {
        success: true,
        token: 'fake-admin-token',
        user: {
          email,
          role: 'admin',
        },
      }
    }

    if (email === 'user@test.com' && password === '123456') {
      return {
        success: true,
        token: 'fake-customer-token',
        user: {
          email,
          role: 'customer',
        },
      }
    }

    return {
      success: false,
      message: 'Invalid email or password.',
    }
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return {
        success: false,
        message: 'Este email ya está registrado.',
      }
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    return {
      success: true,
      message: 'Cuenta creada correctamente.',
    }
  },
}
