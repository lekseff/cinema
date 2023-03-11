<template>
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Управление жанрами</h3>
      <v-divider></v-divider>
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

   </v-container>
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'

export default {
   name: "GenresPage",
   methods: {
      addGenre() {
         console.log('addG')
      }
   }

}
</script>

<style scoped>

</style>
