<template>
  <div class="login-container">
    <section class="login-brand">
      <div class="brand-content">
        <img src="@/assets/Cinemagiclogo.png" alt="CineMagic Logo" />
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
/* Stiller bir sonraki adımda eklenecek */
</style>