<template>
  <div class="user-directory -mt-10 px-6">
    <h1 class="text-3xl font-bold text-on-surface mb-8">Ajustes de usuario</h1>

    <!-- Avatar -->
    <div class="bg-surface-container border glass-stroke rounded-2xl p-6 mb-6">
      <h2 class="font-semibold text-xl text-on-surface mb-1">Avatar de perfil</h2>
      <p class="text-on-surface-variant text-sm mb-4">Elige un personaje Disney o sube una foto desde tu equipo.</p>

      <!-- Preview -->
      <div class="flex items-center gap-4 mb-4">
        <img :src="previewAvatar" alt="Avatar"
          class="w-16 h-16 rounded-full border-2 border-surface-variant object-cover shrink-0"
        />
        <div>
          <p class="text-sm text-on-surface font-medium">
            {{ uploadFileName || selectedCharacter?.name || 'Sin seleccionar' }}
          </p>
          <p class="text-xs text-on-surface-variant">Avatar actual del administrador</p>
        </div>
        <button
          @click="saveAvatar"
          :disabled="!selectedCharacter && !uploadedAvatar"
          class="ml-auto px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Guardar avatar
        </button>
      </div>

      <!-- Buscador -->
      <input
        v-model="query"
        type="text"
        placeholder="Buscar personaje (ej: Mickey)"
        class="w-full bg-surface-container-high rounded-lg px-4 py-2 text-on-surface mb-3"
      />

      <p v-if="loading" class="text-on-surface-variant text-sm mb-2">Cargando personajes...</p>
      <p v-if="!query.trim() && !loading" class="text-on-surface-variant text-sm mb-2">
        Escribe un nombre para buscar.
      </p>

      <!-- Resultados en scroll horizontal -->
      <div class="flex gap-3 overflow-x-auto pb-2 mb-4">
        <div
          v-for="character in filteredCharacters"
          :key="character._id"
          @click="selectCharacter(character)"
          :class="[
            'shrink-0 w-20 bg-surface-container-high rounded-xl p-1.5 text-center cursor-pointer border-2 transition',
            selectedCharacter?._id === character._id
              ? 'border-primary'
              : 'border-transparent hover:border-surface-variant'
          ]"
        >
          <img
            :src="character.imageUrl"
            :alt="character.name"
            class="w-full h-14 object-cover rounded-lg mb-1"
          />
          <p class="text-xs text-on-surface leading-tight truncate">{{ character.name }}</p>
        </div>
      </div>

      <!-- Subir desde el equipo -->
      <div class="border-t glass-stroke pt-4">
        <p class="text-xs text-on-surface-variant mb-2">O sube una foto desde tu equipo:</p>
        <label class="inline-flex items-center gap-2 bg-surface-container-high rounded px-3 py-1.5 cursor-pointer text-on-surface text-xs hover:bg-surface-container transition-colors">
          <span class="material-symbols-outlined text-sm">upload</span>
          Subir imagen
          <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
        </label>
        <p v-if="uploadFileName" class="text-xs text-white  mt-2">Lista: {{ uploadFileName }}</p>
      </div>

      <p v-if="avatarSaved" class="text-sm font-bold text-white mt-3">✓ Avatar actualizado correctamente.</p>
    </div>

    <!-- Cambiar contraseña -->
    <div class="bg-surface-container border glass-stroke rounded-2xl p-6">
      <h2 class="font-semibold text-xl text-on-surface mb-4">Cambiar contraseña</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm text-on-surface-variant mb-2">Contraseña actual</label>
          <input
            v-model="currentPassword"
            type="password"
            placeholder="Introduce tu contraseña actual"
            class="w-full bg-surface-container-high border glass-stroke rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-on-surface-variant mb-2">Nueva contraseña</label>
            <input
              v-model="newPassword"
              type="password"
              placeholder="Nueva contraseña"
              class="w-full bg-surface-container-high border glass-stroke rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-on-surface-variant mb-2">Confirmar contraseña</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirma la contraseña"
              class="w-full bg-surface-container-high border glass-stroke rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <p v-if="passwordError" class="text-sm text-red-400">{{ passwordError }}</p>
        <p v-if="passwordSuccess" class="text-sm text-green-400">✓ Contraseña actualizada correctamente.</p>

        <div class="flex justify-end pt-2">
          <button
            @click="updatePassword"
            class="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Actualizar contraseña
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
const authStore = useAuthStore()

// --- AVATAR ---
const allCharacters = ref([])
const query = ref('')
const loading = ref(false)
const selectedCharacter = ref(null)
const uploadedAvatar = ref('')
const uploadFileName = ref('')
const avatarSaved = ref(false)

async function loadCharacters() {
  loading.value = true
  try {
    const response = await fetch('https://api.disneyapi.dev/character')
    const data = await response.json()
    allCharacters.value = (data.data || []).filter(c => c.imageUrl)
  } catch (e) {
    console.error('Error al cargar personajes:', e)
  } finally {
    loading.value = false
  }
}

const filteredCharacters = computed(() => {
  if (!query.value.trim()) return []
  return allCharacters.value.filter(c =>
    c.name.toLowerCase().includes(query.value.toLowerCase())
  )
})

const previewAvatar = computed(() =>
  uploadedAvatar.value ||
  selectedCharacter.value?.imageUrl ||
  adminStore.avatar ||
  `https://i.pravatar.cc/60?u=${authStore.user?.email}`
)

function selectCharacter(character) {
  selectedCharacter.value = character
  uploadedAvatar.value = ''
  uploadFileName.value = ''
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  uploadFileName.value = file.name
  selectedCharacter.value = null
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedAvatar.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function saveAvatar() {
  const avatarToSave = uploadedAvatar.value || selectedCharacter.value?.imageUrl
  if (!avatarToSave) return
  adminStore.setAvatar(avatarToSave)
  avatarSaved.value = true
  query.value = ''
  selectedCharacter.value = null
  uploadedAvatar.value = ''
  uploadFileName.value = ''
  setTimeout(() => avatarSaved.value = false, 3000)
}

// --- CONTRASEÑA ---
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const passwordSuccess = ref(false)

function updatePassword() {
  passwordError.value = ''
  passwordSuccess.value = false

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordError.value = 'Completa todos los campos.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Las contraseñas no coinciden.'
    return
  }
  if (newPassword.value.length < 6) {
    passwordError.value = 'La nueva contraseña debe tener al menos 6 caracteres.'
    return
  }

  const storedCustom = localStorage.getItem('adminCustomPassword')
  const validCurrent = storedCustom
    ? currentPassword.value === storedCustom
    : currentPassword.value === import.meta.env.VITE_ADMIN_PASSWORD

  if (!validCurrent) {
    passwordError.value = 'La contraseña actual es incorrecta.'
    return
  }

  localStorage.setItem('adminCustomPassword', newPassword.value)
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  passwordSuccess.value = true
  setTimeout(() => passwordSuccess.value = false, 3000)
}

onMounted(loadCharacters)
</script>