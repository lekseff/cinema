<template>
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Новый сеанс</h3>
      <v-divider class="mb-8"></v-divider>
      <v-sheet class="rounded-lg border bg-white pa-5">
         <v-form ref="sessionCreate">
            <v-row>
               <!-- Выбор фильма -->
               <v-col cols="12" md="6" lg="3">
                  <v-select
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      density="comfortable"
                      label="Фильм"
                      :items="movies"
                      v-model="session.movieId"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                     <template v-slot:selection="{ item }">
                        <span>{{ item.title }}</span>
                     </template>
                  </v-select>
               </v-col>
               <!-- Выбор зала -->
               <v-col cols="12" md="6" lg="3">
                  <v-select
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      density="comfortable"
                      label="Зал"
                      :items="halls"
                      v-model="session.hallId"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                     <template v-slot:selection="{ item }">
                        <span>{{ item.title }}</span>
                     </template>
                  </v-select>
               </v-col>
               <!-- Выбор даты -->
               <v-col cols="12" md="6" lg="3">
                  <v-text-field
                      type="date"
                      :min="currentDate"
                      variant="outlined"
                      density="comfortable"
                      label="Дата сеанса"
                      v-model="session.date"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                  </v-text-field>
               </v-col>
               <!-- Выбор времени -->
               <v-col cols="12" md="6" lg="3">
                  <v-text-field
                      type="time"
                      variant="outlined"
                      density="comfortable"
                      label="Время сеанса"
                      v-model="session.time"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                  </v-text-field>
               </v-col>
            </v-row>
         </v-form>
         <v-btn
             variant="flat"
             color="light-blue-darken-1"
             class="d-block ml-auto"
             @click="onCreateSession"
         >
            Сохранить
         </v-btn>
      </v-sheet>

   </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {DateTime} from 'luxon'
import {rules} from '@/../constants'

export default {
   name: 'SessionCreate',
   data: () => ({
      rules: rules,
      session: {
         movieId: null,
         hallId: null,
         date: '',
         time: ''
      }
   }),
   mounted() {
      this.loadAllMovies()
      this.getHalls()
   },
   computed: {
      ...mapGetters({
             movies: 'getAllMovies',
             halls: 'getAllHalls'
          }
      ),
      currentDate() {
         // Дата в формате 2023-02-23
         return DateTime.now().toISODate()
      }
   },
   methods: {
      ...mapActions(['getHalls', 'loadAllMovies', 'createSession']),
      /**
       * Создает сеанс
       */
      async onCreateSession() {
         const {valid} = await this.$refs.sessionCreate.validate()
         if (!valid) return
         console.log({...this.session})
         await this.createSession({...this.session})
      }
   }
}
</script>

<style scoped>

</style>
