<template>
  <div class="settings-page">
    <UserSidebar />

    <div class="settings-page__main">
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
              <label>
                Inicial
                <select v-model="selectedLetter">
                  <option value="">Todas</option>
                  <option
                    v-for="letter in alphabet"
                    :key="letter"
                    :value="letter"
                  >
                    {{ letter }}
                  </option>
                </select>
              </label>

              <label>
                Personaje
                <select v-model="selectedCharacterId">
                  <option value="">Selecciona un personaje</option>
                  <option
                    v-for="character in filteredCharacters"
                    :key="character._id"
                    :value="character._id"
                  >
                    {{ character.name }}
                  </option>
                </select>
              </label>

              <label class="settings-page__search">
                Buscar personaje
                <input
                  v-model="searchCharacter"
                  type="text"
                  placeholder="Ejemplo: Baloo"
                  @input="selectedLetter = ''"
                />

                <ul
                  v-if="searchCharacter && filteredCharacters.length"
                  class="settings-page__suggestions"
                >
                  <li
                    v-for="character in filteredCharacters.slice(0, 5)"
                    :key="character._id"
                    @click="selectSuggestedCharacter(character)"
                  >
                    {{ character.name }}
                  </li>
                </ul>
              </label>

              <button
                type="button"
                class="settings-page__avatar-button"
                @click="updateAvatar"
              >
                Guardar avatar
              </button>

              <p
                v-if="selectedLetter && filteredCharacters.length === 0"
                class="settings-page__empty-message"
              >
                No hay personajes con esa inicial.
              </p>

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

          <form class="settings-page__form" @submit.prevent="updatePassword">
            <label>
              Contraseña actual
              <div class="settings-page__password-field">
                <input
                  v-model="currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  placeholder="Introduce tu contraseña actual"
                />
                <button
                  type="button"
                  class="settings-page__eye-button"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <EyeOff v-if="showCurrentPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
            </label>

            <div class="settings-page__form-row">
              <label>
                Nueva contraseña
                <div class="settings-page__password-field">
                  <input
                    v-model="newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    placeholder="Nueva contraseña"
                  />
                  <button
                    type="button"
                    class="settings-page__eye-button"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <EyeOff v-if="showNewPassword" :size="18" />
                    <Eye v-else :size="18" />
                  </button>
                </div>
              </label>

              <label>
                Confirmar contraseña
                <div class="settings-page__password-field">
                  <input
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirma la contraseña"
                  />
                  <button
                    type="button"
                    class="settings-page__eye-button"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <EyeOff v-if="showConfirmPassword" :size="18" />
                    <Eye v-else :size="18" />
                  </button>
                </div>
              </label>
            </div>

            <p v-if="passwordMessage" class="settings-page__password-message">
              {{ passwordMessage }}
            </p>

            <button type="submit" class="settings-page__password-submit">
              Actualizar contraseña
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import UserSidebar from '@/components/user/UserSidebar.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const characters = ref([])
const selectedCharacterId = ref('')
const selectedAvatar = ref(localStorage.getItem('userAvatar') || '')
const selectedCharacterName = ref(localStorage.getItem('userAvatarName') || '')
const selectedLetter = ref('')
const searchCharacter = ref('')
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordMessage = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const filteredCharacters = computed(() => {
  const search = searchCharacter.value.trim().toLowerCase()

  return characters.value
    .filter((character) => {
      const name = character.name.toLowerCase()

      const matchesLetter = selectedLetter.value
        ? name.startsWith(selectedLetter.value.toLowerCase())
        : true

      const matchesSearch = search ? name.includes(search) : true

      return matchesLetter && matchesSearch
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

const selectedCharacter = computed(() =>
  characters.value.find(
    (character) => String(character._id) === String(selectedCharacterId.value),
  ),
)

const selectSuggestedCharacter = (character) => {
  selectedCharacterId.value = character._id
  searchCharacter.value = character.name
}

const getCharacters = async () => {
  try {
    const firstResponse = await fetch(
      'https://api.disneyapi.dev/character?page=1&pageSize=50',
    )

    const firstData = await firstResponse.json()
    const totalPages = firstData.info.totalPages
    const requests = []

    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=50`)
          .then((response) => response.json()),
      )
    }

    const pages = await Promise.all(requests)
    const allCharacters = pages.flatMap((page) => page.data)

    characters.value = allCharacters
      .filter((character) => character.imageUrl)
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error al cargar personajes Disney:', error)
  }
}

const updateAvatar = () => {
  if (!selectedCharacter.value) return

  selectedAvatar.value = selectedCharacter.value.imageUrl
  selectedCharacterName.value = selectedCharacter.value.name

  userStore.setAvatar(selectedAvatar.value, selectedCharacterName.value)

  selectedCharacterId.value = ''
  selectedLetter.value = ''
  searchCharacter.value = ''
}

const updatePassword = () => {
  const savedUserPassword = localStorage.getItem('userPassword') || '123456'

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordMessage.value = 'Completa todos los campos.'
    return
  }

  if (currentPassword.value !== savedUserPassword) {
    passwordMessage.value = 'La contraseña actual no es correcta.'
    return
  }

  if (newPassword.value.length < 6) {
    passwordMessage.value =
      'La nueva contraseña debe tener al menos 6 caracteres.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  localStorage.setItem('userPassword', newPassword.value)

  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  passwordMessage.value = 'Contraseña actualizada correctamente.'
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

.settings-page__main {
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.settings-page__content {
  flex: 1;
  padding: 24px 48px 16px;
  color: white;
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
  align-items: flex-start;
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
  margin-top: 28px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.settings-page__avatar-info {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px 16px;
  align-items: end;
  width: 100%;
  max-width: 620px;

  label {
    color: #cbd5e1;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label:nth-child(3) {
    grid-column: 1 / -1;
  }

  select,
  input {
    background: #253247;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 10px 12px;
    color: white;
  }
}

.settings-page__avatar-button {
  grid-column: 1 / -1;
  justify-self: start;
  color: #cbd5e1;
  background: transparent;
  border: 1px solid #334155;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background-color: #253247;
    color: #ffffff;
  }
}

.settings-page__search {
  position: relative;
}

.settings-page__suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  background: #253247;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;

  li {
    padding: 8px 10px;
    cursor: pointer;
    color: #cbd5e1;

    &:hover {
      background: #334155;
      color: #ffffff;
    }
  }
}

.settings-page__empty-message {
  grid-column: 1 / -1;
  color: #fca5a5;
  font-size: 0.85rem;
  margin: 0;
}

.settings-page__selected-name {
  grid-column: 1 / -1;
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
    background: transparent;
    border: none;
    padding: 12px;
    color: white;
    width: 100%;
  }
}

.settings-page__form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.settings-page__password-field {
  display: flex;
  align-items: center;
  background: #253247;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}

.settings-page__eye-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    color: #ffffff;
  }
}

.settings-page__password-message {
  color: #cbd5e1;
  font-size: 0.9rem;
  margin: 0;
}

.settings-page__password-submit {
  align-self: flex-end;
  background: #93c5fd;
  color: #0f172a;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #bfdbfe;
  }
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

  .settings-page__avatar-main {
    margin-top: 0;
  }

  .settings-page__avatar-info {
    grid-template-columns: 1fr;
  }

  .settings-page__form-row {
    grid-template-columns: 1fr;
  }
}
</style>