const ADMIN_EMAIL = 'admin@cinemagic.com'

export function seedAdminUser() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const adminExists = users.some((u) => u.email === ADMIN_EMAIL)
  const ADMIN_PASSWORD = atob('MTIzNDU2')

  if (!adminExists) {
    users.push({
      name: 'Administrador',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      status: 'allowed'
    })
    localStorage.setItem('users', JSON.stringify(users))
  }
}

seedAdminUser()

export const authService = {
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    )

    if (!foundUser) {
      return { success: false, message: 'Correo o contraseña incorrectos.' }
    }

    if (foundUser.status === 'restricted') {
      return { success: false, message: 'Tu cuenta ha sido restringida. Contacta al administrador.' }
    }

    return {
      success: true,
      token: 'fake-user-token',
      user: {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      },
    }
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((user) => user.email === email)

    if (existingUser) {
      return { success: false, message: 'Este email ya está registrado.' }
    }

    const newUser = { name, email, password, role: 'customer', status: 'allowed' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    return { success: true, message: 'Cuenta creada correctamente.' }
  },

  getAdminPublicInfo() {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const admin = users.find((user) => user.role === 'admin')
    if (!admin) return null
    return {
      name: admin.name,
      email: admin.email,
      role: admin.role,
    }
  },
}