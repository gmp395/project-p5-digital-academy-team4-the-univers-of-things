<template>
  <div class="login-form">
    <h2>Log In</h2>
    <p>Enter your details to access your account.</p>
    
    <form @submit.prevent="handleLogin">
      <label for="email">Email Address</label>
      <input type="email" id="email" placeholder="name@example.com" />
      
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="********" />
      
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script setup>
const handleLogin = () => {
  console.log("Login denemesi yapıldı");
};
</script>

<style scoped>
.login-form {
  padding: 20px;
}
</style>