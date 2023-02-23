<template>
   <v-container>
      <AppLoader v-if="loading"/>
      <template v-else>
         <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Все фильмы</h3>
         <v-divider class="mb-8"></v-divider>
         <v-row v-if="getAllMovies.length">
            <v-col
                v-for="movie in getAllMovies"
                cols="12"
                :key="movie.id">
               <MovieItem :movie="movie"/>
            </v-col>
         </v-row>
         <h6 v-else class="text-center text-h5 text-grey-darken-1 mt-5">
            Список фильмов пуст
         </h6>
      </template>
   </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import AppLoader from '@/components/AppLoader';
import MovieItem from "@/components/Dashboard/MovieItem";

export default {
   name: "MoviesPage",
   components: {AppLoader, MovieItem},
   data: () => ({
      loading: false
   }),
   mounted() {
      this.loadAllMovies()
   },
   methods: {
      ...mapActions(['loadAllMovies'])
   },
   computed: {
      ...mapGetters(['getAllMovies'])
   }
}
</script>

<style scoped>

</style>
