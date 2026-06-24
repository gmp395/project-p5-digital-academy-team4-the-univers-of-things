<template>
  <div class="favorites-page">
    <UserSidebar />

    <main class="favorites-page__content">
      <section class="favorites-page__header">
        <h1>Mis favoritos</h1>
        <p>Consulta todos tus personajes y películas favoritas.</p>
      </section>

      <section class="favorites-page__add">
        <h2>Añadir favorito</h2>

        <div class="favorites-page__form">
          <label>
            Personaje
            <select v-model="selectedCharacterId">
              <option value="">Selecciona un personaje</option>
              <option
                v-for="character in availableCharacters"
                :key="character._id"
                :value="character._id"
              >
                {{ character.name }}
              </option>
            </select>
          </label>

          <label>
            Descripción personalizada
            <input
              v-model="newDescription"
              type="text"
              placeholder="Ejemplo: Mi personaje favorito"
            />
          </label>

          <button type="button" @click="addFavorite">Añadir favorito</button>
        </div>
      </section>

      <section class="favorites-page__grid">
        <FavoriteCard
          v-for="favorite in favorites"
          :key="favorite._id"
          :title="favorite.customTitle"
          :description="favorite.customDescription"
          :image="favorite.imageUrl"
          :rating="favorite.rating"
          @delete="favoritesStore.removeFavorite(favorite._id)"
          @rate="favoritesStore.rateFavorite(favorite._id, $event)"
          @edit="
            favoritesStore.updateFavorite(favorite._id, {
              customTitle: $event.title,
              customDescription: $event.description,
            })
          "
        />
      </section>

      <div class="favorites-page__footer">
        <Footer />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import UserSidebar from "@/components/user/UserSidebar.vue";
import Footer from "@/components/Footer.vue";
import FavoriteCard from "@/components/user/FavoriteCard.vue";
import { useFavoritesStore } from "@/stores/favoritesStore";

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const availableCharacters = ref([]);
const selectedCharacterId = ref("");
const newDescription = ref("");

const addFavorite = () => {
  if (!selectedCharacterId.value) {
    return;
  }

  const selectedCharacter = availableCharacters.value.find(
    (character) => character._id === Number(selectedCharacterId.value),
  );

  if (!selectedCharacter) {
    return;
  }

  favoritesStore.addFavorite({
    ...selectedCharacter,
    customDescription: newDescription.value || "Personaje del universo Disney.",
  });

  selectedCharacterId.value = "";
  newDescription.value = "";
};

onMounted(async () => {
  const response = await fetch(
    "https://api.disneyapi.dev/character?page=3&pageSize=20",
  );
  const data = await response.json();

  availableCharacters.value = data.data.filter(
    (character) => character.imageUrl,
  );

  availableCharacters.value.slice(0, 4).forEach((character) => {
    favoritesStore.addFavorite(character);
  });
});
</script>

<style scoped lang="scss">
.favorites-page {
  display: flex;
  min-height: 100vh;
  background: #0f172a;
}

.favorites-page__content {
  flex: 1;
  min-height: 100vh;
  padding: 32px 48px 24px;
  color: white;
  display: flex;
  flex-direction: column;
}

.favorites-page__header {
  margin-bottom: 24px;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 8px;
  }

  p {
    color: #cbd5e1;
  }
}

.favorites-page__add {
  background: #172133;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;

  h2 {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  p {
    color: #cbd5e1;
  }
}

.favorites-page__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.favorites-page__footer {
  margin-top: auto;
  padding-top: 48px;
}
@media (max-width: 900px) {
  .favorites-page {
    flex-direction: column;
  }

  .favorites-page__content {
    padding: 24px;
  }

  .favorites-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.favorites-page__form {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 16px;
  align-items: end;

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #cbd5e1;
    font-size: 0.9rem;
  }

  select,
  input {
    background: #253247;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 10px 12px;
    color: white;
  }

  button {
    background: #93c5fd;
    color: #0f172a;
    border: none;
    border-radius: 8px;
    padding: 11px 16px;
    font-weight: 700;
    cursor: pointer;
  }
}

@media (max-width: 600px) {
  .favorites-page__grid {
    grid-template-columns: 1fr;
  }

  .favorites-page__header h1 {
    font-size: 2rem;
  }
}
</style>
