<template>
   <v-card class="d-flex flex-column flex-grow-1 fill-height rounded-lg">
      <div class="d-flex justify-space-between mb-5">
         <div>
            <v-img
                cover
                :src="movie.logo"
                :aspect-ratio="0.66"
                width="220"
            ></v-img>
         </div>
         <div class="pa-3">
            <v-card-title class="pt-0">{{ movie.name }}</v-card-title>

            <h6 class="text-body-1">Актеры:</h6>
            <v-card-text class="pa-2">{{ movie.actors }}</v-card-text>

            <template v-if="countries.length">
               <h6 class="text-body-1">Страна:</h6>
               <v-card-text class="pa-2">{{ countries }}</v-card-text>
            </template>

            <template v-if="genres.length">
               <h6 class="text-body-1">Жанр:</h6>
               <v-card-text class="pa-2">{{ genres }}</v-card-text>
            </template>
         </div>
      </div>

      <h6 class="text-body-1">Описание:</h6>
      <v-card-text>{{ movie.plot }}</v-card-text>
   </v-card>
</template>

<script>
import {arrayToString} from "../../../utills";

export default {
   name: "MovieItem",
   props: ['movie'],
   computed: {
      genres() {
         if (!this.movie.genres) return []
         return arrayToString(this.movie.genres)
      },
      countries() {
         if (!this.movie.countries) return []
         return arrayToString(this.movie.countries)
      }
   }
}
</script>

<style scoped>

</style>
