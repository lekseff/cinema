<template>
   <v-carousel
       cycle
       height="auto"
       hide-delimiter-background
       :show-arrows="isShowArrows"
       class="rounded-lg"
   >
      <v-carousel-item v-for="slide in slides" :key="slide.id">
         <router-link :to="{name: 'ShowMovie', params: {id: slide.movie}}">
            <v-img
                :src="slide.photo"
                aspect-ratio="2.17"
                cover
            >
            </v-img>
         </router-link>
      </v-carousel-item>
   </v-carousel>
</template>

<script>
export default {
   name: 'AppSlider',
   props: {
      slides: Array
   },
   computed: {
      /**
       * Скрытие стрелок управления
       * @returns {boolean|string}
       */
      isShowArrows() {
         return this.$vuetify.display.smAndDown ? false : 'hover'
      }
   }
}
</script>

<style scoped>

</style>
