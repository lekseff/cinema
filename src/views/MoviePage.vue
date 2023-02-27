<template>
   <v-container style="height: 100%">
      <!-- Loader -->
      <AppLoader v-if="loading"/>
      <!-- Карточка фильма -->
      <v-card v-else class="bg-transparent" flat>
         <div class="d-flex">
            <!-- Баннер -->
            <v-img
                cover
                width="400"
                :src="movie.logo"
                aspect-ratio="0.66"
                class="flex-grow-0 rounded-lg"
                :alt="movie.name"
            >
               <!-- Индикатор загрузки изображения -->
               <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                     <v-progress-circular
                         color="grey-lighten-4"
                         indeterminate
                     ></v-progress-circular>
                  </div>
               </template>
            </v-img>
            <!-- Информация -->
            <div class="flex-grow-1 pl-10">

               <v-card-title class="text-white text-h4 pb-4">
                  {{ movie.name }}
               </v-card-title>
               <v-divider></v-divider>

               <v-card-text class="text-subtitle-1 pr-0">
                  <p class="mt-4 pb-3 font-weight-regular">
                     <span class="font-weight-medium">Режиссер: </span>{{ movie.directors }}
                  </p>
                  <v-divider></v-divider>
                  <p class="mt-5 pb-3">
                     <span class="font-weight-medium">Страна: </span> {{ countries }}
                  </p>
                  <v-divider></v-divider>
                  <p class="mt-5 pb-3">
                     <span class="font-weight-medium">Актеры: </span> {{ movie.actors }}
                  </p>
                  <v-divider></v-divider>
                  <p class="mt-5 pb-3">
                     <span class="font-weight-medium">Жанр: </span> {{ genres }}
                  </p>
                  <v-divider></v-divider>
                  <p class="mt-5 pb-3">
                     <span class="font-weight-medium">Продолжительность: </span> {{ movie.timeline }} мин
                  </p>
                  <v-divider></v-divider>
                  <p class="mt-5 pb-3">
                     <span class="font-weight-medium">Возрастной рейтинг: </span> {{ movie.ageCategory }}
                  </p>
                  <v-divider></v-divider>
               </v-card-text>
            </div>
         </div>

         <!-- Описание -->
         <div class="mt-4">
            <v-card-title class="text-white text-h4 pb-4">
               Описание
            </v-card-title>
            <v-card-text class="text-subtitle-1">
               {{ movie.plot }}
            </v-card-text>
         </div>
      </v-card>
   </v-container>
   <AppFooter/>
</template>

<script>
import axios from 'axios'
import {arrayToString} from '../../utills'
import AppFooter from '@/components/AppFooter'
import AppLoader from '@/components/AppLoader'

export default {
   name: "MoviePage",
   components: {AppFooter, AppLoader},
   data: () => ({
      movie: {},
      loading: true
   }),
   created() {
      this.getMovie()
   },
   methods: {
      // Загрузка фильма с сервера
      async getMovie() {
         const url = process.env.VUE_APP_API_URL
         const {id} = this.$route.params
         try {
            const response = await axios.get(`${url}/api/movies/${id}`, {
               headers: {'Accept': 'application/json'}
            })
            this.movie = response.data.data
            this.loading = false
         } catch (e) {
            this.$router.push({name: 'not-found'})
         }

      }
   },
   computed: {
      countries() {
         return arrayToString(this.movie.countries)
      },
      genres() {
         return arrayToString(this.movie.genres)
      }
   }
}
</script>

<style scoped>

</style>
