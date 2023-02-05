<template>
  <v-card
      elevation="0"
      class="d-flex bg-transparent">
    <div>
      <router-link :to="`/film/${movie.id}`">
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
      <v-card-title
          class="text-white text-h4 wrap-text"
      >
        {{ movie.name }}
      </v-card-title>

      <v-card-subtitle
          v-if="movie.countries.length > 0"
          class="mt-5 wrap-text"
      >
        Страна: {{ countries }}
      </v-card-subtitle>

      <v-card-subtitle class="mt-4">
        Режиссер: {{ movie.directors }}
      </v-card-subtitle>

      <v-card-subtitle v-if="movie.genres" class="mt-3 wrap-text">
        Жанр: {{ genres }}
      </v-card-subtitle>

      <v-card-subtitle class="mt-4">
        Сеансы:
      </v-card-subtitle>

      <v-card-actions class="flex-wrap">
        <!-- :FIXME: Через клик приходит значение или undefined т.к. chip работает как переключатель -->
        <!--        <v-chip-group-->
        <!--            selected-class=""-->
        <!--            column-->
        <!--            v-model="selectedTime"-->
        <!--            style="user-select: none"-->
        <!--        >-->
        <!--          <v-chip-->
        <!--              v-for="session in movie.sessions"-->
        <!--              :key="session.id"-->
        <!--              :disabled="!session.isAvailable"-->
        <!--              :value="session.id"-->
        <!--              class="bg-deep-orange-lighten-1"-->
        <!--          >-->
        <!--            {{ session.time }}-->
        <!--          </v-chip>-->
        <!--        </v-chip-group>-->
        <v-btn
            v-for="session in movie.sessions"
            :key="session.id"
            :value="session.id"
            flat
            rounded="pill"
            density="comfortable"
            :disabled="!session.isAvailable"
            class="bg-deep-orange-lighten-1 text-body-2 ma-1"
            @click="onSelect(session.id)"
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
    onSelect(val) {
      console.log('id', val)
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