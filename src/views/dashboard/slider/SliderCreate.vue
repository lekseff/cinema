<template>
   <!-- Loader -->
   <v-container v-if="loading" class="fill-height">
      <AppLoader/>
   </v-container>
   <!-- Content -->
   <v-container v-else>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Добавить слайд</h3>
      <v-divider class="mb-8"></v-divider>
      <v-sheet class="rounded-lg border bg-white pa-5">
         <v-form ref="createSliderForm">
            <v-row>
               <!-- Выбор фильма -->
               <v-col cols="12" md="6">
                  <v-select
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      density="comfortable"
                      label="Фильм"
                      :items="moviesList"
                      v-model="slide.movie"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                     <template v-slot:selection="{ item }">
                        {{ item.title }}
                     </template>
                  </v-select>
               </v-col>

               <!-- Выбор изображения -->
               <v-col cols="12" md="6">
                  <v-file-input
                      show-size
                      label="Изображение"
                      variant="outlined"
                      v-model="slide.photo"
                      density="comfortable"
                      accept=".jpg,.jpeg,.webp"
                      color="deep-orange-lighten-1"
                      :rules="[rules.requiredSelect]"
                  ></v-file-input>
               </v-col>
            </v-row>
         </v-form>
         <v-btn
             variant="flat"
             color="light-blue-darken-1"
             class="d-block mx-auto"
             @click="onSubmitForm"
         >
            Сохранить
         </v-btn>
      </v-sheet>
   </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import AppLoader from '@/components/AppLoader'
import {rules} from '../../../../constants'

export default {
   name: 'SliderCreate',
   components: {AppLoader},
   data: () => ({
      loading: true,
      rules: rules,
      moviesList: null,
      slide: {
         movie: null,
         photo: null
      }
   }),
   mounted() {
      // Получаем фильмы для выпадающего списка
      this.loadAllMovies()
          .then(() => {
             // Формируем список фильмов
             this.moviesList = this.movies.map(m => {
                return {
                   id: m.id,
                   name: m.name
                }
             })
          })
          .finally(() => {
             this.loading = false
          })
   },
   computed: {
      ...mapGetters({
         movies: 'getAllMovies'
      })
   },
   methods: {
      ...mapActions(['loadAllMovies', 'createSlider']),
      /**
       * Проверяет валидацию и подготоавливает данные для отправки
       * @returns {Promise<void>}
       */
      async onSubmitForm() {
         const {valid} = await this.$refs.createSliderForm.validate()
         if (!valid) return
         const data = {
            ...this.slide,
            photo: this.slide.photo[0]
         }
         this.sendData(data)
      },
      /**
       * Отправляет данные на сервер
       * @param data
       */
      sendData(data) {
         this.createSlider(data)
             .then(response => {
                if (response && response.status === 200) {
                   this.$refs.createSliderForm.reset()   // Очищаем форму
                }
             })
      }
   }

}
</script>

<style scoped>

</style>
