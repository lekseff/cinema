<template>
  <v-carousel
      cycle
      height="530"
      hide-delimiter-background
      show-arrows="hover"
      class="rounded-lg"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        cover
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "AppSlider",
  data: () => ({
    slides: [
      {
        src: 'img/slider/divergent.jpg'
      },
      {
        src: 'img/slider/inception.jpg'
      },
      {
        src: 'img/slider/tour.jpg'
      },
      {
        src: 'img/slider/joker.jpg'
      },
      {
        src: 'img/slider/ring.jpg'
      }
    ]
  })
}
</script>

<style scoped>

</style>
