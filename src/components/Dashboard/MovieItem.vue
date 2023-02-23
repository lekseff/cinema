<template>
   <v-card class="d-flex flex-column flex-grow-1 fill-height rounded-lg">
      <div class="d-flex">

         <!-- Блок с картинкой -->
         <div>
            <v-img
                cover
                :src="movie.logo"
                :aspect-ratio="0.66"
                width="300"
            ></v-img>
         </div>

         <!--Контент -->
         <div class="d-flex flex-column pa-3" style="width: 100%">
            <div class="d-flex align-center justify-space-between">
               <!-- Название фильма -->
               <v-card-title class="pt-0 text-grey-darken-3 text-h5 pb-2">
                  {{ movie.name }}
               </v-card-title>
               <!-- Кнопка удалить -->
               <v-card-actions class="ma-0 pa-0">
                  <v-btn
                      variant="flat"
                      color="light-blue-darken-1"
                      @click="remove(movie.id)"
                  >
                     Удалить
                  </v-btn>
               </v-card-actions>
            </div>

            <v-divider></v-divider>

            <div class="d-flex align-center mb-5 mt-3">
               <v-card-subtitle class="text-body-1 text-decoration-underline">
                  Актеры:
               </v-card-subtitle>
               <p class="d-inline-block">{{ movie.actors }}</p>
            </div>

            <div class="d-flex align-center mb-5">
               <v-card-subtitle class="text-body-1 text-decoration-underline">
                  Страна:
               </v-card-subtitle>
               <p class="d-inline-block">{{ countries }}</p>
            </div>

            <div class="d-flex align-center mb-5">
               <v-card-subtitle class="text-body-1 text-decoration-underline">
                  Жанр:
               </v-card-subtitle>
               <p class="d-inline-block">{{ genres }}</p>
            </div>

            <v-card-subtitle
                class="text-body-1 px-4 py-0 text-decoration-underline"
            >
               Описание:
            </v-card-subtitle>
            <v-card-text class="pa-3 flex-grow-1">
               {{ movie.plot }}
            </v-card-text>
         </div>
      </div>
   </v-card>
</template>

<script>
import {mapActions} from "vuex";
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
   },
   methods: {
      ...mapActions(['removeMovie']),
      /**
       * Удаление фильма
       * @param id
       */
      remove(id) {
         this.removeMovie(id)
      }
   }
}
</script>

<style scoped>

</style>
