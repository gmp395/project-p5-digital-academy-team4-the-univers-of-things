<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="input-group">
      <label>Email Address</label>
      <input v-model="email" type="email" placeholder="name@example.com" />
    </div>

    <div class="input-group">
      <label>Password</label>
      <input v-model="password" type="password" placeholder="••••••••" />
    </div>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <button type="submit" class="login-btn" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Log In →' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const success = await authStore.login(
      email.value,
      password.value
    )

    console.log('success:', success)

    if (success) {
      await router.push('/admin')
    } else {
      errorMessage.value = 'Invalid email or password'
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>