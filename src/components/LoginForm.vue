<template>
  <form class="login-form" @submit.prevent="handleLogin">

    <div class="input-group">
      <label>Email Address</label>
      <input type="email" placeholder="name@example.com">
    </div>

    <div class="input-group">
      <label>Password</label>
      <input type="password" placeholder="••••••••">
    </div>

    <button type="submit" class="login-btn">
      Log In →
    </button>

  </form>
</template>

<script setup>
const handleLogin = () => {
  console.log("login")
}
</script>