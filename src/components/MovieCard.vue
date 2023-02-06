<template>
  <v-card
      flat
      class="d-flex bg-transparent">
    <div>
      <router-link :to="{name: 'ShowMovie', params: {id: movie.id}}">
        <v-img
            cover
            width="250"
            aspect-ratio="0.66"
            :src="movie.logo"
            class="rounded-lg"
        >
        </v-img>
      </router-link>
    </div>
    <div>
      <v-card-title class="text-white text-h4 wrap-text">
        {{ movie.name }}
      </v-card-title>

      <v-card-subtitle>
        <p v-if="movie.countries.length > 0" class="mt-5 wrap-text">
          Страна: {{ countries }}
        </p>

        <p class="mt-4">
          Режиссер: {{ movie.directors }}
        </p>

        <p v-if="movie.genres" class="mt-3 wrap-text">
          Жанр: {{ genres }}
        </p>

        <p class="mt-4">
          Сеансы:
        </p>
      </v-card-subtitle>

      <v-card-actions class="flex-wrap">
        <v-btn
            v-for="session in movie.sessions"
            :key="session.id"
            :value="session.id"
            :disabled="!session.isAvailable"
            flat
            rounded="pill"
            density="comfortable"
            class="bg-deep-orange-lighten-1 text-body-2 ma-1"
            @click="onSelect(movie, session.id)"
        >
          {{ session.time }}
        </v-btn>
      </v-card-actions>

      <v-card-subtitle class="mt-4">
        Продолжительность: {{ movie.timeline }} мин
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MovieCard",
  props: ['movie'],
  data: () => ({
    selected: null
  }),
  methods: {
    /**
     * Действие по клику на кнопку сеанса
     * @param movie
     * @param id
     */
    onSelect(movie, id) {
      console.log(movie.name)
      console.log('id', id)
    }
  },
  computed: {
    countries() {
      if (!this.movie.countries) return ''
      return this.movie.countries.join(', ')
    },
    genres() {
      if (!this.movie.genres) return ''
      return this.movie.genres.join(', ')
    },
  },
}
</script>

<style scoped>
.wrap-text {
  white-space: normal !important;
}
</style>
