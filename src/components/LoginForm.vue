<template>
  <div class="login-form">
    <h2>Log In</h2>
    <p>Enter your details to access your account.</p>
    
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" placeholder="name@example.com" />
      </div>
      
      <div class="input-group">
        <div class="label-row">
          <label for="password">Password</label>
          <span class="forgot-pass">Forgot password?</span>
        </div>
        <input type="password" id="password" placeholder="••••••••" />
      </div>
      
      <button type="submit" class="login-btn">Log In →</button>
    </form>
  </div>
</template>

<style scoped>
.login-form { width: 100%; color: white; }
h2 { font-size: 2rem; margin-bottom: 0.5rem; }
p { color: #94a3b8; margin-bottom: 2rem; }

.input-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; }

input {
  width: 100%;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: white;
  box-sizing: border-box;
}

.label-row { display: flex; justify-content: space-between; }
.forgot-pass { font-size: 0.8rem; color: #3b82f6; cursor: pointer; }

.login-btn {
  width: 100%;
  padding: 12px;
  background: #0066ff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
</style>