<script setup>
import logo from '../assets/logo.png'
import { Instagram, Twitter } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__brand">
        <img :src="logo" alt="Logo Disney" class="footer__logo" />
      </div>

      <p class="footer__copyright">
        © 2026 Disney. Todos los derechos reservados.
      </p>

      <nav class="footer__social" aria-label="Redes sociales">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram />
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X">
          <Twitter />
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: #0f172a;
  color: #cbd5e1;
  padding: 14px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer__container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.footer__brand {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.footer__logo {
  width: 180px;
  height: auto;
  display: block;
}

.footer__copyright {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #cbd5e1;
  text-align: center;
  white-space: nowrap;
  transform: translateY(-10px);
}

.footer__social {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 22px;
}

.footer__social a {
  color: #cbd5e1;
  transition: color 0.2s ease;
}

.footer__social a:hover {
  color: #60a5fa;
}

.footer__social svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 640px) {
  .footer {
    padding: 22px 20px;
  }

  .footer__container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .footer__brand,
  .footer__social {
    justify-content: center;
  }

  .footer__logo {
    width: 160px;
  }

  .footer__copyright {
    white-space: normal;
    transform: none;
  }
}
</style>