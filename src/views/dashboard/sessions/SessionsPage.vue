<template>
   <!-- Loader -->
   <v-container v-if="loading" class="fill-height">
      <AppLoader/>
   </v-container>
   <!-- Content -->
   <v-container v-else>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Все сеансы</h3>
      <v-divider class="mb-8"></v-divider>

      <v-sheet
          v-for="date in dates"
          :key="date"
          class="mb-5 bg-white border rounded-lg pa-5"
      >
         <h6 class="mb-4 text-h6">
            {{ date.split('-').reverse().join('-') }}
         </h6>

         <!-- Сеансы на определенную дату -->
         <SessionTimetable :sessions="sessions[date]"/>
      </v-sheet>
   </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import AppLoader from '@/components/AppLoader'
import SessionTimetable from '@/components/Dashboard/SessionTimetable'

export default {
   name: 'SessionsPage',
   components: {AppLoader, SessionTimetable},
   data: () => ({
      loading: true,
      sessions: [],
   }),
   mounted() {
      this.loadSessionsTimetable()
          .then((response) => {
             if (response && response.status === 200) {
                this.sessions = response.data
             }
          }).finally(() => {
         this.loading = false
      })
   },
   computed: {
      /**
       * Получает даты(ключи)
       * @returns {string[]}
       */
      dates() {
         return Object.keys(this.sessions)
      }
   },
   methods: {
      ...mapActions(['loadSessionsTimetable'])
   }
}
</script>

<style scoped>

</style>
