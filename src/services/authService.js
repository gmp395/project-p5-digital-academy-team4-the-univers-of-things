const ADMIN_EMAIL = 'admin@cinemagic.com'

function seedAdminUser() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const adminExists = users.some((u) => u.email === ADMIN_EMAIL)

  if (!adminExists) {
    users.push({
      name: 'Administrator',
      email: ADMIN_EMAIL,
      password: '123456',
      role: 'admin',
    })
    localStorage.setItem('users', JSON.stringify(users))
  }
}
seedAdminUser()
export const authService = {
  login(email, password) {
  
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (foundUser) {
      return {
        success: true,
        token: 'fake-user-token',
        user: {
          email: foundUser.email,
          name: foundUser.name,
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

    const newUser = { name, email, password, role: 'customer' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    return {
      success: true,
      message: 'Cuenta creada correctamente.',
    }
  },
}
