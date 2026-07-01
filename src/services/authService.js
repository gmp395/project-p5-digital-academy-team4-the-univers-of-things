const ADMIN_EMAIL = 'admin@cinemagic.com'
const ADMIN_PASSWORD = atob('MTIzNDU2')

export function seedAdminUser() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const adminExists = users.some((u) => u.email === ADMIN_EMAIL)
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
  async login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, message: 'Correo o contraseña incorrectos.' }
    }

    if (user.status === 'restricted') {
      return { success: false, message: 'Tu cuenta ha sido restringida. Contacta al administrador.' }
    }

    return {
      success: true,
      token: 'fake-jwt-token',
      user: {
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    }
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, message: 'Este email ya está registrado.' }
    }
    const newUser = { name, email, password, role: 'user', status: 'allowed' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return { success: true, message: 'Cuenta creada correctamente.' }
  }
}