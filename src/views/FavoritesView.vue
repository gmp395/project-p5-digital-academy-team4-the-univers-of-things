<template>
  <div class="favorites-page">
    <UserSidebar />

    <div class="favorites-page__main">
      <main class="favorites-page__content">
        <section class="favorites-page__header">
          <h1>Mis favoritos</h1>
          <p>Consulta todos tus personajes y películas favoritas.</p>
        </section>

        <section class="favorites-page__add">
          <h2>Añadir favorito</h2>

          <div class="favorites-page__form">
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
            <label class="favorites-page__search">
              Buscar personaje
              <input
                v-model="searchCharacter"
                type="text"
                placeholder="Ejemplo: Baloo"
                @input="selectedLetter = ''"
              />

              <ul
                v-if="searchCharacter && filteredCharacters.length"
                class="favorites-page__suggestions"
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

            <button type="button" @click="addFavorite">Añadir favorito</button>
          </div>
          <p
            v-if="selectedLetter && filteredCharacters.length === 0"
            class="favorites-page__empty-message"
          >
            No hay personajes con esa inicial.
          </p>
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
      </main>

      <section class="favorites-page__grid">
        <FavoriteCard
          v-for="favorite in favorites"
          :key="favorite._id"
          :title="favorite.customTitle"
          :description="favorite.customDescription"
          :image="favorite.imageUrl"
          :rating="favoritesStore.getRating(favorite._id)"
          @delete="favoritesStore.removeFavorite(favorite._id)"
          @rate="favoritesStore.rateCharacter(favorite, $event)"
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
import { computed, ref, onMounted } from "vue";
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
const selectedLetter = ref("");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const searchCharacter = ref("");
const filteredCharacters = computed(() => {
  const search = searchCharacter.value.trim().toLowerCase();

  return availableCharacters.value
    .filter((character) => {
      const name = character.name.toLowerCase();

      const matchesLetter = selectedLetter.value
        ? name.startsWith(selectedLetter.value.toLowerCase())
        : true;

      const matchesSearch = search ? name.includes(search) : true;

      return matchesLetter && matchesSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});

const addFavorite = () => {
  if (!selectedCharacterId.value) {
    return;
  }

  const selectedCharacter = availableCharacters.value.find(
    (character) => String(character._id) === String(selectedCharacterId.value),
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
  selectedLetter.value = "";
  searchCharacter.value = "";
};

onMounted(async () => {
  favoritesStore.loadFavorites();

  const response = await fetch(
    "https://api.disneyapi.dev/character?page=3&pageSize=20",
  );
  const data = await response.json();

  availableCharacters.value = data.data.filter(
    (character) => character.imageUrl,
  );
});
</script>

<style scoped lang="scss">
.favorites-page {
  display: flex;
  min-height: 100vh;
  background: #0f172a;
}

.favorites-page__main {
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.favorites-page__content {
  flex: 1;
  padding: 32px 48px 24px;
  color: white;
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
  grid-template-columns: 96px 1fr 1fr auto;
  gap: 16px;
  align-items: end;

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #cbd5e1;
    font-size: 0.9rem;
    min-width: 0;
  }

  label:first-child select {
    width: 80px;
  }

  select,
  input {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
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
    white-space: nowrap;
  }
}

.favorites-page__search {
  position: relative;
}

.favorites-page__suggestions {
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

.favorites-page__empty-message {
  color: #fca5a5;
  font-size: 0.85rem;
  margin: 8px 0 0;
}

.favorites-page__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1100px) {
  .favorites-page__form {
    grid-template-columns: 96px 1fr 1fr;
  }

  .favorites-page__form button {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .favorites-page__form label:first-child select {
    width: 100%;
  }

  .favorites-page__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .favorites-page {
    flex-direction: column;
  }

  .favorites-page__content {
    padding: 24px;
  }

  .favorites-page__form {
    grid-template-columns: 1fr;
  }

  .favorites-page__form label:first-child select {
    width: 100%;
  }

  .favorites-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .favorites-page__content {
    padding: 20px;
  }

  .favorites-page__header h1 {
    font-size: 2rem;
  }

  .favorites-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>