<template>
  <div class="register-page">
    <div class="register-card">

      <h2>Crear Cuenta</h2>
      <p class="subtitle">Únete al círculo premier de la excelencia cinematográfica.</p>

      <!-- Error banner -->
      <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>

      <form class="register-form" @submit.prevent="handleRegister">

        <!-- Nombre -->
        <div class="field">
          <div class="input-wrapper">
            <User class="input-icon" :size="18" />
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Nombre completo"
            />
          </div>
          <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
        </div>

        <!-- Email -->
        <div class="field">
          <div class="input-wrapper">
            <Mail class="input-icon" :size="18" />
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Correo electrónico"
            />
          </div>
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <!-- Contraseña -->
        <div class="field">
          <div class="input-wrapper">
            <Lock class="input-icon" :size="18" />
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Contraseña"
            />
            <button type="button" class="eye-btn" @click="showPassword = !showPassword">
              <Eye v-if="!showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <!-- Confirmar Contraseña -->
        <div class="field">
          <div class="input-wrapper">
            <ShieldCheck class="input-icon" :size="18" />
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
            />
          </div>
          <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
        </div>

        <button type="submit" class="register-btn">
          Registrarse
          <ArrowRight :size="18" />
        </button>

        <p class="login-link">
          ¿Ya tienes cuenta?
          <RouterLink to="/login">Inicia sesión aquí</RouterLink>
        </p>

      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-vue-next'

const router = useRouter()

const showPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errorMessage = ref('')

function validateForm() {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio.'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'El email es obligatorio.'
    valid = false
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria.'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.'
    valid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña.'
    valid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden.'
    valid = false
  }

  return valid
}

function handleRegister() {
  errorMessage.value = ''
  if (!validateForm()) return

  const result = authService.register(form.name, form.email, form.password)

  if (result.success) {
    router.push({ name: 'login', query: { registered: 'true' } })
  } else {
    errorMessage.value = result.message
  }
}
</script>