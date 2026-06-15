<template>
  <div class="login-container">
    <section class="login-brand">
      <div class="brand-content">
        <img src="@/assets/logo.png" alt="Logo" class="brand-logo" />
        <h1>CineMagic</h1>
        <p>Inicia sesión para descubrir la magia de cada personaje y gestionar tus favoritos.</p>
      </div>
    </section>

    <section class="login-form-side">
      <LoginForm />
    </section>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>

<style scoped>
.login-container { display: flex; height: 100vh; width: 100%; }

.login-brand {
  flex: 1;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('@/assets/cineresim.jpg');
  background-size: cover;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: white; text-align: center; padding: 20px;
}

.login-form-side {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  background-color: #0f172a;
  padding: 40px;
}
.brand-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 80%; /* Yazıların çok yayılmasını engeller */
}

.brand-logo {
  width: 80px; /* Logonun boyutunu buradan kontrol edebilirsin */
  margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; margin-bottom: 1rem; }
</style>