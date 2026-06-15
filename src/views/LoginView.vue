<template>
  <div class="login-page">
    <div class="login-card">

      <section class="brand-side">
        <div class="overlay-content">

          <h1>CineMagic</h1>

          <p>
            Inicia sesión para descubrir la magia
            de cada personaje y gestionar tus favoritos.
          </p>
        </div>
      </section>

      <section class="form-side">
        <div class="form-wrapper">
          <h2>Log In</h2>

          <span class="subtitle">
            Enter your details to access your account.
          </span>

          <LoginForm />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>

.login-page{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;

  background:
  radial-gradient(
    circle at left,
    #08204d 0%,
    #020918 60%
  );
}

.login-card{
  width:min(1100px,90vw);
  height:540px;

  display:flex;

  border-radius:24px;
  overflow:hidden;

  background:
  linear-gradient(
    90deg,
    #0d1835 0%,
    #182443 50%,
    #1b2848 100%
  );

  border:1px solid rgba(255,255,255,.08);

  box-shadow:
    0 0 0 1px rgba(255,255,255,.03),
    0 15px 40px rgba(0,0,0,.45);
}
/* SOL TARAF */

.brand-side{
  flex:1;

  position:relative;

  background-image:
   linear-gradient(
    rgba(5,15,40,.20),
    rgba(5,15,40,.35)
  ),
  url("@/assets/Cinemagiclogo.png");

  background-size:cover;
  background-position:center;
}

.overlay-content{
  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  width:80%;

  text-align:center;

  color:white;
}

.icon-logo{
  width:40px;
  margin-bottom:20px;
}

.overlay-content h1{
  font-size:42px;
  font-weight:700;
  margin-bottom:18px;
}

.overlay-content p{
  font-size:16px;
  line-height:1.8;
  max-width:420px;
  margin:0 auto;
  color:#dbe4ff;
}

/* SAĞ TARAF */

.form-side{
  flex:1;

  display:flex;
  align-items:center;

  padding:60px;

  background:transparent;
}

.form-wrapper{
  width:100%;
  max-width:420px;
}

.form-wrapper h2{
  font-size:42px;
  color:white;
  margin-bottom:12px;
}

.subtitle{
  display:block;
  color:#cbd5e1;
  margin-bottom:50px;
}

:deep(.login-form){
  display:flex;
  flex-direction:column;
  gap:22px;
}

:deep(label){
  display:block;
  color:white;
  margin-bottom:8px;
}

:deep(input){
  width:100%;
  height:52px;

  background:#13203f;

  border:1px solid rgba(255,255,255,.12);

  border-radius:12px;

  color:white;

  padding:0 16px;
}

:deep(.login-btn){
  width:100%;
  height:52px;

  border:none;
  border-radius:12px;

  background:#1670ff;

  color:white;
  font-weight:600;
  font-size:18px;

  cursor:pointer;

  margin-top:10px;
}

</style>