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
        id: 1,
        movieId: 1,
        src: 'img/slider/divergent.jpg'
      },
      {
        id: 2,
        movieId: 2,
        src: 'img/slider/inception.jpg'
      },
      {
        id: 3,
        movieId: 3,
        src: 'img/slider/tour.jpg'
      },
      {
        id: 4,
        movieId: 4,
        src: 'img/slider/joker.jpg'
      },
      {
        id: 5,
        movieId: 5,
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
