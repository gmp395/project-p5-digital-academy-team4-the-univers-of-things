<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCharactersStore } from '@/stores/charactersStore'

const charactersStore = useCharactersStore()

onMounted(() => { charactersStore.fetchCharacters() })

// ─── Búsqueda y paginación ────────────────────────────────────
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 9

const filteredCharacters = computed(() => {
  if (!searchQuery.value.trim()) return charactersStore.characters
  return charactersStore.characters.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCharacters.value.length / pageSize))
)

const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCharacters.value.slice(start, start + pageSize)
})

watch(searchQuery, () => { currentPage.value = 1 })

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const clearSearch = () => { searchQuery.value = '' }

// ─── Modal editar / agregar ───────────────────────────────────
const modal = ref(null) // null | 'edit' | 'add'
const activeChar = ref(null)
const form = ref({ name: '', imageUrl: '', description: '', fileName: '' })

const openEdit = (char) => {
  activeChar.value = { ...char }
  form.value = {
    name: char.name,
    imageUrl: char.imageUrl || '',
    description: char.description || char.films?.join(', ') || '',
    fileName: ''
  }
  modal.value = 'edit'
}

const openAdd = () => {
  activeChar.value = null
  form.value = { name: '', imageUrl: '', description: '', fileName: '' }
  modal.value = 'add'
}

const closeModal = () => { modal.value = null }

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  form.value.fileName = file.name
  const reader = new FileReader()
  reader.onload = (e) => { form.value.imageUrl = e.target.result }
  reader.readAsDataURL(file)
}

const saveEdit = () => {
  const idx = charactersStore.characters.findIndex(c => c._id === activeChar.value._id)
  if (idx !== -1) {
    // splice reemplaza el objeto completo → Vue 3 detecta el cambio reactivo
    charactersStore.characters.splice(idx, 1, {
      ...charactersStore.characters[idx],
      name: form.value.name,
      imageUrl: form.value.imageUrl,
      description: form.value.description
    })
  }
  closeModal()
}

const saveAdd = () => {
  if (!form.value.name.trim()) return
  charactersStore.characters.unshift({
    _id: `custom_${Date.now()}`,
    name: form.value.name.trim(),
    imageUrl: form.value.imageUrl,
    description: form.value.description,
    films: [],
    tvShows: []
  })
  closeModal()
}

// ─── Eliminar ────────────────────────────────────────────────
const confirmDelete = ref(null)
const deleteChar = (id) => {
  const idx = charactersStore.characters.findIndex(c => c._id === id)
  if (idx !== -1) charactersStore.characters.splice(idx, 1)
  confirmDelete.value = null
}
</script>

