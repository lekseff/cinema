<template>
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Управление жанрами</h3>
      <v-divider></v-divider>
      <!-- Loader -->
      <v-container v-if="loading">
         <AppLoader/>
      </v-container>
      <!-- Content -->
      <template v-else>
         <v-container class="text-end">
            <v-btn
                variant="flat"
                prepend-icon="mdi-plus-thick"
                color="light-blue-darken-1"
                @click="addGenre"
            >
               Добавить жанр
            </v-btn>
         </v-container>
         <v-divider></v-divider>
         <v-chip
             v-for="genre in genres"
             :key="genre.id"
             closable
             class="ma-3 color-theme"
             @click:close="remove(genre.id)"
         >
            {{ genre.name }}
         </v-chip>
      </template>
   </v-container>
   <!-- Модалка - добавить жанр -->
   <ModalAddGenre/>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AppLoader from '@/components/AppLoader'
import ModalAddGenre from '@/components/Dashboard/ModalAddGenre'
import {MODAL} from '../../../../constants'

export default {
   name: "GenresPage",
   components: {AppLoader, ModalAddGenre},
   data: () => ({
      genre: '',
      loading: true
   }),
   mounted() {
      this.loadAllGenres()
          .finally(() => {
             this.loading = false
          })
   },
   computed: {
      ...mapGetters({
         genres: 'getGenres'
      })
   },
   methods: {
      ...mapActions(['loadAllGenres', 'openModal', 'removeGenre']),
      addGenre() {
         this.openModal(MODAL.addGenre)
      },
      remove(id) {
         this.removeGenre(id)
      }
   }
}
</script>

<style scoped>
.color-theme {
   background-color: #FF7043;
   color: white;
   box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}
</style>
