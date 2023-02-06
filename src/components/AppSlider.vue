<template>
  <v-carousel
      cycle
      height="auto"
      hide-delimiter-background
      :show-arrows="isShowArrows"
      class="rounded-lg"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
      <router-link :to="{name: 'ShowMovie', params: {id: slide.movieId}}">
        <v-img
            :src="slide.src"
            cover
            aspect-ratio="2.17"
        >

        </v-img>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "AppSlider",
  data: () => ({
    slides: [
      {
        id: 1011,
        movieId: 1011,
        src: 'img/slider/divergent.jpg'
      },
      {
        id: 1012,
        movieId: 1012,
        src: 'img/slider/inception.jpg'
      },
      {
        id: 1013,
        movieId: 1013,
        src: 'img/slider/tour.jpg'
      },
      {
        id: 1014,
        movieId: 1014,
        src: 'img/slider/joker.jpg'
      },
      {
        id: 1015,
        movieId: 1015,
        src: 'img/slider/ring.jpg'
      }
    ]
  }),
  computed: {
    isShowArrows() {
      return this.$vuetify.display.smAndDown ? false : 'hover'
    }
  }
}
</script>

<style scoped>

</style>
