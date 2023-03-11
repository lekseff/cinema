<template>
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Управление странами</h3>
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
                @click="addCountry"
            >
               Добавить страну
            </v-btn>
         </v-container>
         <v-divider></v-divider>
         <v-chip
             v-for="item in countries"
             :key="item.id"
             closable
             class="ma-3 color-theme"
             @click:close="remove(item.id)"
         >
            {{ item.name }}
         </v-chip>
      </template>
   </v-container>
   <!-- Модалка - добавить страну -->
   <ModalAddCountry/>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {MODAL, rules} from '../../../../constants'
import AppLoader from '@/components/AppLoader'
import ModalAddCountry from '@/components/Dashboard/ModalAddCountry'

export default {
   name: "CountriesPage",
   components: {AppLoader, ModalAddCountry},
   data: () => ({
      country: '',
      rules: rules,
      loading: true
   }),
   mounted() {
      // Загружает список всех стран
      this.loadAllCountries()
          .finally(() => {
             this.loading = false
          })
   },
   computed: {
      ...mapGetters({
         countries: 'getCountries'
      })
   },
   methods: {
      ...mapActions(['loadAllCountries', 'openModal', 'removeCountry']),
      /**
       * Открывает модалку, чтобы добавить страну
       */
      addCountry() {
         this.openModal(MODAL.addCountry)
      },
      /**
       * Удаляет страну
       * @param id
       */
      remove(id) {
         this.removeCountry(id)
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
