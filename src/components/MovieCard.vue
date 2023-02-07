<template>
  <v-card
      flat
      class="d-flex flex-column flex-sm-row bg-transparent mb-4 mb-lg-0">
    <div>
      <router-link :to="{name: 'ShowMovie', params: {id: movie.id}}">
        <v-img
            cover
            :width="isMobile ? '100%' : '250'"
            :aspect-ratio="isMobile ? 2 : 0.66"
            :src="movieImage"
            class="rounded-lg mb-2 mb-sm-0"
            :alt="movie.name"
        >
        </v-img>
      </router-link>
    </div>
<!-- Информация -->
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
          Продолжительность: {{ movie.timeline }} мин
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
            :density="isMobile ? 'default' : 'comfortable'"
            class="bg-deep-orange-lighten-1 text-body-2 ma-2"
            @click="onSelect(movie, session.id)"
        >
          {{ session.time }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
  <v-divider v-if="$vuetify.display.mdAndDown"></v-divider>
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
    movieImage() {
      return this.$vuetify.display.xs ? this.movie.logoMobile : this.movie.logo
    },
    isMobile() {
      return this.$vuetify.display.xs
    }
  },
}
</script>

<style scoped>
.wrap-text {
  white-space: normal !important;
}
</style>
