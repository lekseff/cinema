<template>
   <v-container>
      <AppLoader v-if="loading"/>
      <template v-else>
         <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Все фильмы</h3>
         <v-divider class="mb-8"></v-divider>
         <v-row>
            <v-col
                v-for="movie in getAllMovies"
                cols="12" md="6"
                :key="movie.id">
               <MovieItem :movie="movie"/>
            </v-col>
         </v-row>
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
          .then(() => {
             console.log('on load movie', this.getAllMovies)
          })
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