<template>
  <div class="fm">
    <!-- Encabezado -->
    <div class="fm__header">
      <div class="fm__header-left">
        <h1 class="fm__title">Gestión de Personajes</h1>
        <span class="fm__badge">{{ filteredCharacters.length }} personajes</span>
      </div>
      <button @click="openAdd" class="fm__add-btn">
        <span class="material-symbols-outlined">add</span>
        Agregar personaje
      </button>
    </div>

    <!-- Buscador -->
    <div class="fm__search-wrapper">
      <span class="material-symbols-outlined fm__search-icon">search</span>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nombre..."
        class="fm__input"
      />
      <button v-if="searchQuery" @click="clearSearch" class="fm__clear-btn">✕</button>
    </div>

    <!-- Spinner -->
    <div v-if="charactersStore.loading" class="fm__loading">
      <div class="fm__spinner"></div>
      <p>Cargando personajes...</p>
    </div>

    <!-- Sin resultados -->
    <p v-else-if="!filteredCharacters.length" class="fm__empty-text">
      No se encontraron personajes para "{{ searchQuery }}".
    </p>

    <template v-else>
      <!-- Grid 3×3 -->
      <div class="fm__grid">
        <div
          v-for="char in paginatedCharacters"
          :key="char._id"
          class="fm__card"
          @click="openEdit(char)"
        >
          <img :src="char.imageUrl" :alt="char.name" class="fm__card-img" />
          <div class="fm__card-body">
            <h3 class="fm__card-name" :title="char.name">{{ char.name }}</h3>
            <p v-if="char.description || char.films?.length" class="fm__card-desc">
              {{ char.description || char.films?.slice(0,2).join(', ') }}
            </p>
            <div class="fm__card-actions" @click.stop>
              <button @click="openEdit(char)" class="fm__edit-btn">
                <span class="material-symbols-outlined">edit</span>
                Editar
              </button>
              <button @click="confirmDelete = char._id" class="fm__delete-btn">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="fm__pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="fm__page-btn">Anterior</button>
        <span class="fm__page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="fm__page-btn">Siguiente</button>
      </div>
    </template>

    <!-- ── Modal editar / agregar ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modal" class="modal-overlay" @click.self="closeModal">
          <div class="edit-modal">
            <h3 class="edit-modal__title">
              {{ modal === 'edit' ? 'Editar personaje' : 'Agregar personaje' }}
            </h3>

            <img v-if="form.imageUrl" :src="form.imageUrl" :alt="form.name" class="edit-modal__preview" />
            <div v-else class="edit-modal__preview-empty">
              <span class="material-symbols-outlined">image</span>
            </div>

            <div class="edit-modal__field">
              <label class="edit-modal__label">Nombre *</label>
              <input v-model="form.name" type="text" placeholder="Nombre del personaje" class="edit-modal__input" />
            </div>

            <div class="edit-modal__field">
              <label class="edit-modal__label">URL de imagen</label>
              <input v-model="form.imageUrl" type="text" placeholder="https://..." class="edit-modal__input" />
            </div>

            <div class="edit-modal__field">
              <label class="edit-modal__upload">
                <span class="material-symbols-outlined">upload</span>
                Subir desde equipo
                <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
              </label>
              <p v-if="form.fileName" class="edit-modal__filename">{{ form.fileName }}</p>
            </div>

            <div class="edit-modal__field">
              <label class="edit-modal__label">Descripción / Películas</label>
              <textarea
                v-model="form.description"
                placeholder="Ej: The Fox and the Hound, Fantasia..."
                class="edit-modal__textarea"
                rows="3"
              />
            </div>

            <div class="edit-modal__actions">
              <button @click="closeModal" class="edit-modal__cancel">Cancelar</button>
              <button
                @click="modal === 'edit' ? saveEdit() : saveAdd()"
                :disabled="!form.name.trim()"
                class="edit-modal__save"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── Modal confirmar eliminación ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="confirmDelete" class="modal-overlay" @click.self="confirmDelete = null">
          <div class="confirm-modal">
            <p class="confirm-modal__text">¿Eliminar este personaje?</p>
            <div class="confirm-modal__actions">
              <button @click="confirmDelete = null" class="confirm-modal__cancel">Cancelar</button>
              <button @click="deleteChar(confirmDelete)" class="confirm-modal__delete">Eliminar</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.fm {
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0;
  }

  &__badge {
    background: #1e293b;
    color: #94a3b8;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 2px 12px;
    font-size: 0.8rem;
  }

  &__add-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #3b82f6;
    border: none;
    border-radius: 10px;
    padding: 8px 18px;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    .material-symbols-outlined { font-size: 18px; }
    &:hover { background: #2563eb; }
  }

  // ── Buscador ──
  &__search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: 14px;
    color: #64748b;
    font-size: 20px;
    pointer-events: none;
  }

  &__input {
    width: 100%;
    background: #1e293b;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 10px 40px 10px 44px;
    color: #e2e8f0;
    font-size: 0.9rem;
    outline: none;
    &::placeholder { color: #64748b; }
    &:focus { border-color: #60a5fa; }
  }

  &__clear-btn {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    color: #64748b;
    font-size: 14px;
    cursor: pointer;
    &:hover { color: #e2e8f0; }
  }

  // ── Loading ──
  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 60px 0;
    color: #64748b;
    font-size: 0.9rem;
  }

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #1e293b;
    border-top-color: #60a5fa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__empty-text {
    color: #64748b;
    font-size: 0.9rem;
    padding: 24px 0;
  }

  // ── Grid ──
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__card {
    background: #1e293b;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
    &:hover {
      transform: translateY(-3px);
      border-color: rgba(96,165,250,0.3);
    }
  }

  &__card-img {
    width: 100%;
    height: 130px;
    object-fit: contain;
    background: #0f172a;
    padding: 8px;
  }

  &__card-body {
    padding: 10px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__card-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #e2e8f0;
    text-align: center;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__card-desc {
    font-size: 0.67rem;
    color: #64748b;
    text-align: center;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__card-actions {
    display: flex;
    gap: 6px;
    margin-top: 2px;
  }

  &__edit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    background: none;
    border: 1px solid #60a5fa;
    color: #60a5fa;
    border-radius: 7px;
    padding: 5px 0;
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    .material-symbols-outlined { font-size: 13px; }
    &:hover { background: #60a5fa; color: #0f172a; }
  }

  &__delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid #f87171;
    color: #f87171;
    border-radius: 7px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.2s;
    .material-symbols-outlined { font-size: 14px; }
    &:hover { background: #f87171; color: white; }
  }

  // ── Paginación ──
  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 8px;
  }

  &__page-btn {
    background: none;
    border: none;
    color: #60a5fa;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 4px 8px;
    &:disabled { color: #334155; cursor: not-allowed; }
    &:not(:disabled):hover { text-decoration: underline; }
  }

  &__page-info { font-size: 0.85rem; color: #64748b; }
}

// ── Overlay ──
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

// ── Modal editar / agregar ──
.edit-modal {
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; margin: 0; }

  &__preview {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: 10px;
    background: #0f172a;
  }

  &__preview-empty {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    background: #0f172a;
    border: 1px dashed rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #334155;
    .material-symbols-outlined { font-size: 36px; }
  }

  &__field { display: flex; flex-direction: column; gap: 6px; }
  &__label { font-size: 0.8rem; color: #94a3b8; }

  &__input, &__textarea {
    background: #0f172a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 8px 12px;
    color: #e2e8f0;
    font-size: 0.875rem;
    outline: none;
    font-family: inherit;
    &:focus { border-color: #60a5fa; }
    &::placeholder { color: #475569; }
  }

  &__textarea { resize: vertical; min-height: 72px; }

  &__upload {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0f172a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 0.8rem;
    color: #94a3b8;
    cursor: pointer;
    transition: border-color 0.2s;
    &:hover { border-color: #60a5fa; color: #e2e8f0; }
    .material-symbols-outlined { font-size: 16px; }
  }

  &__filename { font-size: 0.75rem; color: #4ade80; margin: 0; }

  &__actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 4px; }

  &__cancel {
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 8px 18px;
    color: #94a3b8;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover { color: #e2e8f0; }
  }

  &__save {
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    padding: 8px 18px;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    &:hover:not(:disabled) { background: #2563eb; }
    &:disabled { background: #334155; color: #64748b; cursor: not-allowed; }
  }
}

// ── Modal confirmar ──
.confirm-modal {
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 32px;
  max-width: 340px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__text { color: #e2e8f0; font-size: 1rem; margin: 0; }
  &__actions { display: flex; gap: 10px; justify-content: center; }

  &__cancel {
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 8px 20px;
    color: #94a3b8;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover { color: #e2e8f0; }
  }

  &__delete {
    background: #dc2626;
    border: none;
    border-radius: 8px;
    padding: 8px 20px;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #b91c1c; }
  }
}

.hidden { display: none; }

@keyframes spin { to { transform: rotate(360deg); } }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>