<template>
   <v-container class="ma-0 pa-0" fluid>
      <v-container>
         <!-- Слайдер -->
         <AppSlider v-if="slider.length" :slides="slider"/>
         <!-- Панель выбора сеанса -->
         <AppSession/>
         <!-- Карточки фильмов -->
         <v-row v-if="movies.length" class="mt-6 mb-2">
            <v-col
                v-for="movie in movies"
                :key="movie.id"
                cols="12"
                lg="6"
            >
               <MovieCard :movie="movie"/>
            </v-col>
         </v-row>
         <!-- Если сеансов нет -->
         <div
             v-else
             class="d-flex align-center justify-center flex-grow-1 py-3"
             style="height: 50vh"
         >
          <span class="text-h4 text-center" style="opacity: 0.7">
            Сеансов нет
          </span>
         </div>
      </v-container>
      <!-- Footer -->
      <AppFooter/>
   </v-container>
   <!-- Модалка -->
   <ModalHall/>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import AppSlider from '@/components/AppSlider'
import AppSession from '@/components/AppSession'
import MovieCard from '@/components/MovieCard'
import AppFooter from '@/components/AppFooter'
import ModalHall from '@/components/ModalHall/ModalHall'

export default {
   name: 'HomePage',
   components: {AppSlider, AppSession, MovieCard, AppFooter, ModalHall},
   created() {
      this.setSelectedDate('2023-02-15')
   },
   methods: {
      ...mapActions(['setSelectedDate'])
   },
   computed: {
      ...mapGetters({
         selectedDate: 'getSelectedDate',
         getMovieById: 'getMovieById',
         filtered: 'getSessionsWithDate',
         slider: 'getSlides'
      }),
      /**
       * Получает сеансы на определнную даты и группирует по фильмам
       * @returns {*[]}
       */
      movies() {
         const result = []
         const currentSessions = this.filtered(this.selectedDate)
         currentSessions.forEach(item => {
            const [movieId, sessions] = Object.entries(item)[0]
            const movie = this.getMovieById(Number(movieId))
            movie.sessions = sessions
            result.push(movie)
         })
         return result
      }
   }
}
</script>

<style scoped>

</style>
