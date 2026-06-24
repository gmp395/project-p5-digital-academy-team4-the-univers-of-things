<template>
  <div class="settings-page">
    <UserSidebar />

    <main class="settings-page__content">
      <section class="settings-page__header">
        <h1>Ajustes de cuenta</h1>
        <p>Gestiona tu avatar y cambia tu contraseña.</p>
      </section>

      <section class="settings-page__card">
        <h2>Avatar de perfil</h2>

        <div class="settings-page__avatar-row">
          <div class="settings-page__avatar-main">
            <img
              v-if="selectedAvatar"
              :src="selectedAvatar"
              :alt="selectedCharacterName"
            />
            <span v-else>A</span>
          </div>

          <div class="settings-page__avatar-info">
            <label for="character-avatar">
              Elige un personaje Disney como avatar.
            </label>

            <select
              id="character-avatar"
              v-model="selectedCharacterId"
              @change="updateAvatar"
            >
              <option value="">Selecciona un personaje</option>

              <option
                v-for="character in characters"
                :key="character._id"
                :value="character._id"
              >
                {{ character.name }}
              </option>
            </select>

            <p
              v-if="selectedCharacterName"
              class="settings-page__selected-name"
            >
              Avatar seleccionado: {{ selectedCharacterName }}
            </p>
          </div>
        </div>
      </section>

      <section class="settings-page__card">
        <h2>Cambiar contraseña</h2>

        <form class="settings-page__form">
          <label>
            Contraseña actual
            <input
              type="password"
              placeholder="Introduce tu contraseña actual"
            />
          </label>

          <div class="settings-page__form-row">
            <label>
              Nueva contraseña
              <input type="password" placeholder="Nueva contraseña" />
            </label>

            <label>
              Confirmar contraseña
              <input type="password" placeholder="Confirma la contraseña" />
            </label>
          </div>

          <button type="button">Actualizar contraseña</button>
        </form>
      </section>

      <div class="settings-page__footer">
        <Footer />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import UserSidebar from '@/components/user/UserSidebar.vue'
import Footer from '@/components/Footer.vue'

const characters = ref([])
const selectedCharacterId = ref('')
const selectedAvatar = ref(localStorage.getItem('userAvatar') || '')
const selectedCharacterName = ref(localStorage.getItem('userAvatarName') || '')

const selectedCharacter = computed(() =>
  characters.value.find(
    (character) => character._id === Number(selectedCharacterId.value),
  ),
)

const getCharacters = async () => {
  try {
    const response = await fetch(
      'https://api.disneyapi.dev/character?page=1&pageSize=50',
    )

    const data = await response.json()

    characters.value = data.data.filter((character) => character.imageUrl)
  } catch (error) {
    console.error('Error al cargar personajes Disney:', error)
  }
}

const updateAvatar = () => {
  if (!selectedCharacter.value) return

  selectedAvatar.value = selectedCharacter.value.imageUrl
  selectedCharacterName.value = selectedCharacter.value.name

  localStorage.setItem('userAvatar', selectedAvatar.value)
  localStorage.setItem('userAvatarName', selectedCharacterName.value)
}

onMounted(() => {
  getCharacters()
})
</script>

<style scoped lang="scss">
.settings-page {
  display: flex;
  min-height: 100vh;
  background: #0f172a;
}

.settings-page__content {
  flex: 1;
  padding: 24px 48px 16px;
  color: white;
  display: flex;
  flex-direction: column;
}

.settings-page__header {
  margin-bottom: 16px;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 6px;
  }

  p {
    color: #cbd5e1;
  }
}

.settings-page__card {
  max-width: 760px;
  background: #172133;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 14px 22px;
  margin-bottom: 12px;
}

.settings-page__avatar-row {
  display: flex;
  align-items: center;
  gap: 28px;

  p {
    color: #cbd5e1;
    margin-bottom: 16px;
  }
}

.settings-page__avatar-main {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.settings-page__avatar-info {
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    color: #cbd5e1;
    font-size: 0.9rem;
  }

  select {
    width: 100%;
    max-width: 420px;
    background: #253247;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 12px;
    color: white;
  }
}

.settings-page__selected-name {
  color: #cbd5e1;
  font-size: 0.9rem;
  margin: 0;
}

.settings-page__form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    color: #cbd5e1;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input {
    background: #253247;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 12px;
    color: white;
  }

  button {
    align-self: flex-end;
    background: #93c5fd;
    color: #0f172a;
    border: none;
    border-radius: 8px;
    padding: 12px 18px;
    font-weight: 700;
    cursor: pointer;
  }
}

.settings-page__form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.settings-page__footer {
  margin-top: 8px;
}

@media (max-width: 1000px) {
  .settings-page {
    flex-direction: column;
  }

  .settings-page__content {
    padding: 20px;
  }

  .settings-page__card {
    max-width: 100%;
  }

  .settings-page__avatar-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .settings-page__avatar-info {
    width: 100%;
  }

  .settings-page__avatar-info select {
    max-width: 100%;
  }

  .settings-page__form-row {
    grid-template-columns: 1fr;
  }
}
</style>