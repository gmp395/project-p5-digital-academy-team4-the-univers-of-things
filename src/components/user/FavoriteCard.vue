<template>
  <article class="favorite-card">
    <img class="favorite-card__image" :src="image" :alt="title" />

    <div class="favorite-card__content">
  <template v-if="isEditing">
    <input v-model="editedTitle" class="favorite-card__input" />

    <textarea
      v-model="editedDescription"
      class="favorite-card__textarea"
    />

    <button class="favorite-card__save" @click="saveEdit">
      Guardar
    </button>
  </template>

  <template v-else>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>

    <div class="favorite-card__rating">
      <button
        v-for="star in 5"
        :key="star"
        class="favorite-card__star"
        :class="{ 'favorite-card__star--active': star <= rating }"
        @click="$emit('rate', star)"
      >
        ★
      </button>
    </div>

    <div class="favorite-card__actions">
      <button class="favorite-card__edit" @click="isEditing = true">
        Editar
      </button>

      <button class="favorite-card__delete" @click="$emit('delete')">
        Eliminar
      </button>
    </div>
  </template>
</div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  image: String,
  rating: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['delete', 'rate', 'edit'])

const isEditing = ref(false)
const editedTitle = ref(props.title)
const editedDescription = ref(props.description)

const saveEdit = () => {
  emit('edit', {
    title: editedTitle.value,
    description: editedDescription.value
  })

  isEditing.value = false
}
</script>

<style scoped lang="scss">
.favorite-card {
  background: #172133;
  border: 1px solid #334155;
  border-radius: 14px;
  overflow: hidden;
  color: white;
  min-height: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
}

.favorite-card__image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  object-position: center;
  display: block;
  background-color: #172133;
}

.favorite-card__content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  p {
    color: #cbd5e1;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 10px;
  }
}

.favorite-card__rating {
  margin-top: auto;
  color: #facc15;
}

.favorite-card__star {
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 1px;
}

.favorite-card__star--active {
  color: #facc15;
}
.favorite-card__actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.favorite-card__edit,
.favorite-card__delete,
.favorite-card__save {
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 600;
}

.favorite-card__edit,
.favorite-card__save {
  background-color: #93c5fd;
  color: #0f172a;
}

.favorite-card__delete {
  background-color: #7f1d1d;
  color: white;
}

.favorite-card__input,
.favorite-card__textarea {
  width: 100%;
  background: #253247;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 8px;
  color: white;
}

.favorite-card__textarea {
  min-height: 70px;
  resize: vertical;
}
</style>
