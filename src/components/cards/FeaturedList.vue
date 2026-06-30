<template>
  <div>
    <!-- Buscador -->
    <div class="mb-6">
      <input
        v-model="query"
        type="text"
        placeholder="Buscar personaje (ej: Mickey)"
        class="w-full bg-surface-container-high rounded-lg px-4 py-2 text-on-surface"
      />

      <p v-if="featuredStore.isFull" class="text-white font-bold mt-3">
        Has alcanzado el máximo de {{ featuredStore.maxFeatured }} destacados.
      </p>
      <p v-if="loading" class="text-on-surface-variant mt-3">Cargando personajes...</p>
      <p v-if="errorMessage" class="text-red-400 mt-3">{{ errorMessage }}</p>
      <p v-if="!query.trim() && !loading" class="text-on-surface-variant mt-3">
        Escribe un nombre para buscar.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div
          v-for="character in filteredCharacters"
          :key="character._id"
          class="bg-surface-container-high rounded-xl p-3 text-center"
        >
          <img
            v-if="character.imageUrl"
            :src="character.imageUrl"
            :alt="character.name"
            class="w-full h-24 object-cover rounded-lg mb-2"
          />
          <p class="text-sm text-on-surface mb-2">{{ character.name }}</p>
          <button
            v-if="!isFeatured(character._id) && !featuredStore.isFull"
            @click="addToFeatured(character)"
            class="text-xs bg-primary text-white px-3 py-1 rounded-lg"
          >
            Agregar
          </button>
          <span v-else-if="isFeatured(character._id)" class="text-xs text-on-surface-variant">Ya destacado</span>
          <span v-else class="text-xs text-white font-bold">Límite alcanzado</span>
        </div>
      </div>
    </div>

    <!-- Tabla de destacados -->
    <div class="bg-surface-container border glass-stroke rounded-2xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-high border-b glass-stroke">
              <th class="px-6 py-5 font-label-lg text-label-lg text-primary">Character Name</th>
              <th class="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody class="divide-y glass-stroke">
            <tr
              v-for="char in paginatedCharacters"
              :key="char.id"
              class="hover:bg-surface-container-low transition-colors group"
            >
              <td class="px-6 py-4 font-body-md font-semibold text-on-surface">
                <template v-if="editingId === char.id">
                  <input v-model="editName" placeholder="Nombre" class="bg-surface-container-high rounded px-2 py-1 text-on-surface mb-2 w-full" />
                  <input v-model="editImageUrl" placeholder="URL de la imagen" class="bg-surface-container-high rounded px-2 py-1 text-on-surface mb-2 w-full" />
                  <label class="inline-flex items-center gap-2 bg-surface-container-high rounded px-3 py-1.5 cursor-pointer text-on-surface text-xs hover:bg-surface-container transition-colors mb-2">
                    <span class="material-symbols-outlined text-sm">upload</span>
                    Subir imagen
                    <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
                  </label>
                  <p v-if="fileName" class="text-xs text-green-400 mb-2">Lista: {{ fileName }}</p>
                  <img v-if="editImageUrl" :src="editImageUrl" class="w-10 h-10 rounded object-cover" />
                </template>
                <div v-else class="flex items-center gap-3">
                  <img v-if="char.imageUrl" :src="char.imageUrl" :alt="char.name" class="w-8 h-8 rounded object-cover" />
                  <span>{{ char.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right space-x-3">
                <template v-if="editingId === char.id">
                  <button @click="saveEdit(char.id)" class="text-sm text-green-400 hover:text-green-300">Guardar</button>
                  <button @click="cancelEdit" class="text-sm text-on-surface-variant hover:text-on-surface">Cancelar</button>
                </template>
                <template v-else>
                  <button @click="startEdit(char)" class="text-sm text-primary hover:underline">Editar</button>
                  <button @click="featuredStore.removeCharacter(char.id)" class="text-sm text-red-400 hover:text-red-300">Quitar</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="flex items-center justify-between px-6 py-4 border-t glass-stroke">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="text-sm text-primary disabled:text-on-surface-variant disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-sm text-on-surface-variant">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-sm text-primary disabled:text-on-surface-variant disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFeaturedStore } from '@/stores/FeaturedStore'

const featuredStore = useFeaturedStore()

const allCharacters = ref([])
const query = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function loadCharacters() {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch('https://api.disneyapi.dev/character')
    const data = await response.json()
    allCharacters.value = data.data || []
  } catch (error) {
    errorMessage.value = 'Error al cargar personajes.'
  } finally {
    loading.value = false
  }
}

onMounted(loadCharacters)

const filteredCharacters = computed(() => {
  if (!query.value.trim()) return []
  return allCharacters.value.filter(c =>
    c.name.toLowerCase().includes(query.value.toLowerCase())
  )
})

function isFeatured(id) {
  return featuredStore.characters.some(c => c.id === id)
}

function addToFeatured(character) {
  featuredStore.addCharacter({
    id: character._id,
    name: character.name,
    imageUrl: character.imageUrl || ''
  })
}

const editingId = ref(null)
const editName = ref('')
const editImageUrl = ref('')
const fileName = ref('')

function startEdit(char) {
  editingId.value = char.id
  editName.value = char.name
  editImageUrl.value = char.imageUrl
  fileName.value = ''
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    editImageUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function saveEdit(id) {
  featuredStore.updateCharacter(id, { name: editName.value, imageUrl: editImageUrl.value })
  editingId.value = null
}

function cancelEdit() {
  editingId.value = null
}

const currentPage = ref(1)
const pageSize = 5

const totalPages = computed(() =>
  Math.max(1, Math.ceil(featuredStore.characters.length / pageSize))
)

const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return featuredStore.characters.slice(start, start + pageSize)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>