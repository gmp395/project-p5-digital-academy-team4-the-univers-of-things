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
<style scoped>
.register-page {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
}

.register-card {
  width: min(480px, 90vw);
  background: #0d1b2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
}

.register-card h2 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 8px;
}

.subtitle {
  display: block;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 28px;
}

.error-banner {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #13203f;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 0 14px;
  height: 50px;
  gap: 10px;
}

.input-icon {
  color: #64748b;
  flex-shrink: 0;
}

.input-wrapper input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
}

.input-wrapper input::placeholder {
  color: #64748b;
}

.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  display: flex;
  align-items: center;
}

.field-error {
  color: #fca5a5;
  font-size: 12px;
  padding-left: 4px;
}

.register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: #1670ff;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-top: 6px;
}

.login-link {
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}

.login-link a {
  color: #60a5fa;
  font-weight: 600;
  text-decoration: none;
}
</style>